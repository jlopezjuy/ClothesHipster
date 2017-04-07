(function() {
    'use strict';

    angular
        .module('anelclothesApp')
        .controller('ClienteDetailController', ClienteDetailController);

    ClienteDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Cliente', 'Modelo', 'Medida', 'Encargo'];

    function ClienteDetailController($scope, $rootScope, $stateParams, previousState, entity, Cliente, Modelo, Medida, Encargo) {
        var vm = this;

        vm.cliente = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('anelclothesApp:clienteUpdate', function(event, result) {
            vm.cliente = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
