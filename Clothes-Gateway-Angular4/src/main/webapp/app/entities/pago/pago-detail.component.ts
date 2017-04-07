import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager , JhiLanguageService  } from 'ng-jhipster';

import { Pago } from './pago.model';
import { PagoService } from './pago.service';

@Component({
    selector: 'jhi-pago-detail',
    templateUrl: './pago-detail.component.html'
})
export class PagoDetailComponent implements OnInit, OnDestroy {

    pago: Pago;
    private subscription: any;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: EventManager,
        private jhiLanguageService: JhiLanguageService,
        private pagoService: PagoService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['pago']);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
        this.registerChangeInPagos();
    }

    load (id) {
        this.pagoService.find(id).subscribe(pago => {
            this.pago = pago;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInPagos() {
        this.eventSubscriber = this.eventManager.subscribe('pagoListModification', response => this.load(this.pago.id));
    }

}
