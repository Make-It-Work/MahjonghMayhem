module.exports = function($scope, LoginFactory, $http, $stateParams, $window, $location) {
	this.factory = LoginFactory;
	console.log(this.factory.loggedInUser.username);
	var $routeParams = $stateParams;

	if ($location.$$path == '/auth') {

		this.factory.logIn($location.search().username, $location.search().token);

		window.localStorage.setItem("username", $location.search().username);
		window.localStorage.setItem("token", $location.search().token);

		$window.location.href = '/';
	}

	this.userLoggedIn = function() {
		if(window.localStorage.getItem("username") != null) {
			return true;
		} else {
			return false;
		}
	}

	this.logOut = function() {
		console.log("uitloggen");
		window.localStorage.removeItem("username");
		window.localStorage.removeItem("token");
	}

	this.switchStyle = function(color) {
		console.log("let's switch it up");
		this.factory.style = color;
	}
}