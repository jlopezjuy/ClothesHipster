'use strict';

describe('Controller Tests', function() {

    describe('Cliente Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockPreviousState, MockCliente, MockModelo, MockMedida, MockEncargo;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockPreviousState = jasmine.createSpy('MockPreviousState');
            MockCliente = jasmine.createSpy('MockCliente');
            MockModelo = jasmine.createSpy('MockModelo');
            MockMedida = jasmine.createSpy('MockMedida');
            MockEncargo = jasmine.createSpy('MockEncargo');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity,
                'previousState': MockPreviousState,
                'Cliente': MockCliente,
                'Modelo': MockModelo,
                'Medida': MockMedida,
                'Encargo': MockEncargo
            };
            createController = function() {
                $injector.get('$controller')("ClienteDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'anelclothesApp:clienteUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
