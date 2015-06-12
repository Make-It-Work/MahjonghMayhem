module.exports = function($scope, GameFactory, $modal, $http, $routeParams) {
  var self = this;
  var routeparams = $routeParams;
	self.factory = GameFactory;
  var gameId;
  var socket;
	selectedTiles = [];

  self.getGame = function(){  
    gameId = routeparams.id;
    self.factory.loadGameTiles(gameId);
    socket = io('http://mahjongmayhem.herokuapp.com?gameId=' + gameId);
  }

  if(routeparams.id){
    self.getGame();
  }

  socket.on('match', function(data) {
    console.log(self.factory);

    for(var i = 0; i < self.factory.gameTiles.length; i++){
      var tile = self.factory.gameTiles[i];
      if(data[0]._id == tile._id || data[1]._id == tile._id) {
        console.log("Im the tile");
        self.factory.gameTiles.splice(i, 1);
        console.log(self.factory.gameTiles);
        $scope.$apply();
      }
    }
  });

	$scope.getGames = function(gameFactory) {
		$http.get("http://mahjongmayhem.herokuapp.com/games")
    	.success(function(response) {
    		gameFactory.loadGames(response);
    	});
	};


	self.open = function(size) {
    var modalInstance = $modal.open({
      templateUrl: 'addgame.html',
      controller: 'AddGameController',
      size: size,
      resolve: {
        items: function () {
          return $scope.items;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      console.log('Modal dismissed at: ' + new Date());
    });
	};

	self.select = function(tile) {
    console.log('selected a tile');
    if (self.isFreeTile(tile)) {
      tile.class="selected";
  		selectedTiles.push(tile);
  		if(selectedTiles.length == 2) {
  			if (selectedTiles[0].tile.suit != selectedTiles[1].tile.suit) {
          console.log("invalid match");
        } else if (selectedTiles[0].tile._id != selectedTiles[1].tile._id) {
          if(selectedTiles[0].tile.matchesWholeSuit || selectedTiles[0].tile.name === selectedTiles[1].tile.name) {
            console.log("valid match")
            selectedTiles[0].matched = true;
            selectedTiles[1].matched = true;
            selectedTiles[0].class = 'found-match';
            selectedTiles[1].class = 'found-match';
            $http.post('http://mahjongmayhem.herokuapp.com/games/' + gameId + '/tiles/matches', {
              tile1Id: selectedTiles[0]._id,
              tile2Id: selectedTiles[1]._id
            }).success(function (data, status, headers, config) {
              console.log("I matched!");
            }).error(function (data, status, headers, config) {
              console.log(data);
            });
          }
        }
  			selectedTiles = [];
        self.factory.gameTiles.forEach(function(tile) {
          if (tile.matched === undefined) {
            tile.class="not-selected";
          } else {
            tile = undefined;
          }
        });
  		}
    }
	}

  self.isFreeTile = function(tile) {
    console.log('is this free?');
    return self.isFreeOnTop(tile);
  }
  self.isFreeOnTop = function(tile) {
    var free = true;
    zPos = tile.zPos;
    xPos = tile.xPos;
    yPos = tile.yPos;
    self.factory.gameTiles.forEach(function(tmpTile) {
      if(!tmpTile.matched) {
        if (tmpTile.xPos == xPos || tmpTile.xPos == xPos + 1 || tmpTile.xPos == xPos -1) {
          console.log('same xPos');
          if(tmpTile.yPos == yPos || tmpTile.yPos == yPos + 1 || tmpTile.yPos == yPos - 1) {
            console.log('same yPos');
            if(tmpTile.zPos > zPos) {
              console.log('Higher zPos');
              free = false;
              return free;
            }
          }
        }
      }
    });
    if (!self.isFreeOnSide(tile)) {
      free = false;
    }
    return free;
  }
  self.isFreeOnSide = function(tile) {
    var free = true;
    var left = false;
    var right = false;
    zPos = tile.zPos;
    xPos = tile.xPos;
    yPos = tile.yPos;
    self.factory.gameTiles.forEach(function(tmpTile) {
      if(!tmpTile.matched) {
        if(tmpTile.yPos >= yPos -1 && tmpTile.yPos <= yPos +1) {
          if(tmpTile.zPos >= zPos) {
            if(tmpTile.xPos == xPos -2) {
              console.log('adjacent tile left');
              left = true;
            }
            else if (tmpTile.xPos == xPos + 2) {
              console.log('adjacent tile right');
              right = true;
            }
          }
        }
      }
    });
    if(left && right) {
      free = false;
    }
    return free;
  }

	self.join = function(gameId) {
		$http.post("http://mahjongmayhem.herokuapp.com/games/" + gameId + "/players")
		.success(function(response) {
			console.log(response);
			window.location.href="/";
		})
		.error(function(response, status) {
			console.log(response);
			console.log(status);
			if (status == 400) {
				if (response.message == "You are allready joined in this game.") {
					alert("You cannot join a game twice");
				}
				else {
					alert("You have to be logged in");
				}
			}
		});
	};

  self.startGame = function(gameId) {
    $http.post("http://mahjongmayhem.herokuapp.com/games/" + gameId + "/start")
    .success(function(response) {
      console.log(response);
      window.location.href="/";
    })
  }

	$scope.itemClicked = function ($index) {
    $scope.selectedIndex = $index;
	}

	$scope.init = function() {
		$scope.getGames(GameFactory);
 	}
};