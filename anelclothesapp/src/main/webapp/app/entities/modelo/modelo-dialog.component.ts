import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { Response } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService, JhiLanguageService, DataUtils } from 'ng-jhipster';

import { Modelo } from './modelo.model';
import { ModeloPopupService } from './modelo-popup.service';
import { ModeloService } from './modelo.service';
import { Cliente, ClienteService } from '../cliente';

@Component({
    selector: 'jhi-modelo-dialog',
    templateUrl: './modelo-dialog.component.html'
})
export class ModeloDialogComponent implements OnInit {

    modelo: Modelo;
    authorities: any[];
    isSaving: boolean;
    idCliente: number;
    private sub: any;
    clientes: Cliente[];
    constructor(
        public activeModal: NgbActiveModal,
        private jhiLanguageService: JhiLanguageService,
        private dataUtils: DataUtils,
        private alertService: AlertService,
        private modeloService: ModeloService,
        private clienteService: ClienteService,
        private eventManager: EventManager,
        private route: ActivatedRoute,
        private ngZone: NgZone
    ) {
        this.jhiLanguageService.setLocations(['modelo']);
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.clienteService.query().subscribe(
            (res: Response) => { this.clientes = res.json(); }, (res: Response) => this.onError(res.json()));
            console.log('Valor guardado: ' + localStorage.getItem('clienteId'));
            this.idCliente = +localStorage.getItem('clienteId');
    }
    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData($event, modelo, field, isImage) {
        if ($event.target.files && $event.target.files[0]) {
            let $file = $event.target.files[0];
            if (isImage && !/^image\//.test($file.type)) {
                return;
            }
            this.dataUtils.toBase64($file, (base64Data) => {
                modelo[field] = base64Data;
                modelo[`${field}ContentType`] = $file.type;
            });
        }
    }
    clear () {
        this.activeModal.dismiss('cancel');
    }

    save () {
        this.isSaving = true;
        if (this.modelo.id !== undefined) {
            this.modeloService.update(this.modelo)
                .subscribe((res: Modelo) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
        } else {
            this.modelo.id = +localStorage.getItem('clienteId');
            this.modeloService.create(this.modelo)
                .subscribe((res: Modelo) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
        }
    }

    private onSaveSuccess (result: Modelo) {
        this.eventManager.broadcast({ name: 'modeloListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
        this.ngZone.run(() => {
                console.log('Reloading component');
        });
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

    trackClienteById(index: number, item: Cliente) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-modelo-popup',
    template: ''
})
export class ModeloPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private modeloPopupService: ModeloPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if ( params['id'] ) {
                this.modalRef = this.modeloPopupService
                    .open(ModeloDialogComponent, params['id']);
            } else {
                this.modalRef = this.modeloPopupService
                    .open(ModeloDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
