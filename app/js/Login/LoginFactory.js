module.exports = function() {
	var factory = {};

	factory.style = 'green';
	factory.loggedInUser = {};

	factory.logIn = function(userName, token) {
		console.log("I'm in the login factory");
		factory.loggedInUser.username = userName;
		factory.loggedInUser.token = token;
	}

	return factory;
}