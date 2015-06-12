module.exports = function($http) {
	var factory = {};

	factory.gameTiles = [];

	factory.loadGameTiles = function(gameId) {
		var url = "https://mahjongmayhem.herokuapp.com/games/"+gameId+"/tiles?matched=false"
		$http.get(url)
		.success(function(response) {
    		factory.gameTiles = response;
    		console.log(factory.gameTiles[0]);
    	});
	};

	return factory;
};