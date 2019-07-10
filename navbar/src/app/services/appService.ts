import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DomData} from './domain/domData';

@Injectable()
export class AppService {

    constructor(private http: HttpClient) {}

    getAppService() {
        return this.http.get<any>('assets/demo/data/app-data.json')
                    .toPromise()
                    .then(res => <DomData[]> res.data)
                    .then(data => data);
    }
}
