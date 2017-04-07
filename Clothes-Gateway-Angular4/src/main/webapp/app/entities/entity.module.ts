import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AnelclothesappClienteModule } from './cliente/cliente.module';
import { AnelclothesappModeloModule } from './modelo/modelo.module';
import { AnelclothesappMedidaModule } from './medida/medida.module';
import { AnelclothesappEncargoModule } from './encargo/encargo.module';
import { AnelclothesappPagoModule } from './pago/pago.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        AnelclothesappClienteModule,
        AnelclothesappModeloModule,
        AnelclothesappMedidaModule,
        AnelclothesappEncargoModule,
        AnelclothesappPagoModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AnelclothesappEntityModule {}
