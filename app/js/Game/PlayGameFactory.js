//WEL ASYNC

module.exports = function($http, $q) {
	var factory = {};

	factory.gameId;
	factory.gameTiles = [];
	factory.players = [];
	factory.allTiles = [];
	factory.gameLog = [];
	factory.matchedTimes = [];

	factory.tabs = [{text: "Players", class: "active"}, {text: "Game Log", class: ""}];

	factory.loadGameTiles = function(gameId) {
		factory.gameId = gameId;

		var unmatchedPromise = factory.getUnmatchedTiles(gameId);
		var allTilesPromise = factory.getAllTiles(gameId);
		var playersPromise = factory.getPlayers(gameId);
		
		$q.all([unmatchedPromise, allTilesPromise, playersPromise]).then(function() {
			factory.getLastMatch(gameId);
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
	    		factory.players = response.players;
	    		factory.players.forEach(function(player) {
	    			player.lastMatch = [];
	    			player.numberOfMatches = player.numberOfMatches;
	    		});
	    		resolve(factory.players);
	    	});
		});
	};

	factory.getLastMatch = function(gameId) {
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
	};

	factory.getGameLog = function (gameId) {
		var newUrl = "https://mahjongmayhem.herokuapp.com/games/" + gameId +"/tiles/matches";
		$http.get(newUrl)
		.success(function(response) {
			console.log(response);
			response.forEach(function(log) {
				var matchTime = {
					time: log.match.foundOn,
					by: log.match.foundBy
				};
				var found = false;
				factory.matchedTimes.forEach(function(mt) {
					if (!found) {
						if (mt.time == matchTime.time && mt.by == matchTime.by) {
							found = true;
						} else {
							found = false;
						}
					}
				});
				if(!found) {
					factory.gameLog.push(log);
				}
				factory.matchedTimes.push(matchTime);
			});
		});
	}

	factory.switchTab = function(clicked) {
		if(clicked === 'Game Log') {
			factory.getGameLog(factory.gameId);
			factory.tabs[0].class = "";
			factory.tabs[1].class = "active";
			
		} else {
			factory.getLastMatch(factory.gameId);
			factory.tabs[0].class = "active";
			factory.tabs[1].class = "";
		}
	}

	return factory;
};