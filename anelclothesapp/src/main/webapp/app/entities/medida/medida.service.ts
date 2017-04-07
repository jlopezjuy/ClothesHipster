import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, BaseRequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Medida } from './medida.model';
import { DateUtils } from 'ng-jhipster';
@Injectable()
export class MedidaService {

    private resourceUrl = 'api/medidas';

    constructor(private http: Http, private dateUtils: DateUtils) { }

    create(medida: Medida): Observable<Medida> {
        let copy: Medida = Object.assign({}, medida);
        copy.fechaMedida = this.dateUtils
            .convertLocalDateToServer(medida.fechaMedida);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    update(medida: Medida): Observable<Medida> {
        let copy: Medida = Object.assign({}, medida);
        copy.fechaMedida = this.dateUtils
            .convertLocalDateToServer(medida.fechaMedida);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    find(id: number): Observable<Medida> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            let jsonResponse = res.json();
            jsonResponse.fechaMedida = this.dateUtils
                .convertLocalDateFromServer(jsonResponse.fechaMedida);
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
            jsonResponse[i].fechaMedida = this.dateUtils
                .convertLocalDateFromServer(jsonResponse[i].fechaMedida);
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
