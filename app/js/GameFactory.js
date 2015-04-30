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

	factory.addGame = function(name) {
		factory.games.push({name: name});
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