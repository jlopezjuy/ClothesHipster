import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, BaseRequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Encargo } from './encargo.model';
import { DateUtils } from 'ng-jhipster';
@Injectable()
export class EncargoService {

    private resourceUrl = 'api/encargos';

    constructor(private http: Http, private dateUtils: DateUtils) { }

    create(encargo: Encargo): Observable<Encargo> {
        let copy: Encargo = Object.assign({}, encargo);
        copy.fechaEncargo = this.dateUtils
            .convertLocalDateToServer(encargo.fechaEncargo);
        copy.fechaEntrega = this.dateUtils
            .convertLocalDateToServer(encargo.fechaEntrega);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    update(encargo: Encargo): Observable<Encargo> {
        let copy: Encargo = Object.assign({}, encargo);
        copy.fechaEncargo = this.dateUtils
            .convertLocalDateToServer(encargo.fechaEncargo);
        copy.fechaEntrega = this.dateUtils
            .convertLocalDateToServer(encargo.fechaEntrega);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    find(id: number): Observable<Encargo> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            let jsonResponse = res.json();
            jsonResponse.fechaEncargo = this.dateUtils
                .convertLocalDateFromServer(jsonResponse.fechaEncargo);
            jsonResponse.fechaEntrega = this.dateUtils
                .convertLocalDateFromServer(jsonResponse.fechaEntrega);
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
            jsonResponse[i].fechaEncargo = this.dateUtils
                .convertLocalDateFromServer(jsonResponse[i].fechaEncargo);
            jsonResponse[i].fechaEntrega = this.dateUtils
                .convertLocalDateFromServer(jsonResponse[i].fechaEntrega);
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
