require('angular/angular');
require('angular-route/angular-route');

// Create your app
var app = angular.module('Mahjongh', ['ngRoute', 'ui.bootstrap']);

app.config(function($routeProvider) {
	$routeProvider.
		when('/auth', {
			template: '<h1>Login page!</h1>',
			controller: 'LoginController'
		}).otherwise({
			templateUrl: 'indexView.html'
		});
});

app.
  run(function($rootScope, $location) {
    $rootScope.$on( "$routeChangeStart", function(event, next, current) {
      console.log($location);
    });
  });

var gameFactory = require('./Game/GameFactory');
var gameController = require('./Game/GameController');

var userFactory = require('./User/UserFactory');
var userController = require('./User/UserController');

var addGameController = require('./Game/AddGameController');
var loginController = require('./Login/LoginController');

app.factory('GameFactory', gameFactory);
app.controller('AddGameController', ['GameFactory', '$scope', '$modalInstance', addGameController]);
app.controller('GameController', gameController);

app.factory('UserFactory', userFactory);
app.controller('UserController', userController);
app.controller('LoginController', loginController);



