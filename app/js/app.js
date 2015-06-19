require('angular/angular');
require('angular-route/angular-route');
require('angular-ui-router/build/angular-ui-router');

// Create your app
var app = angular.module('Mahjongh', ['ui.router', 'ui.bootstrap']);

var gameFactory = require('./Game/GameFactory');
var gameController = require('./Game/GameController');

var playGameFactory = require('./Game/PlayGameFactory');
var playGameController = require('./Game/PlayGameController');

var userFactory = require('./User/UserFactory');
var userController = require('./User/UserController');

var addGameController = require('./Game/AddGameController');

var loginFactory = require('./Login/LoginFactory');
var loginController = require('./Login/LoginController');

app.factory('GameFactory', gameFactory);
app.controller('AddGameController', ['GameFactory', '$scope', '$modalInstance', '$http', addGameController]);
app.controller('GameController', gameController);

app.factory('PlayGameFactory', playGameFactory);
app.controller('PlayGameController', playGameController);

app.factory('UserFactory', userFactory);
app.controller('UserController', userController);

app.factory('LoginFactory', loginFactory);
app.controller('LoginController', loginController);

app.config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/');
    
    $stateProvider
        // HOME STATES AND NESTED VIEWS ========================================
        .state('gameList', {
            url: '/',
            templateUrl: 'indexView.html',
            controller: 'GameController as games'
        })
        .state('playing', {
            url: '/game/:gameId',
            templateUrl: 'game.html',
            controller: 'PlayGameController as game'
        })
        .state('authenticate', {
            url: '/auth?username&token',
            template: '<h1>Login page</h1>'
        });
        
        // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
        //.state('about', {
            // we'll get to this in a bit       
        //});
        
});

// app.config(function($routeProvider) {

// 	$routeProvider.
// 		when('/auth', {
// 			template: '<h1>Login page!</h1>',
// 			controller: 'LoginController'
// 		}).
// 		when('/game/:id', {
// 			templateUrl: 'game.html',
//       controller: 'PlayGameController as game'
// 		}).
// 		otherwise({
// 			templateUrl: 'indexView.html'
// 		});
// });

app.
  run(function($rootScope, $location) {
    $rootScope.$on( "$routeChangeStart", function(event, next, current) {
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
