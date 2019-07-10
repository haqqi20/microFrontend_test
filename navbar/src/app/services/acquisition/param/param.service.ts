import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Param } from 'src/app/models/acquisition/param/param';

@Injectable({
  providedIn: 'root'
})
export class ParamService {

  apiURL = 'http://localhost:8192/';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  getParameterList() {
    return this.http.get(this.apiURL + 'parameter/list');
  }

  getTenorByUUID(paramId: string) {
    return this.http.get(this.apiURL + 'parameter/value/' + paramId);
  }

}
