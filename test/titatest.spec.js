describe("Test One", function(){
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

	it('should add an game', function(){
		//mock
		$httpBackend.when('GET', 'http://mahjongmayhem.herokuapp.com/gameTemplates')
			.respond([{_id: 1}, {_id: 2}, {_id: 3}]);

		var addGameController = $controller('AddGameController', {$scope:myScope, GameFactory: GameFactory, $modalInstance: {}});
		//addGameController.addGame = sinon.stub();

		$httpBackend.flush();

		myScope.game = {
			templateName: "Shanghai",
			minPlayers: "1",
			maxPlayers: "32"
		};

		//var controller = new controller($http, gameService)
		//stubben: $http, gameService


		myScope.addGame();

		$httpBackend
			.expectGET('http://mahjongmayhem.herokuapp.com/gameTemplates')
			.respond(200);

		$httpBackend
			.expectPOST('http://mahjongmayhem.herokuapp.com/games', myScope.game)
			.respond(200);

		var expectedError = undefined;
		// Then
		console.log(myScope.error)
		expect(myScope.error).to.equal(expectedError);
	});

	it('should get all games', function(){
		var gameController = $controller('GameController', {$scope:{}, GameFactory:GameFactory});
	//	gameController.getGames = sinon.stub();
//		gameController.getGames();
		//assert(gameController.getGames.notCalled);
	});
});