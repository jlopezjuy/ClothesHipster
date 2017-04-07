import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AnelclothesappClienteModule } from './cliente/cliente.module';
import { AnelclothesappEncargoModule } from './encargo/encargo.module';
import { AnelclothesappPagoModule } from './pago/pago.module';
import { AnelclothesappMedidaModule } from './medida/medida.module';
import { AnelclothesappModeloModule } from './modelo/modelo.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        AnelclothesappClienteModule,
        AnelclothesappEncargoModule,
        AnelclothesappPagoModule,
        AnelclothesappMedidaModule,
        AnelclothesappModeloModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AnelclothesappEntityModule {}
