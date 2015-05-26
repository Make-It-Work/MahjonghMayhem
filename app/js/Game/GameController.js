module.exports = function($scope, GameFactory, $modal, $http) {
	this.factory = GameFactory;

	$scope.getGames = function(gameFactory) {
		$http.get("http://mahjongmayhem.herokuapp.com/games")
    	.success(function(response) {
    		gameFactory.loadGames(response);
    	});
	};

	$scope.getGame = function(gameFactory){	
	console.log("boejjaaa")	
		$http.get("https://mahjongmayhem.herokuapp.com/games/5541fc5b1872631100678bb4/tiles")
		.success(function(response) {
    		gameFactory.loadGame(response);
    	});
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
  		$http.post("http://mahjongmayhem.herokuapp.com/games/" + gameId + "/players")
  		.success(function(response) {
  			console.log(response);
  		})
  		.error(function(response) {
  			alert("You have to be logged in");
  		});

  	};

  	$scope.playersTemplate = 'app/playersTemplate.html';

  	$scope.init = function() {
  		$scope.getGames(GameFactory);
  	}

  	$scope.initGame = function(){
  		console.log("pleaaasseee")
  		$scope.getGame(GameFactory);
  	}
};