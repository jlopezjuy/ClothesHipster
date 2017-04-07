import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager , JhiLanguageService  } from 'ng-jhipster';

import { Medida } from './medida.model';
import { MedidaService } from './medida.service';

@Component({
    selector: 'jhi-medida-detail',
    templateUrl: './medida-detail.component.html'
})
export class MedidaDetailComponent implements OnInit, OnDestroy {

    medida: Medida;
    private subscription: any;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: EventManager,
        private jhiLanguageService: JhiLanguageService,
        private medidaService: MedidaService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['medida', 'tipoFalda']);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
        this.registerChangeInMedidas();
    }

    load (id) {
        this.medidaService.find(id).subscribe(medida => {
            this.medida = medida;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInMedidas() {
        this.eventSubscriber = this.eventManager.subscribe('medidaListModification', response => this.load(this.medida.id));
    }

}
