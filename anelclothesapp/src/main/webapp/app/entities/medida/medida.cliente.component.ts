import { Component, OnInit, OnDestroy } from '@angular/core';
import { Response } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager, ParseLinks, PaginationUtil, JhiLanguageService, AlertService } from 'ng-jhipster';

import { Medida } from '../medida/medida.model';
import { MedidaService } from '../medida/medida.service';
import { ITEMS_PER_PAGE, Principal } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-medida',
    templateUrl: './medida.cliente.component.html'
})
export class MedidaClienteComponent implements OnInit, OnDestroy {
medidasCliente: Medida[];
    currentAccount: any;
    eventSubscriber: Subscription;
  private subscription: any;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private medidaService: MedidaService,
        private alertService: AlertService,
        private eventManager: EventManager,
        private principal: Principal,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['medida', 'tipoFalda']);
    }

    loadAll(id) {
        this.medidaService.queryByCliente(id).subscribe(
            (res: Response) => {
                this.medidasCliente = res.json();
            },
            (res: Response) => this.onError(res.json())
        );
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.loadAll(params['id']);
        });
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
    }

    ngOnDestroy() {
        // this.eventManager.destroy(this.eventSubscriber);
    }

    trackId (index: number, item: Medida) {
        return item.id;
    }

    private onError (error) {
        this.alertService.error(error.message, null, null);
    }
}
