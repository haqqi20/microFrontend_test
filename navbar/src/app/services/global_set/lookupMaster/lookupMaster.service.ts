import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LookupMaster } from '../../../models/global_set/lookupMaster/lookup-master';
import { Observable, throwError, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LookupResponse } from '../../../models/global_set/lookupMaster/lookup-response';

@Injectable()
export class LookupMasterService {
    apiURL = 'http://localhost:8098/';
    constructor(private http: HttpClient) { }

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };

    private _refreshNeeded$ = new Subject<void>();

    get refreshNeeded$() {
        return this._refreshNeeded$;
    }
    
    getLookupList() {
        return this.http.get(this.apiURL + 'lookup/list')
            .pipe(catchError(this.handleError)
            );
    }
    getLookupListByName(lookupName: string) {
        return this.http.post(this.apiURL + 'lookup/search', { 'lookupName': lookupName }, this.httpOptions);
    }
    addGroupMaster(lookupMaster: LookupMaster) {
        return this.http.post(this.apiURL + 'lookup', JSON.stringify(lookupMaster), this.httpOptions)
            .pipe(catchError(this.handleError)
            );
    }
    addLookupValue(lookupValue: {}, groupValue: string) {
        return this.http.post(this.apiURL + 'lookup/' + groupValue, JSON.stringify(lookupValue), this.httpOptions)
            .pipe(catchError(this.handleError)
            );
    }
    addLookupDetail(lookupDetail: {}, lookupHeadId: string) {
        return this.http.post(this.apiURL + 'lookup/' + lookupHeadId + '/detail', JSON.stringify(lookupDetail), this.httpOptions);
    }
    // addLookupDetail(lookupDetail: {}, lookupHeadId: string) {
    //     return this.http.post(this.apiURL + 'lookup/' + lookupHeadId + '/detail', JSON.stringify(lookupDetail), this.httpOptions)
    //         .pipe(catchError(this.handleError)
    //         );
    // }
    updateGroupByUUID(groupValue: string, lookupMaster: LookupMaster): Observable<LookupResponse> {
        return this.http.put<LookupResponse>(this.apiURL + 'lookup/group/' + groupValue, JSON.stringify(lookupMaster), this.httpOptions)
            .pipe(catchError(this.handleError));
    }
    updateLookupByUUID(lookupHeadId: string, lookupMaster: LookupMaster): Observable<LookupResponse> {
        return this.http.put<LookupResponse>(this.apiURL + 'lookup/' + lookupHeadId, JSON.stringify(lookupMaster), this.httpOptions)
            .pipe(catchError(this.handleError));
    }
    updateLookupDetailByUUID(lookupHeadId: string, lookupDetailId: string, lookupMaster: {}): Observable<LookupResponse> {
        return this.http.put<LookupResponse>(this.apiURL + 'lookup/' + lookupHeadId + '/detail/' + lookupDetailId,
            JSON.stringify(lookupMaster), this.httpOptions);
    }
    getLookupByName(lookupName: string) {
        return this.http.get(this.apiURL + 'lookup/name/' + lookupName);
    }
    getLookupByUUID(lookupHeadId: string): Observable<LookupMaster> {
        return this.http.get<LookupMaster>(this.apiURL + 'lookup/' + lookupHeadId)
            .pipe(catchError(this.handleError));
    }
    getGroupByUUID(groupValue: string): Observable<LookupMaster> {
        return this.http.get<LookupMaster>(this.apiURL + 'lookup/group/' + groupValue)
            .pipe(catchError(this.handleError));
    }
    getLookupDetailByvalue(groupValue: string): Observable<LookupMaster> {
        return this.http.get<LookupMaster>(this.apiURL + 'lookup/list/' + groupValue)
            .pipe(catchError(this.handleError));
    }
    getLookupDetailByUUID(lookupHeadId: string): Observable<LookupMaster> {
        return this.http.get<LookupMaster>(this.apiURL + 'lookup/' + lookupHeadId + '/detail')
            .pipe(catchError(this.handleError));
    }
    getGroupType() {
        return this.http.get(this.apiURL + 'lookup/group')
            .pipe(catchError(this.handleError));
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

}
