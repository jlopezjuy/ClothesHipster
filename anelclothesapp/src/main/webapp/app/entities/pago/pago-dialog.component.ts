import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService, JhiLanguageService } from 'ng-jhipster';

import { Pago } from './pago.model';
import { PagoPopupService } from './pago-popup.service';
import { PagoService } from './pago.service';
import { Encargo, EncargoService } from '../encargo';

@Component({
    selector: 'jhi-pago-dialog',
    templateUrl: './pago-dialog.component.html'
})
export class PagoDialogComponent implements OnInit {

    pago: Pago;
    authorities: any[];
    isSaving: boolean;

    encargos: Encargo[];
    constructor(
        public activeModal: NgbActiveModal,
        private jhiLanguageService: JhiLanguageService,
        private alertService: AlertService,
        private pagoService: PagoService,
        private encargoService: EncargoService,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['pago']);
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.encargoService.query().subscribe(
            (res: Response) => { this.encargos = res.json(); }, (res: Response) => this.onError(res.json()));
    }
    clear () {
        this.activeModal.dismiss('cancel');
    }

    save () {
        this.isSaving = true;
        if (this.pago.id !== undefined) {
            this.pagoService.update(this.pago)
                .subscribe((res: Pago) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
        } else {
            this.pagoService.create(this.pago)
                .subscribe((res: Pago) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
        }
    }

    private onSaveSuccess (result: Pago) {
        this.eventManager.broadcast({ name: 'pagoListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError (error) {
        try {
            error.json();
        } catch (exception) {
            error.message = error.text();
        }
        this.isSaving = false;
        this.onError(error);
    }

    private onError (error) {
        this.alertService.error(error.message, null, null);
    }

    trackEncargoById(index: number, item: Encargo) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-pago-popup',
    template: ''
})
export class PagoPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private pagoPopupService: PagoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if ( params['id'] ) {
                this.modalRef = this.pagoPopupService
                    .open(PagoDialogComponent, params['id']);
            } else {
                this.modalRef = this.pagoPopupService
                    .open(PagoDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
