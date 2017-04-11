import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { ClienteComponent } from './cliente.component';
import { ClienteDetailComponent } from './cliente-detail.component';
import { ClientePopupComponent } from './cliente-dialog.component';
import { ClienteDeletePopupComponent } from './cliente-delete-dialog.component';
import { MedidaClienteComponent } from '../medida/medida.cliente.component';
import { MedidaDetailComponent } from '../medida/medida-detail.component';
import { ModeloClienteComponent } from '../modelo/modelo.cliente.component';
import { ModeloDetailComponent } from '../modelo/modelo-detail.component';

import { Principal } from '../../shared';

@Injectable()
export class ClienteResolvePagingParams implements Resolve<any> {

  constructor(private paginationUtil: PaginationUtil) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      let page = route.queryParams['page'] ? route.queryParams['page'] : '1';
      let sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
      return {
          page: this.paginationUtil.parsePage(page),
          predicate: this.paginationUtil.parsePredicate(sort),
          ascending: this.paginationUtil.parseAscending(sort)
    };
  }
}

export const clienteRoute: Routes = [
  {
    path: 'cliente',
    component: ClienteComponent,
    resolve: {
      'pagingParams': ClienteResolvePagingParams
    },
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'anelclothesappApp.cliente.home.title'
    },
    canActivate: [UserRouteAccessService]
  }, {
    path: 'cliente/:id',
    component: ClienteDetailComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'anelclothesappApp.cliente.home.title'
    },
    canActivate: [UserRouteAccessService]
  }, {
    path: 'cliente/medida/:id',
    component: MedidaClienteComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'anelclothesappApp.medida.home.title'
    },
    canActivate: [UserRouteAccessService]
  }, {
    path: 'cliente/medida/detalle/:id',
    component: MedidaDetailComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'anelclothesappApp.medida.home.title'
    },
    canActivate: [UserRouteAccessService]
  }, {
    path: 'cliente/modelo/:id',
    component: ModeloClienteComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'anelclothesappApp.medida.home.title'
    },
    canActivate: [UserRouteAccessService]
  }, {
    path: 'cliente/modelo/detalle/:id',
    component: ModeloDetailComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'anelclothesappApp.medida.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const clientePopupRoute: Routes = [
  {
    path: 'cliente-new',
    component: ClientePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'anelclothesappApp.cliente.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: 'cliente/:id/edit',
    component: ClientePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'anelclothesappApp.cliente.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: 'cliente/:id/delete',
    component: ClienteDeletePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'anelclothesappApp.cliente.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
