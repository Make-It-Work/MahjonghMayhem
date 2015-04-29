module.exports = function(){
	var factory = {};

	factory.persons [
		{name: 'Martijn', age:26, active:true},
		{name:'Henk', age:43,active:true},
		{name:'Piet', age:35, active:false}
	];

	factory.addPerson = function(name,age){
		factory.persons.push({name:name, age:age, active:true});
	}

	return factory;
};