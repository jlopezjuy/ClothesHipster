(function() {
    'use strict';

    angular
        .module('anelclothesApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('modelo', {
            parent: 'entity',
            url: '/modelo?page&sort&search',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'anelclothesApp.modelo.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/modelo/modelos.html',
                    controller: 'ModeloController',
                    controllerAs: 'vm'
                }
            },
            params: {
                page: {
                    value: '1',
                    squash: true
                },
                sort: {
                    value: 'id,asc',
                    squash: true
                },
                search: null
            },
            resolve: {
                pagingParams: ['$stateParams', 'PaginationUtil', function ($stateParams, PaginationUtil) {
                    return {
                        page: PaginationUtil.parsePage($stateParams.page),
                        sort: $stateParams.sort,
                        predicate: PaginationUtil.parsePredicate($stateParams.sort),
                        ascending: PaginationUtil.parseAscending($stateParams.sort),
                        search: $stateParams.search
                    };
                }],
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('modelo');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('modelo-detail', {
            parent: 'modelo',
            url: '/modelo/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'anelclothesApp.modelo.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/modelo/modelo-detail.html',
                    controller: 'ModeloDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('modelo');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Modelo', function($stateParams, Modelo) {
                    return Modelo.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'modelo',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('modelo-detail.edit', {
            parent: 'modelo-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/modelo/modelo-dialog.html',
                    controller: 'ModeloDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Modelo', function(Modelo) {
                            return Modelo.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('modelo.new', {
            parent: 'modelo',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/modelo/modelo-dialog.html',
                    controller: 'ModeloDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                imagen: null,
                                imagenContentType: null,
                                nombreModelo: null,
                                colorVestido: null,
                                observacion: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('modelo', null, { reload: 'modelo' });
                }, function() {
                    $state.go('modelo');
                });
            }]
        })
        .state('modelo.edit', {
            parent: 'modelo',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/modelo/modelo-dialog.html',
                    controller: 'ModeloDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Modelo', function(Modelo) {
                            return Modelo.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('modelo', null, { reload: 'modelo' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('modelo.delete', {
            parent: 'modelo',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/modelo/modelo-delete-dialog.html',
                    controller: 'ModeloDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Modelo', function(Modelo) {
                            return Modelo.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('modelo', null, { reload: 'modelo' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
