import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, JhiLanguageService } from 'ng-jhipster';

import { Medida } from './medida.model';
import { MedidaPopupService } from './medida-popup.service';
import { MedidaService } from './medida.service';

@Component({
    selector: 'jhi-medida-delete-dialog',
    templateUrl: './medida-delete-dialog.component.html'
})
export class MedidaDeleteDialogComponent {

    medida: Medida;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private medidaService: MedidaService,
        public activeModal: NgbActiveModal,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['medida', 'tipoFalda']);
    }

    clear () {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete (id: number) {
        this.medidaService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'medidaListModification',
                content: 'Deleted an medida'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-medida-delete-popup',
    template: ''
})
export class MedidaDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private medidaPopupService: MedidaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.modalRef = this.medidaPopupService
                .open(MedidaDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
