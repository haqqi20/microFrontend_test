import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, Subject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Knockout } from '@app/models/acquisition/knock-out/knockout';
import { KnockoutResponse } from '@app/models/acquisition/knock-out/knockout-response';
import { KnockoutList } from '@app/models/acquisition/knock-out/knockoutList';
import { Properties } from '@app/models/acquisition/knock-out/properties';

@Injectable({
  providedIn: 'root'
})
export class AddKnockoutService {

  apiURL = 'http://localhost:8100/';


  constructor(private http : HttpClient) { }

  private _refreshNeeded$ = new Subject<void>();

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  get refreshNeeded$() {
    return this._refreshNeeded$;
  }

  addKnockout(knockout: Knockout): Observable<KnockoutResponse> {
    return this.http.post<KnockoutResponse>(this.apiURL + 'knockout', JSON.stringify(knockout), this.httpOptions).pipe(
      tap(() => {
        this._refreshNeeded$.next();
      })
)
  }

  getKnockoutList() {
    return this.http.get(this.apiURL + 'knockout/list');
  }

  updateKnockout(knockoutId: string, knockout: Knockout): Observable<KnockoutResponse> {
    return this.http.put<KnockoutResponse>(this.apiURL + 'knockout/' + knockoutId, JSON.stringify(knockout), this.httpOptions).pipe(
      tap(() => {
        this._refreshNeeded$.next();
      })
)
  }

  addCriteria(knockoutId: string, prop: {}): Observable<KnockoutResponse> {
    return this.http.post<KnockoutResponse>(this.apiURL + 'knockout/' + knockoutId + '/property', JSON.stringify(prop), this.httpOptions).pipe(
      tap(() => {
        this._refreshNeeded$.next();
      })
)
  }

  updateCriteriaByUUID(knockoutId: string, knockoutPropertyId: string, prop: Properties): Observable<KnockoutResponse> {
    return this.http.put<KnockoutResponse>(this.apiURL + 'knockout/' + knockoutId + '/property/' + knockoutPropertyId,
        JSON.stringify(prop), this.httpOptions).pipe(
          tap(() => {
            this._refreshNeeded$.next();
          })
    )
}

  getKnockoutById(knockoutId: string): Observable<Knockout> {
      return this.http.get<Knockout>(this.apiURL + 'knockout/' + knockoutId)
  }

  getPropertiesList(knockoutId: string){
    return this.http.get(this.apiURL + 'knockout/' + knockoutId);
  }
}
