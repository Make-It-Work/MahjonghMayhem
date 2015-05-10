module.exports = function() {
	var factory = {};

	factory.games = [
		{name: "Mahjonguhh", boardType: "Turtle", state:"open", players: [
			{name: "Suusj"}
		]},
		{name: "Mayhemaaa", boardType:"Turtle", state: "playing", players: [
			{name: "Suusj"}
		]},
		{name: "Oh Mah Yong", boardType:"Turtle", state : "open", players: [
			{name: "Suusj"}
		]}
	];

	factory.addGame = function(object) {
		console.log("adding in factory");
		console.log(object.name);
		console.log(object.board);
		factory.games.push({name: object.name, boardType: object.board, players: [], state:"open"});
	};

	factory.joinGame = function(player, joinGame) {
		for (game in factory.games) {
			if(game.name == joinGame) {
				if(game.state == "open"){
					game.players.push(player);
				}else{
					console.log("game closed")
				}
				break;
			}
		}; 
	};

	return factory;
}