import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { DateUtils, DataUtils, EventManager } from 'ng-jhipster';
import { AnelclothesappTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { PagoDetailComponent } from '../../../../../../main/webapp/app/entities/pago/pago-detail.component';
import { PagoService } from '../../../../../../main/webapp/app/entities/pago/pago.service';
import { Pago } from '../../../../../../main/webapp/app/entities/pago/pago.model';

describe('Component Tests', () => {

    describe('Pago Management Detail Component', () => {
        let comp: PagoDetailComponent;
        let fixture: ComponentFixture<PagoDetailComponent>;
        let service: PagoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AnelclothesappTestModule],
                declarations: [PagoDetailComponent],
                providers: [
                    DateUtils,
                    DataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    PagoService,
                    EventManager
                ]
            }).overrideComponent(PagoDetailComponent, {
                set: {
                    template: ''
                }
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PagoDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PagoService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Pago(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.pago).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});
