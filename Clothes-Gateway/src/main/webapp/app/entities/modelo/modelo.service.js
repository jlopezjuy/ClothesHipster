(function() {
    'use strict';
    angular
        .module('anelclothesApp')
        .factory('Modelo', Modelo);

    Modelo.$inject = ['$resource'];

    function Modelo ($resource) {
        var resourceUrl =  'api/modelos/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                    }
                    return data;
                }
            },
            'update': { method:'PUT' }
        });
    }
})();
