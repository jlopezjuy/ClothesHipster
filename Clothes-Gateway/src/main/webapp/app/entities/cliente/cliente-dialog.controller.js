(function() {
    'use strict';

    angular
        .module('anelclothesApp')
        .controller('ClienteDialogController', ClienteDialogController);

    ClienteDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Cliente', 'Modelo', 'Medida', 'Encargo'];

    function ClienteDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Cliente, Modelo, Medida, Encargo) {
        var vm = this;

        vm.cliente = entity;
        vm.clear = clear;
        vm.save = save;
        vm.modelos = Modelo.query();
        vm.medidas = Medida.query();
        vm.encargos = Encargo.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.cliente.id !== null) {
                Cliente.update(vm.cliente, onSaveSuccess, onSaveError);
            } else {
                Cliente.save(vm.cliente, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('anelclothesApp:clienteUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
