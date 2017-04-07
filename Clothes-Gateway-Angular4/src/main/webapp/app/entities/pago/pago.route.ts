import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { PagoComponent } from './pago.component';
import { PagoDetailComponent } from './pago-detail.component';
import { PagoPopupComponent } from './pago-dialog.component';
import { PagoDeletePopupComponent } from './pago-delete-dialog.component';

import { Principal } from '../../shared';


export const pagoRoute: Routes = [
  {
    path: 'pago',
    component: PagoComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'anelclothesappApp.pago.home.title'
    },
    canActivate: [UserRouteAccessService]
  }, {
    path: 'pago/:id',
    component: PagoDetailComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'anelclothesappApp.pago.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const pagoPopupRoute: Routes = [
  {
    path: 'pago-new',
    component: PagoPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'anelclothesappApp.pago.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: 'pago/:id/edit',
    component: PagoPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'anelclothesappApp.pago.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: 'pago/:id/delete',
    component: PagoDeletePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'anelclothesappApp.pago.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
