(function() {
    'use strict';
    angular
        .module('anelclothesApp')
        .factory('Encargo', Encargo);

    Encargo.$inject = ['$resource', 'DateUtils'];

    function Encargo ($resource, DateUtils) {
        var resourceUrl =  'api/encargos/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                        data.fechaEncargo = DateUtils.convertLocalDateFromServer(data.fechaEncargo);
                        data.fechaEntrega = DateUtils.convertLocalDateFromServer(data.fechaEntrega);
                    }
                    return data;
                }
            },
            'update': {
                method: 'PUT',
                transformRequest: function (data) {
                    var copy = angular.copy(data);
                    copy.fechaEncargo = DateUtils.convertLocalDateToServer(copy.fechaEncargo);
                    copy.fechaEntrega = DateUtils.convertLocalDateToServer(copy.fechaEntrega);
                    return angular.toJson(copy);
                }
            },
            'save': {
                method: 'POST',
                transformRequest: function (data) {
                    var copy = angular.copy(data);
                    copy.fechaEncargo = DateUtils.convertLocalDateToServer(copy.fechaEncargo);
                    copy.fechaEntrega = DateUtils.convertLocalDateToServer(copy.fechaEntrega);
                    return angular.toJson(copy);
                }
            }
        });
    }
})();
