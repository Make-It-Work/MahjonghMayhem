require('angular/angular');

var app = angular.module("Mahjongh",[]);
var gameFactory = require('./GameFactory');
var gameController = require('./gameController');

app.factory('GameFactory', gameFactory);
app.controller('GameController', gameController);