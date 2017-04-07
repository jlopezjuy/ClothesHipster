(function() {
    'use strict';

    angular
        .module('anelclothesApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('encargo', {
            parent: 'entity',
            url: '/encargo?page&sort&search',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'anelclothesApp.encargo.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/encargo/encargos.html',
                    controller: 'EncargoController',
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
                    $translatePartialLoader.addPart('encargo');
                    $translatePartialLoader.addPart('estado');
                    $translatePartialLoader.addPart('tipoEncargo');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('encargo-detail', {
            parent: 'encargo',
            url: '/encargo/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'anelclothesApp.encargo.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/encargo/encargo-detail.html',
                    controller: 'EncargoDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('encargo');
                    $translatePartialLoader.addPart('estado');
                    $translatePartialLoader.addPart('tipoEncargo');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Encargo', function($stateParams, Encargo) {
                    return Encargo.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'encargo',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('encargo-detail.edit', {
            parent: 'encargo-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/encargo/encargo-dialog.html',
                    controller: 'EncargoDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Encargo', function(Encargo) {
                            return Encargo.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('encargo.new', {
            parent: 'encargo',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/encargo/encargo-dialog.html',
                    controller: 'EncargoDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                importeTotal: null,
                                fechaEncargo: null,
                                fechaEntrega: null,
                                detalleVestido: null,
                                estado: null,
                                tipoEncargo: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('encargo', null, { reload: 'encargo' });
                }, function() {
                    $state.go('encargo');
                });
            }]
        })
        .state('encargo.edit', {
            parent: 'encargo',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/encargo/encargo-dialog.html',
                    controller: 'EncargoDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Encargo', function(Encargo) {
                            return Encargo.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('encargo', null, { reload: 'encargo' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('encargo.delete', {
            parent: 'encargo',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/encargo/encargo-delete-dialog.html',
                    controller: 'EncargoDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Encargo', function(Encargo) {
                            return Encargo.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('encargo', null, { reload: 'encargo' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
