require('angular/angular');

var app = angular.module("Mahjongh",[]);
var gameController = require('./gameController');

app.controller('GameController', gameController);