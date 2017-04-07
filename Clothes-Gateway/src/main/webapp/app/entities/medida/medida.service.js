(function() {
    'use strict';
    angular
        .module('anelclothesApp')
        .factory('Medida', Medida);

    Medida.$inject = ['$resource', 'DateUtils'];

    function Medida ($resource, DateUtils) {
        var resourceUrl =  'api/medidas/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                        data.fechaMedida = DateUtils.convertLocalDateFromServer(data.fechaMedida);
                    }
                    return data;
                }
            },
            'update': {
                method: 'PUT',
                transformRequest: function (data) {
                    var copy = angular.copy(data);
                    copy.fechaMedida = DateUtils.convertLocalDateToServer(copy.fechaMedida);
                    return angular.toJson(copy);
                }
            },
            'save': {
                method: 'POST',
                transformRequest: function (data) {
                    var copy = angular.copy(data);
                    copy.fechaMedida = DateUtils.convertLocalDateToServer(copy.fechaMedida);
                    return angular.toJson(copy);
                }
            }
        });
    }
})();
