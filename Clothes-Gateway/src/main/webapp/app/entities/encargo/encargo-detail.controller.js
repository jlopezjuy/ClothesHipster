(function() {
    'use strict';

    angular
        .module('anelclothesApp')
        .controller('EncargoDetailController', EncargoDetailController);

    EncargoDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Encargo', 'Pago', 'Cliente'];

    function EncargoDetailController($scope, $rootScope, $stateParams, previousState, entity, Encargo, Pago, Cliente) {
        var vm = this;

        vm.encargo = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('anelclothesApp:encargoUpdate', function(event, result) {
            vm.encargo = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
