module.exports = function() {
	var factory = {};

	factory.games = [
		{gameid: 1, name: "Mahjonguhh", boardType: "Turtle", state:"open", players: [
			{name: "Suusj"}
		]},
		{gameid: 2, name: "Mayhemaaa", boardType:"Turtle", state: "playing", players: [
			{name: "Suusj"}
		]},
		{gameid: 3, name: "Oh Mah Yong", boardType:"Turtle", state : "open", players: [
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