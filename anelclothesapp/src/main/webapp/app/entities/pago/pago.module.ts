import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AnelclothesappSharedModule } from '../../shared';

import {
    PagoService,
    PagoPopupService,
    PagoComponent,
    PagoDetailComponent,
    PagoDialogComponent,
    PagoPopupComponent,
    PagoDeletePopupComponent,
    PagoDeleteDialogComponent,
    pagoRoute,
    pagoPopupRoute,
} from './';

let ENTITY_STATES = [
    ...pagoRoute,
    ...pagoPopupRoute,
];

@NgModule({
    imports: [
        AnelclothesappSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        PagoComponent,
        PagoDetailComponent,
        PagoDialogComponent,
        PagoDeleteDialogComponent,
        PagoPopupComponent,
        PagoDeletePopupComponent,
    ],
    entryComponents: [
        PagoComponent,
        PagoDialogComponent,
        PagoPopupComponent,
        PagoDeleteDialogComponent,
        PagoDeletePopupComponent,
    ],
    providers: [
        PagoService,
        PagoPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AnelclothesappPagoModule {}
