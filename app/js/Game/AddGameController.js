module.exports = function(GameFactory, $scope, $modalInstance, $http) {
	//app.controller('addGameController', ['GameFactory', '$scope', '$modalInstance', function() {
		var gameTemplates = [];
		console.log('getting templates');
		$http.get('http://mahjongmayhem.herokuapp.com/gameTemplates')
		.success(function (response) {
			console.log("bijna foreach")
			console.log(response);
			response.forEach(function(template) {
				console.log("toch niet")
				gameTemplates.push(template._id);
			});

		});
		$scope.addGame = function() {
			console.log("add");
			var game = $scope.game;
			console.log($scope.game);
			$http.post("http://mahjongmayhem.herokuapp.com/games", game).
			success(function(data) {
				console.log("success: " + data);
				window.location.href = '/';
			}).error(function(data, status, headers, config) {
				console.log(data);
				console.log(status);
			});			
		};

		$scope.cancel = function() {
			$modalInstance.dismiss('cancel');
		}
		$scope.getGameTemplates = function() {
			return gameTemplates;
		}
		$scope.game = {
			templateName: "Shanghai",
			minPlayers: "1",
			maxPlayers: "32"
		};
	
}