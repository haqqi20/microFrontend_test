import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Office } from 'src/app/models/global_set/office/office';
import { OfficeLookup } from 'src/app/models/global_set/office/office-lookup';
import { OfficeList } from 'src/app/models/global_set/office/officelist';
import { TreeNode, Message } from 'primeng/api';
import { OfficeResponse } from 'src/app/models/global_set/office/office-response';

@Injectable({
  providedIn: 'root'
})

export class OfficeService {

  // apiURL = 'http://192.168.0.222:5552/';
  apiURL = 'http://localhost:8090/';
    messages: Message[];
    private messageInOffice = new BehaviorSubject(this.messages);
    currentMessageInOffice = this.messageInOffice.asObservable();
  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  getOfficeList(officeList?: OfficeList) {
    return this.http.get(this.apiURL + 'office/list')
    .pipe(catchError(this.handleError)
  );
  }

  addOffice(office: Office): Observable<OfficeResponse> {
    return this.http.post<OfficeResponse>(this.apiURL + 'office', JSON.stringify(office), this.httpOptions);
  }

  updateOffice(offcId: string, office: Office): Observable<OfficeResponse> {
    return this.http.put<OfficeResponse>(this.apiURL + 'office/' + offcId, JSON.stringify(office), this.httpOptions);
  }

  getOfficeChart() {
    return this.http.get(this.apiURL + 'office/tree' )
    .pipe(catchError(this.handleError));
  }

  getOfficeChartByUUID(offcId: string) {
    return this.http.get(this.apiURL + 'office/tree/' + offcId )
    .pipe(catchError(this.handleError));
  }

  getOfficeEmployee(offcId: string) {
    return this.http.get(this.apiURL + 'office/' + offcId + '/employee')
    .pipe(catchError(this.handleError));
  }

  getOfficeByUUID(offcId: string): Observable<Office> {
    return this.http.get<Office>(this.apiURL + 'office/' + offcId)
    .pipe(catchError(this.handleError));
  }

  getOfficeHeadList(): Observable<OfficeLookup> {
    return this.http.get<OfficeLookup>(this.apiURL + 'office/head')
    .pipe(catchError(this.handleError))
  }

  getOfficeTypeList(): Observable<OfficeLookup> {
    return this.http.get<OfficeLookup>(this.apiURL + 'office/type/100')
    .pipe(catchError(this.handleError))
  }

  handleError(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
  
  handleSuccess(data: OfficeResponse) {
    window.alert(data.response);
  }
}
