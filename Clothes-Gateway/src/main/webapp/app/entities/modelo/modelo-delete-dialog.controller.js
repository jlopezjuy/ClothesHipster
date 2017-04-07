(function() {
    'use strict';

    angular
        .module('anelclothesApp')
        .controller('ModeloDeleteController',ModeloDeleteController);

    ModeloDeleteController.$inject = ['$uibModalInstance', 'entity', 'Modelo'];

    function ModeloDeleteController($uibModalInstance, entity, Modelo) {
        var vm = this;

        vm.modelo = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            Modelo.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
