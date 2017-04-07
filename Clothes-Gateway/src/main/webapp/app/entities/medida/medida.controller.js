(function() {
    'use strict';

    angular
        .module('anelclothesApp')
        .controller('MedidaController', MedidaController);

    MedidaController.$inject = ['Medida'];

    function MedidaController(Medida) {

        var vm = this;

        vm.medidas = [];

        loadAll();

        function loadAll() {
            Medida.query(function(result) {
                vm.medidas = result;
                vm.searchQuery = null;
            });
        }
    }
})();
