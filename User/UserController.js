module.exports = function($scope, $http, $q, UserFactory){
	this.persons [
		{name: 'Martijn', age:26, active:true},
		{name:'Henk', age:43,active:true},
		{name:'Piet', age:35, active:false}
	];

	this.deactivatePerson = function(person){
		person.active :false;
	}; 
};