import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AnelclothesappSharedModule } from '../../shared';

import {
    ModeloService,
    ModeloPopupService,
    ModeloComponent,
    ModeloDetailComponent,
    ModeloDialogComponent,
    ModeloPopupComponent,
    ModeloDeletePopupComponent,
    ModeloDeleteDialogComponent,
    modeloRoute,
    modeloPopupRoute,
    ModeloResolvePagingParams,
} from './';

let ENTITY_STATES = [
    ...modeloRoute,
    ...modeloPopupRoute,
];

@NgModule({
    imports: [
        AnelclothesappSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        ModeloComponent,
        ModeloDetailComponent,
        ModeloDialogComponent,
        ModeloDeleteDialogComponent,
        ModeloPopupComponent,
        ModeloDeletePopupComponent,
    ],
    entryComponents: [
        ModeloComponent,
        ModeloDialogComponent,
        ModeloPopupComponent,
        ModeloDeleteDialogComponent,
        ModeloDeletePopupComponent,
    ],
    providers: [
        ModeloService,
        ModeloPopupService,
        ModeloResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AnelclothesappModeloModule {}
