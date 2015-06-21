/*require('angular/angular');*/
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
    
    $urlRouterProvider.otherwise('/all');
    
    $stateProvider
        // HOME STATES AND NESTED VIEWS ========================================
        .state('gameList', {
            url: '/',
            templateUrl: 'indexView.html',
            controller: 'GameController as games'
        })
        .state('gameList.all', {
            url: 'all',
            templateUrl: 'partials/allgames.html'
        })
        .state('gameList.join', {
            url: 'joinable',
            templateUrl: 'partials/joinable.html'
        })
        .state('gameList.joined', {
            url: 'joined',
            templateUrl: 'partials/joined.html'
        })
        .state('gameList.spectate', {
            url: 'spectate',
            templateUrl: 'partials/spectate.html'
        })
        .state('playing', {
            url: '/game/:gameId',
            templateUrl: 'game.html',
            controller: 'PlayGameController as game'
        })
        .state('playing.play', {
            url: '/game/:gameId/play',
            templateUrl: 'partials/gameplay.html',
        })
        .state('playing.spectate', {
            url: '/game/:gameId/spectate',
            templateUrl: 'partials/gamespectate.html',
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

app.filter('joinable', function() {
    return function(games) {
        var output = [];

        angular.forEach(games, function(game) {
            if(game.state === 'open') {
                output.push(game);
            };
        });

        return output;
    }
});

app.filter('joined', function() {
    return function(games) {
        var output = [];

        angular.forEach(games, function(game) {
            var found = false;
            angular.forEach(game.players, function(player) {
                console.log(player._id + " " + window.localStorage.getItem('username'));
                if (player._id === window.localStorage.getItem('username')) {
                    found = true;
                }
            });
            if(found) {
                output.push(game);
            }
        });

        return output;
    }
});

app.filter('spectate', function() {
    return function(games) {
        var output = [];

        angular.forEach(games, function(game) {
            var found = false;
            angular.forEach(game.players, function(player) {
                console.log(player._id + " " + window.localStorage.getItem('username'));
                if (player._id === window.localStorage.getItem('username')) {
                    found = true;
                }
            });
            if(!found && game.state === 'playing') {
                output.push(game);
            }
        });

        return output;
    }
});

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
