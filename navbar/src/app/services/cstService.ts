import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CstData} from './domain/cstData';

@Injectable()
export class CstService {

    constructor(private http: HttpClient) {}

    getCstService() {
        return this.http.get<any>('assets/demo/data/cust-data.json')
                    .toPromise()
                    .then(res => <CstData[]> res.data)
                    .then(data => data);
    }
}
