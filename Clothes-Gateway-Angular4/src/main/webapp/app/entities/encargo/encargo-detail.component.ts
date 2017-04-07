import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager , JhiLanguageService  } from 'ng-jhipster';

import { Encargo } from './encargo.model';
import { EncargoService } from './encargo.service';

@Component({
    selector: 'jhi-encargo-detail',
    templateUrl: './encargo-detail.component.html'
})
export class EncargoDetailComponent implements OnInit, OnDestroy {

    encargo: Encargo;
    private subscription: any;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: EventManager,
        private jhiLanguageService: JhiLanguageService,
        private encargoService: EncargoService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['encargo', 'estado', 'tipoEncargo']);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
        this.registerChangeInEncargos();
    }

    load (id) {
        this.encargoService.find(id).subscribe(encargo => {
            this.encargo = encargo;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInEncargos() {
        this.eventSubscriber = this.eventManager.subscribe('encargoListModification', response => this.load(this.encargo.id));
    }

}
