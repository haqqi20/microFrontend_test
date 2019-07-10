import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ZipCodeService {

  apiURL = 'http://localhost:8094/';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  getLocation(nameFilter: string) {
    return this.http.post(this.apiURL + 'zipcode/list', {'nameFilter': nameFilter}, this.httpOptions);
  }
}
