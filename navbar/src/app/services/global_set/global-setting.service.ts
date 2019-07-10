import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Lookup } from 'src/app/models/global_set/lookup';

@Injectable({
  providedIn: 'root'
})
export class GlobalSettingService {

  private rowsOptions = new BehaviorSubject([]);
  currentRowsOptions = this.rowsOptions.asObservable();

  private rows = new BehaviorSubject(10);
  currentRows = this.rows.asObservable();

  apiUrl = 'http://localhost:8181/'

  constructor(private http: HttpClient) { }

  getLookup(lookupName: string): Observable<Lookup[]> {
    return this.http.get<Lookup[]>(this.apiUrl + 'lookup/' + lookupName);
  }

  getPaginationOptions() {
    this.getLookup('pagination.number').subscribe(data => {
      if (data !== undefined) {
        let paginations = [];
        for (const lookup of data) {
          paginations.push(+lookup['lookupValue']);
        }
        this.rowsOptions.next(paginations.sort((a, b) => a - b));
        this.rows.next(paginations[0]);
      } else {
        this.rowsOptions.next([10]);
      }
    });
  }
  
}
