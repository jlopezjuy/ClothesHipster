import { Component, OnInit, OnDestroy } from '@angular/core';
import { Response } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager, ParseLinks, PaginationUtil, JhiLanguageService, AlertService, DataUtils } from 'ng-jhipster';

import { Modelo } from './modelo.model';
import { ModeloService } from './modelo.service';
import { ITEMS_PER_PAGE, Principal } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-modelo',
    templateUrl: './modelo.cliente.component.html'
})
export class ModeloClienteComponent implements OnInit, OnDestroy {
    modelosCliente: Modelo[];
    currentAccount: any;
    eventSubscriber: Subscription;
  private subscription: any;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private modeloService: ModeloService,
        private alertService: AlertService,
        private eventManager: EventManager,
        private principal: Principal,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['modelo']);
    }

    loadAll(id) {
        this.modeloService.queryByCliente(id).subscribe(
            (res: Response) => {
                this.modelosCliente = res.json();
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

    trackId (index: number, item: Modelo) {
        return item.id;
    }

    private onError (error) {
        this.alertService.error(error.message, null, null);
    }
}
