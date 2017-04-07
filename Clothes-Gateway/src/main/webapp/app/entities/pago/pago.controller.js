(function() {
    'use strict';

    angular
        .module('anelclothesApp')
        .controller('PagoController', PagoController);

    PagoController.$inject = ['Pago'];

    function PagoController(Pago) {

        var vm = this;

        vm.pagos = [];

        loadAll();

        function loadAll() {
            Pago.query(function(result) {
                vm.pagos = result;
                vm.searchQuery = null;
            });
        }
    }
})();
