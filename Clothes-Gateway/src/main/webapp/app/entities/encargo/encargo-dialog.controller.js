(function() {
    'use strict';

    angular
        .module('anelclothesApp')
        .controller('EncargoDialogController', EncargoDialogController);

    EncargoDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Encargo', 'Pago', 'Cliente'];

    function EncargoDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Encargo, Pago, Cliente) {
        var vm = this;

        vm.encargo = entity;
        vm.clear = clear;
        vm.datePickerOpenStatus = {};
        vm.openCalendar = openCalendar;
        vm.save = save;
        vm.pagos = Pago.query();
        vm.clientes = Cliente.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.encargo.id !== null) {
                Encargo.update(vm.encargo, onSaveSuccess, onSaveError);
            } else {
                Encargo.save(vm.encargo, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('anelclothesApp:encargoUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }

        vm.datePickerOpenStatus.fechaEncargo = false;
        vm.datePickerOpenStatus.fechaEntrega = false;

        function openCalendar (date) {
            vm.datePickerOpenStatus[date] = true;
        }
    }
})();
