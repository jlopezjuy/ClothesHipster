(function() {
    'use strict';

    angular
        .module('anelclothesApp')
        .controller('EncargoDeleteController',EncargoDeleteController);

    EncargoDeleteController.$inject = ['$uibModalInstance', 'entity', 'Encargo'];

    function EncargoDeleteController($uibModalInstance, entity, Encargo) {
        var vm = this;

        vm.encargo = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            Encargo.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
