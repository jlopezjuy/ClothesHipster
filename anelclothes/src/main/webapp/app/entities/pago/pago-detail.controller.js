(function() {
    'use strict';

    angular
        .module('anelclothesApp')
        .controller('PagoDetailController', PagoDetailController);

    PagoDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Pago', 'Encargo'];

    function PagoDetailController($scope, $rootScope, $stateParams, previousState, entity, Pago, Encargo) {
        var vm = this;

        vm.pago = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('anelclothesApp:pagoUpdate', function(event, result) {
            vm.pago = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
