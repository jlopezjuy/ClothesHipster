import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { EncargoComponent } from './encargo.component';
import { EncargoDetailComponent } from './encargo-detail.component';
import { EncargoPopupComponent } from './encargo-dialog.component';
import { EncargoDeletePopupComponent } from './encargo-delete-dialog.component';

import { Principal } from '../../shared';

@Injectable()
export class EncargoResolvePagingParams implements Resolve<any> {

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

export const encargoRoute: Routes = [
  {
    path: 'encargo',
    component: EncargoComponent,
    resolve: {
      'pagingParams': EncargoResolvePagingParams
    },
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'anelclothesappApp.encargo.home.title'
    },
    canActivate: [UserRouteAccessService]
  }, {
    path: 'encargo/:id',
    component: EncargoDetailComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'anelclothesappApp.encargo.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const encargoPopupRoute: Routes = [
  {
    path: 'encargo-new',
    component: EncargoPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'anelclothesappApp.encargo.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: 'encargo/:id/edit',
    component: EncargoPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'anelclothesappApp.encargo.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: 'encargo/:id/delete',
    component: EncargoDeletePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'anelclothesappApp.encargo.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
