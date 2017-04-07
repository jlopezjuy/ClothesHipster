(function() {
    'use strict';

    angular
        .module('anelclothesApp')
        .controller('MedidaDialogController', MedidaDialogController);

    MedidaDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Medida', 'Cliente'];

    function MedidaDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Medida, Cliente) {
        var vm = this;

        vm.medida = entity;
        vm.clear = clear;
        vm.datePickerOpenStatus = {};
        vm.openCalendar = openCalendar;
        vm.save = save;
        vm.clientes = Cliente.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.medida.id !== null) {
                Medida.update(vm.medida, onSaveSuccess, onSaveError);
            } else {
                Medida.save(vm.medida, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('anelclothesApp:medidaUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }

        vm.datePickerOpenStatus.fechaMedida = false;

        function openCalendar (date) {
            vm.datePickerOpenStatus[date] = true;
        }
    }
})();
