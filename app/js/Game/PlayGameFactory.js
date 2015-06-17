module.exports = function($http) {
	var factory = {};

	factory.gameTiles = [];
	factory.players = [];
	factory.allTiles = [];

	factory.loadGameTiles = function(gameId) {
		var url = "https://mahjongmayhem.herokuapp.com/games/"+gameId+"/tiles?matched=false";
		$http.get(url)
		.success(function(response) {
    		factory.gameTiles = response;
    	});
    	var url = "https://mahjongmayhem.herokuapp.com/games/"+gameId+"/tiles";
		$http.get(url)
		.success(function(response) {
    		factory.allTiles = response;
    	});
		var url = "https://mahjongmayhem.herokuapp.com/games/"+gameId;
		$http.get(url)
		.success(function(response) {
    		factory.players = response.players;
    		factory.players.forEach(function(player) {
    			player.lastMatch = [];
    		});
    	});
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
								// console.log(match);
								// console.log(tile);
								console.log('________');
								console.log(tile.tile._id);
								console.log(match.tile._id);

								if(tile.tile._id == match.tile._id) {
									console.log('filling lastMatch');
									player.lastMatch[1] = match;
								}
							});
						}
					}
				});
			});
		})
		.error(function(response) {
			console.log(response);
		});

	};

	return factory;
};