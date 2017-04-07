import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, BaseRequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Pago } from './pago.model';
import { DateUtils } from 'ng-jhipster';
@Injectable()
export class PagoService {

    private resourceUrl = 'anelapi/api/pagos';

    constructor(private http: Http, private dateUtils: DateUtils) { }

    create(pago: Pago): Observable<Pago> {
        let copy: Pago = Object.assign({}, pago);
        copy.fechaPago = this.dateUtils
            .convertLocalDateToServer(pago.fechaPago);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    update(pago: Pago): Observable<Pago> {
        let copy: Pago = Object.assign({}, pago);
        copy.fechaPago = this.dateUtils
            .convertLocalDateToServer(pago.fechaPago);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    find(id: number): Observable<Pago> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            let jsonResponse = res.json();
            jsonResponse.fechaPago = this.dateUtils
                .convertLocalDateFromServer(jsonResponse.fechaPago);
            return jsonResponse;
        });
    }

    query(req?: any): Observable<Response> {
        let options = this.createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: any) => this.convertResponse(res))
        ;
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }


    private convertResponse(res: any): any {
        let jsonResponse = res.json();
        for (let i = 0; i < jsonResponse.length; i++) {
            jsonResponse[i].fechaPago = this.dateUtils
                .convertLocalDateFromServer(jsonResponse[i].fechaPago);
        }
        res._body = jsonResponse;
        return res;
    }

    private createRequestOption(req?: any): BaseRequestOptions {
        let options: BaseRequestOptions = new BaseRequestOptions();
        if (req) {
            let params: URLSearchParams = new URLSearchParams();
            params.set('page', req.page);
            params.set('size', req.size);
            if (req.sort) {
                params.paramsMap.set('sort', req.sort);
            }
            params.set('query', req.query);

            options.search = params;
        }
        return options;
    }
}
