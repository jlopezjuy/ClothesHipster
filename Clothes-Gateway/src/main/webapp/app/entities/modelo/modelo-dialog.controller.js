(function() {
    'use strict';

    angular
        .module('anelclothesApp')
        .controller('ModeloDialogController', ModeloDialogController);

    ModeloDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'DataUtils', 'entity', 'Modelo', 'Cliente'];

    function ModeloDialogController ($timeout, $scope, $stateParams, $uibModalInstance, DataUtils, entity, Modelo, Cliente) {
        var vm = this;

        vm.modelo = entity;
        vm.clear = clear;
        vm.byteSize = DataUtils.byteSize;
        vm.openFile = DataUtils.openFile;
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
            if (vm.modelo.id !== null) {
                Modelo.update(vm.modelo, onSaveSuccess, onSaveError);
            } else {
                Modelo.save(vm.modelo, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('anelclothesApp:modeloUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


        vm.setImagen = function ($file, modelo) {
            if ($file) {
                DataUtils.toBase64($file, function(base64Data) {
                    $scope.$apply(function() {
                        modelo.imagen = base64Data;
                        modelo.imagenContentType = $file.type;
                    });
                });
            }
        };

    }
})();
