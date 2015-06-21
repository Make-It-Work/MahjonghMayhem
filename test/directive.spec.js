describe("Test two", function(){
	var $controller,
		$httpBackend,
		myScope,
		GameFactory;

	//initialize the app
	beforeEach(module('Mahjongh'));

	beforeEach(inject(function(_$controller_, _$httpBackend_, _$rootScope_, _GameFactory_){
		$controller = _$controller_;
		$httpBackend = _$httpBackend_;
		myScope = _$rootScope_.$new();
		GameFactory = _GameFactory_;
	}));

	it('should test', function(){
		
	});

});