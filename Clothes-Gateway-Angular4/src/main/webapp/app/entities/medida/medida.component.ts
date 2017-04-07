import { Component, OnInit, OnDestroy } from '@angular/core';
import { Response } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager, ParseLinks, PaginationUtil, JhiLanguageService, AlertService } from 'ng-jhipster';

import { Medida } from './medida.model';
import { MedidaService } from './medida.service';
import { ITEMS_PER_PAGE, Principal } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-medida',
    templateUrl: './medida.component.html'
})
export class MedidaComponent implements OnInit, OnDestroy {
medidas: Medida[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private medidaService: MedidaService,
        private alertService: AlertService,
        private eventManager: EventManager,
        private principal: Principal
    ) {
        this.jhiLanguageService.setLocations(['medida', 'tipoFalda']);
    }

    loadAll() {
        this.medidaService.query().subscribe(
            (res: Response) => {
                this.medidas = res.json();
            },
            (res: Response) => this.onError(res.json())
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInMedidas();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId (index: number, item: Medida) {
        return item.id;
    }



    registerChangeInMedidas() {
        this.eventSubscriber = this.eventManager.subscribe('medidaListModification', (response) => this.loadAll());
    }


    private onError (error) {
        this.alertService.error(error.message, null, null);
    }
}
