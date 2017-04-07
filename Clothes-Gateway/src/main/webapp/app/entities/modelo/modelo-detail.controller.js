(function() {
    'use strict';

    angular
        .module('anelclothesApp')
        .controller('ModeloDetailController', ModeloDetailController);

    ModeloDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'DataUtils', 'entity', 'Modelo', 'Cliente'];

    function ModeloDetailController($scope, $rootScope, $stateParams, previousState, DataUtils, entity, Modelo, Cliente) {
        var vm = this;

        vm.modelo = entity;
        vm.previousState = previousState.name;
        vm.byteSize = DataUtils.byteSize;
        vm.openFile = DataUtils.openFile;

        var unsubscribe = $rootScope.$on('anelclothesApp:modeloUpdate', function(event, result) {
            vm.modelo = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
