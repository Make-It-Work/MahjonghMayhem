require('angular/angular');

var app = angular.module("Mahjongh",["ui.bootstrap"]);
var gameFactory = require('./Game/GameFactory');
var gameController = require('./Game/GameController');

var userFactory = require('./User/UserFactory');
var userController = require('./User/UserController');

var addGameController = require('./Game/AddGameController');

app.factory('GameFactory', gameFactory);
app.controller('AddGameController', ['GameFactory', '$scope', '$modalInstance', addGameController]);
app.controller('GameController', gameController);

app.factory('UserFactory', userFactory);
app.controller('UserController', ['$scope','$http','$q', userController]);

