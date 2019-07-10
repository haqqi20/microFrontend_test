import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LookupPropertiesService {

  apiURL = 'http://localhost:8181/';

  constructor(private http : HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  getLookup() {
    return this.http.get(this.apiURL + 'lookup/knockout.criteria');
  }

  getLookupOperator() {
    return this.http.get(this.apiURL + 'lookup/knockout.operator');
  }

  getLookupDocument() {
    return this.http.get(this.apiURL + 'lookup/Personal Identity');
  }
}
