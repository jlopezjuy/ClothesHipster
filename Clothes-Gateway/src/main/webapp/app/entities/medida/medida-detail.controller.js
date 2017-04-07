(function() {
    'use strict';

    angular
        .module('anelclothesApp')
        .controller('MedidaDetailController', MedidaDetailController);

    MedidaDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Medida', 'Cliente'];

    function MedidaDetailController($scope, $rootScope, $stateParams, previousState, entity, Medida, Cliente) {
        var vm = this;

        vm.medida = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('anelclothesApp:medidaUpdate', function(event, result) {
            vm.medida = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
