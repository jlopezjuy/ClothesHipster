(function() {
    'use strict';

    angular
        .module('anelclothesApp')
        .factory('PasswordResetFinish', PasswordResetFinish);

    PasswordResetFinish.$inject = ['$resource'];

    function PasswordResetFinish($resource) {
        var service = $resource('api/account/reset_password/finish', {}, {});

        return service;
    }
})();
