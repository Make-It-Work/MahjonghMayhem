module.exports = function(GameFactory, $scope, $modalInstance) {
	//app.controller('addGameController', ['GameFactory', '$scope', '$modalInstance', function() {
		$scope.addGame = function() {
			console.log("add");
			GameFactory.addGame($scope.game);
			$modalInstance.close();
		};
		$scope.cancel = function() {
			$modalInstance.dismiss('cancel');
		}
		$scope.game = {
			name: 'test'
		};
	
}