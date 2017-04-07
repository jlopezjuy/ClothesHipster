import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, JhiLanguageService } from 'ng-jhipster';

import { Encargo } from './encargo.model';
import { EncargoPopupService } from './encargo-popup.service';
import { EncargoService } from './encargo.service';

@Component({
    selector: 'jhi-encargo-delete-dialog',
    templateUrl: './encargo-delete-dialog.component.html'
})
export class EncargoDeleteDialogComponent {

    encargo: Encargo;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private encargoService: EncargoService,
        public activeModal: NgbActiveModal,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['encargo', 'estado', 'tipoEncargo']);
    }

    clear () {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete (id: number) {
        this.encargoService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'encargoListModification',
                content: 'Deleted an encargo'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-encargo-delete-popup',
    template: ''
})
export class EncargoDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private encargoPopupService: EncargoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.modalRef = this.encargoPopupService
                .open(EncargoDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
