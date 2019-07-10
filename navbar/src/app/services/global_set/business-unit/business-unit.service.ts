import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BusinessUnit } from 'src/app/models/global_set/business-unit/business-unit'
import { BusinessUnitRequest } from 'src/app/models/global_set/business-unit/business-unit-request'
import { BusinessUnitResponse } from 'src/app/models/global_set/business-unit/business-unit-response'
import { BusinessUnitLookup } from 'src/app/models/global_set/business-unit/business-unit-lookup'

@Injectable({
  providedIn: 'root'
})
export class BusinessUnitService {

  apiURL = 'http://localhost:8093/';

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  addBusu(businessUnit: BusinessUnit): Observable<BusinessUnitResponse> {
    return this.http.post<BusinessUnitResponse>(this.apiURL + 'busu', JSON.stringify(businessUnit), this.httpOptions)
      .pipe(catchError(this.handleError))
  }

  getBusuList(businessUnitRequest: BusinessUnitRequest) {
    return this.http.post(this.apiURL + 'busu/list', JSON.stringify(businessUnitRequest), this.httpOptions);
  }

  getBusuById(busuId: string) {
    return this.http.get(this.apiURL + 'busu/' + busuId);
  }

  getBusuHead(): Observable<BusinessUnitLookup> {
    return this.http.get<BusinessUnitLookup>(this.apiURL + 'busu/')
    .pipe(catchError(this.handleError));
  }

  updateBusu(busuId: string, businessUnit: BusinessUnit): Observable<BusinessUnitResponse> {
    return this.http.put<BusinessUnitResponse>(this.apiURL + 'busu/' + busuId, JSON.stringify(businessUnit), this.httpOptions);
  }

  getBusuTypeList(): Observable<BusinessUnitLookup> {
    return this.http.get<BusinessUnitLookup>(this.apiURL + 'office/type/100')
    .pipe(catchError(this.handleError))
  }

  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  handleSuccess(data: BusinessUnitResponse) {
    window.alert(data.response);
  }
}
