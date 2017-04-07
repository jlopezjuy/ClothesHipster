import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { MedidaComponent } from './medida.component';
import { MedidaDetailComponent } from './medida-detail.component';
import { MedidaPopupComponent } from './medida-dialog.component';
import { MedidaDeletePopupComponent } from './medida-delete-dialog.component';

import { Principal } from '../../shared';


export const medidaRoute: Routes = [
  {
    path: 'medida',
    component: MedidaComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'anelclothesappApp.medida.home.title'
    },
    canActivate: [UserRouteAccessService]
  }, {
    path: 'medida/:id',
    component: MedidaDetailComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'anelclothesappApp.medida.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const medidaPopupRoute: Routes = [
  {
    path: 'medida-new',
    component: MedidaPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'anelclothesappApp.medida.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: 'medida/:id/edit',
    component: MedidaPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'anelclothesappApp.medida.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: 'medida/:id/delete',
    component: MedidaDeletePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'anelclothesappApp.medida.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
