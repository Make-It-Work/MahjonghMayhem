module.exports = function($http) {
	var factory = {};

	factory.games = [];

	factory.loadGames = function(apiResponse) {
		factory.games = apiResponse;
	}

	return factory;
}