module.exports = function() {
	var factory = {};

	factory.games = [];

	factory.loadGames = function(apiResponse) {
		factory.games = apiResponse;
	}

	factory.addGame = function(object) {
		factory.games.push({name: object.name, boardType: object.board, players: [], state:"open"});
	};

	factory.joinGame = function(player, joinGame) {
		factory.games.forEach(function(game){
			if(game.gameid == joinGame) {
				if(game.state == "open"){
					game.players.push(player);
				}else{
					console.log("game closed")
				}
				return;
			}
		});
	};

	return factory;
}