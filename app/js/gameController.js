module.exports = function($scope, GameFactory, $modal) {
	this.factory = GameFactory;

	this.addGame = function(name, board) {
		console.log("add game in controller");
		this.factory.addGame(name, board);
	}

	$scope.open = function (size) {

	    var modalInstance = $modal.open({
	      templateUrl: 'addgame.html',
	      controller: 'AddGameController',
	      size: size,
	      resolve: {
	        items: function () {
	          return $scope.items;
	        }
	      }
	    });

	    modalInstance.result.then(function (selectedItem) {
	      $scope.selected = selectedItem;
	    }, function () {
	      $log.info('Modal dismissed at: ' + new Date());
	    });
  	};
};