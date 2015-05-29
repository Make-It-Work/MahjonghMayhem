module.exports = function($scope, GameFactory, $modal, $http) {
	this.factory = GameFactory;

	selectedTiles = [];

	$scope.getGames = function(gameFactory) {
		$http.get("http://mahjongmayhem.herokuapp.com/games")
    	.success(function(response) {
    		gameFactory.loadGames(response);
    	});
	};

	this.getGame = function(gameId){	
		this.factory.loadGameTiles(gameId);
	}

	this.open = function(size) {
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

  	this.select = function(tile) {
      console.log('selected a tile');
      if (this.isFreeTile(tile)) {
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
              
            }
          }
    			selectedTiles = [];
          this.factory.gameTiles.forEach(function(tile) {
            if (tile.matched === undefined) {
              tile.class="not-selected";
            }
          });
    		}
      }
  	}

    this.isFreeTile = function(tile) {
      console.log('is this free?');
      return this.isFreeOnTop(tile);
    }
    this.isFreeOnTop = function(tile) {
      var free = true;
      zPos = tile.zPos;
      xPos = tile.xPos;
      yPos = tile.yPos;
      this.factory.gameTiles.forEach(function(tmpTile) {
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
      if (!this.isFreeOnSide(tile)) {
        free = false;
      }
      return free;
    }
    this.isFreeOnSide = function(tile) {
      var free = true;
      var left = false;
      var right = false;
      zPos = tile.zPos;
      xPos = tile.xPos;
      yPos = tile.yPos;
      this.factory.gameTiles.forEach(function(tmpTile) {
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

  	this.join = function(gameId) {
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

  	$scope.itemClicked = function ($index) {
	    $scope.selectedIndex = $index;
	}

  	$scope.playersTemplate = 'app/playersTemplate.html';

  	$scope.init = function() {
  		$scope.getGames(GameFactory);
  	}
};