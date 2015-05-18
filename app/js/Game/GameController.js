module.exports = function($scope, GameFactory, $modal) {
	this.factory = GameFactory;
	
	this.showPlayers = function () {
		console.log("...");
	}

	this.open = function(size) {
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
	      console.log('Modal dismissed at: ' + new Date());
	    });
  	};

  	this.join = function(gameId) {
  		var user = {
  			name: "Suusj"
  		};
  		this.factory.joinGame(user, gameId);
  	};

  	$scope.playersTemplate = 'app/playersTemplate.html';
};