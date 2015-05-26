require('angular/angular');
require('angular-route/angular-route');

// Create your app
var app = angular.module('Mahjongh', ['ngRoute', 'ui.bootstrap']);

var gameFactory = require('./Game/GameFactory');
var gameController = require('./Game/GameController');

var userFactory = require('./User/UserFactory');
var userController = require('./User/UserController');

var addGameController = require('./Game/AddGameController');

var loginFactory = require('./Login/LoginFactory');
var loginController = require('./Login/LoginController');

app.config(function($routeProvider) {
	$routeProvider.
		when('/auth', {
			template: '<h1>Login page!</h1>',
			controller: 'LoginController'
		}).
		when('/game', {
			templateUrl: 'game.html'
		}).
		otherwise({
			templateUrl: 'indexView.html'
		});
});

app.
  run(function($rootScope, $location) {
    $rootScope.$on( "$routeChangeStart", function(event, next, current) {
      console.log($location);
      console.log(window.localStorage.getItem('username'));
    });
  });

app.factory('httpRequestInterceptor', function () {
  return {
    request: function (config) {
        config.headers['Content-Type'] = 'application/json';
		    config.headers['x-username'] = window.localStorage.getItem('username');
        config.headers['x-token'] = window.localStorage.getItem('token');
    	
      	return config;
    }
  };
});

app.config(function ($httpProvider) {
  $httpProvider.interceptors.push('httpRequestInterceptor');
});

app.factory('GameFactory', gameFactory);
app.controller('AddGameController', ['GameFactory', '$scope', '$modalInstance', '$http', addGameController]);
app.controller('GameController', gameController);

app.factory('UserFactory', userFactory);
app.controller('UserController', userController);

app.factory('LoginFactory', loginFactory);
app.controller('LoginController', loginController);



