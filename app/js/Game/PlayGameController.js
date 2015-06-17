module.exports = function($scope, PlayGameFactory, $modal, $http, $routeParams) {
  	var self = this;
  	var routeparams = $routeParams;
	self.factory = PlayGameFactory;
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
	    console.log(JSON.stringify(data));

	    for(var i = 0; i < self.factory.gameTiles.length; i++){
		    var tile = self.factory.gameTiles[i];
	    	if(data[0]._id == tile._id) {
	    		self.factory.players.forEach(function(player) {
			    	if(data[0].match.foundBy === player._id) {
			    		player.numberOfMatches = player.numberOfMatches + 1;
			    		player.lastMatch[0] = tile;
			    	}
			    });
	    		self.factory.gameTiles.splice(i, 1);
	    	} else if (data[1]._id == tile._id) {
	    		self.factory.players.forEach(function(player) {
			    	if(data[1].match.foundBy === player._id) {
			    		player.lastMatch[1] = tile;
			    	}
			    });
	    		self.factory.gameTiles.splice(i, 1);
	    	};
	    	$scope.$apply();
	    }
	});

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
          			if(tmpTile.yPos == yPos || tmpTile.yPos == yPos + 1 || tmpTile.yPos == yPos - 1) {
            			if(tmpTile.zPos > zPos) {
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
              				left = true;
           				}
            			else if (tmpTile.xPos == xPos + 2) {
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
}