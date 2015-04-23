module.exports = function() {
	var factory = {};

	factory.games = [
		{name: "Mahjonguhh", boardType: "Turtle", players: [
			{name: "Suusj"}
		]},
		{name: "Mayhemaaa", boardType:"Turtle", players: [
			{name: "Suusj"}
		]},
		{name: "Oh Mah Yong", boardType:"Turtle", players: [
			{name: "Suusj"}
		]}
	];

	factory.addGame = function(name) {
		factory.games.push({name: name});
	};

	factory.joinGame = function(player, joinGame) {
		for (game in factory.games) {
			if(game.name == joinGame) {
				game.players.push(player);
			}
		}; 
	};

	return factory;
}