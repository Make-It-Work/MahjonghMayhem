module.exports = function($scope, $http, $q, UserFactory){
	this.factory = UserFactory;

	this.deactivatePerson = function(person){
		person.active = false;
	};
};