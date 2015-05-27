module.exports = function($http) {
	var factory = {};

	factory.games = [];
	factory.gameTiles=[];

	factory.loadGames = function(apiResponse) {
		factory.games = apiResponse;
	}

	factory.loadGameTiles = function(gameId) {
		console.log("helloooo factory")
		var url = "https://mahjongmayhem.herokuapp.com/games/"+gameId+"/tiles"
		$http.get(url)
		.success(function(response) {
			console.log("yeaaaahhhhh")
    		factory.gameTiles = response;
    	});
	}

	factory.addGame = function(object) {
		factory.games.push({name: object.name, boardType: object.board, players: [], state:"open"});
	};

	factory.joinGame = function(player, joinGame) {
		console.log(joinGame);
		factory.games.forEach(function(game){
			if(game._id == joinGame) {
				if(game.state == "open"){
					game.players.push(player);
				}
				return;
			}
		});
	};

	return factory;
}