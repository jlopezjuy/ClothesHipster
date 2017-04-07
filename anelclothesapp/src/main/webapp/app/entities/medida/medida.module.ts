import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AnelclothesappSharedModule } from '../../shared';

import {
    MedidaService,
    MedidaPopupService,
    MedidaComponent,
    MedidaDetailComponent,
    MedidaDialogComponent,
    MedidaPopupComponent,
    MedidaDeletePopupComponent,
    MedidaDeleteDialogComponent,
    medidaRoute,
    medidaPopupRoute,
} from './';

let ENTITY_STATES = [
    ...medidaRoute,
    ...medidaPopupRoute,
];

@NgModule({
    imports: [
        AnelclothesappSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        MedidaComponent,
        MedidaDetailComponent,
        MedidaDialogComponent,
        MedidaDeleteDialogComponent,
        MedidaPopupComponent,
        MedidaDeletePopupComponent,
    ],
    entryComponents: [
        MedidaComponent,
        MedidaDialogComponent,
        MedidaPopupComponent,
        MedidaDeleteDialogComponent,
        MedidaDeletePopupComponent,
    ],
    providers: [
        MedidaService,
        MedidaPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AnelclothesappMedidaModule {}
