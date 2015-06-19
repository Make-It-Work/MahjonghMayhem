module.exports = function($scope, GameFactory, $modal, $http, $stateParams) {
  	var self = this;
  	var routeparams = $stateParams;
	self.factory = GameFactory;
  	var gameId;
  	var socket;
	selectedTiles = [];

	$scope.getGames = function(gameFactory) {
		$http.get("http://mahjongmayhem.herokuapp.com/games")
    	.success(function(response) {
    		gameFactory.loadGames(response);
    	});
	};


	self.open = function(size) {
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

	self.isOwner = function(game) {
		if (game.createdBy._id === window.localStorage.getItem("username")) {
			return true;
		} else {
			return false;
		};
	};

	self.join = function(gameId) {
		$http.post("http://mahjongmayhem.herokuapp.com/games/" + gameId + "/players")
		.success(function(response) {
			console.log(response);
			window.location.href="/";
		})
		.error(function(response, status) {
			console.log(response);
			console.log(status);
			if (status == 400) {
				if (response.message == "You are allready joined in this game.") {
					alert("You cannot join a game twice");
				}
				else {
					alert("You have to be logged in");
				}
			}
		});
	};

	self.startGame = function(gameId) {
	    $http.post("http://mahjongmayhem.herokuapp.com/games/" + gameId + "/start")
	    .success(function(response) {
	    	console.log(response);
	    	window.location.href="/";
	    })
	}

	$scope.init = function() {
		$scope.getGames(GameFactory);
	}
};