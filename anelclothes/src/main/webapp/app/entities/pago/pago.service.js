(function() {
    'use strict';
    angular
        .module('anelclothesApp')
        .factory('Pago', Pago);

    Pago.$inject = ['$resource', 'DateUtils'];

    function Pago ($resource, DateUtils) {
        var resourceUrl =  'anelapi/' + 'api/pagos/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                        data.fechaPago = DateUtils.convertLocalDateFromServer(data.fechaPago);
                    }
                    return data;
                }
            },
            'update': {
                method: 'PUT',
                transformRequest: function (data) {
                    var copy = angular.copy(data);
                    copy.fechaPago = DateUtils.convertLocalDateToServer(copy.fechaPago);
                    return angular.toJson(copy);
                }
            },
            'save': {
                method: 'POST',
                transformRequest: function (data) {
                    var copy = angular.copy(data);
                    copy.fechaPago = DateUtils.convertLocalDateToServer(copy.fechaPago);
                    return angular.toJson(copy);
                }
            }
        });
    }
})();
