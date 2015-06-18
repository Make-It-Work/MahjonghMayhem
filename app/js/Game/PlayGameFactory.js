//WEL ASYNC

module.exports = function($http, $q) {
	var factory = {};

	factory.gameTiles = [];
	factory.players = [];
	factory.allTiles = [];

	factory.loadGameTiles = function(gameId) {
		var unmatchedPromise = factory.getUnmatchedTiles(gameId);
		var allTilesPromise = factory.getAllTiles(gameId);
		var playersPromise = factory.getPlayers(gameId);
		
		$q.all([unmatchedPromise, allTilesPromise, playersPromise]).then(function() {
			console.log('lm');
	    	var newUrl = "https://mahjongmayhem.herokuapp.com/games/" + gameId +"/tiles/matches";
			$http.get(newUrl)
			.success(function(response) {
				response.forEach(function(match) {
					factory.players.forEach(function(player) {
						if(player.lastMatchFoundOn === undefined) {
							player.lastMatchFoundOn = "1900-01-01T00:00:00.119Z";
						}
						if(player._id === match.match.foundBy) {
							if (player.lastMatchFoundOn < match.match.foundOn) {
								console.log("newer match");
								player.lastMatchFoundOn = match.match.foundOn;
								player.lastMatch[0] = match;
								factory.allTiles.forEach(function(tile) {
									if(tile.tile._id == match.tile._id) {
										console.log('filling lastMatch');
										player.lastMatch[1] = match;
									}
								});
							}
						}
					});
				});
			});
		});
	};

	factory.getUnmatchedTiles = function(gameId) {
		
		return $q(function(resolve, reject) {
			var url = "https://mahjongmayhem.herokuapp.com/games/"+gameId+"/tiles?matched=false";
			$http.get(url)
			.success(function(response) {
				console.log('unmatched');
	    		factory.gameTiles = response;
	    		resolve(factory.gameTiles);
	    	});
		});		
	};

	factory.getAllTiles = function(gameId) {
		
		return $q(function(resolve, reject) {
			var url = "https://mahjongmayhem.herokuapp.com/games/"+gameId+"/tiles";
			$http.get(url)
			.success(function(response) {
				console.log('alltiles');
	    		factory.allTiles = response;
	    		resolve(factory.allTiles);
	    	});
		});
	};

	factory.getPlayers = function(gameId) {
		
		return $q(function(resolve, reject) {
			var url = "https://mahjongmayhem.herokuapp.com/games/"+gameId;
			$http.get(url)
			.success(function(response) {
				console.log('players');
	    		factory.players = response.players;
	    		factory.players.forEach(function(player) {
	    			player.lastMatch = [];
	    		});
	    		resolve(factory.players);
	    	});
		});
	}

	return factory;
};