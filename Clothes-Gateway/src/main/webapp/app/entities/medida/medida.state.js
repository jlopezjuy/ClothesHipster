(function() {
    'use strict';

    angular
        .module('anelclothesApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('medida', {
            parent: 'entity',
            url: '/medida',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'anelclothesApp.medida.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/medida/medidas.html',
                    controller: 'MedidaController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('medida');
                    $translatePartialLoader.addPart('tipoFalda');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('medida-detail', {
            parent: 'medida',
            url: '/medida/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'anelclothesApp.medida.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/medida/medida-detail.html',
                    controller: 'MedidaDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('medida');
                    $translatePartialLoader.addPart('tipoFalda');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Medida', function($stateParams, Medida) {
                    return Medida.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'medida',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('medida-detail.edit', {
            parent: 'medida-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/medida/medida-dialog.html',
                    controller: 'MedidaDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Medida', function(Medida) {
                            return Medida.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('medida.new', {
            parent: 'medida',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/medida/medida-dialog.html',
                    controller: 'MedidaDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                contornoBusto: null,
                                anchoPecho: null,
                                altoBusto: null,
                                bajoBusto: null,
                                alturaPinza: null,
                                separacionBusto: null,
                                talleDeltantero: null,
                                talleEspalda: null,
                                largoCorset: null,
                                costado: null,
                                hombro: null,
                                anchoHombro: null,
                                largoManga: null,
                                sisaDelantero: null,
                                sisaEspalda: null,
                                contornoCintura: null,
                                anteCadera: null,
                                contornoCadera: null,
                                posicionCadera: null,
                                largoFalda: null,
                                tipoFalda: null,
                                fechaMedida: null,
                                anchoEspalda: null,
                                anchoManga: null,
                                tiroPantalon: null,
                                anchoPinzaPantalon: null,
                                anchoRodillaPantalon: null,
                                botaPantalon: null,
                                largoPantalon: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('medida', null, { reload: 'medida' });
                }, function() {
                    $state.go('medida');
                });
            }]
        })
        .state('medida.edit', {
            parent: 'medida',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/medida/medida-dialog.html',
                    controller: 'MedidaDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Medida', function(Medida) {
                            return Medida.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('medida', null, { reload: 'medida' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('medida.delete', {
            parent: 'medida',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/medida/medida-delete-dialog.html',
                    controller: 'MedidaDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Medida', function(Medida) {
                            return Medida.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('medida', null, { reload: 'medida' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
