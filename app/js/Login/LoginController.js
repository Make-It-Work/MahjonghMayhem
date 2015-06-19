module.exports = function($scope, LoginFactory, $http, $routeParams, $window, $location) {
	this.factory = LoginFactory;
	console.log(this.factory.loggedInUser.username);

	if ($location.$$path == '/auth') {
		console.log($routeParams);

		this.factory.logIn($routeParams.username, $routeParams.token);


		window.localStorage.setItem("username", $routeParams.username);
		window.localStorage.setItem("token", $routeParams.token);

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