require('angular/angular');

var app = angular.module("Mahjongh",[]);
var gameFactory = require('./GameFactory');
var gameController = require('./gameController');

var userFactory = require('./User/UserFactory');
var userController = require('./User/UserController');

app.factory('GameFactory', gameFactory);
app.controller('GameController', gameController);

app.factory('UserFactory', userFactory);
app.controller('UserController', ['$scope','$http','$q', userController]);