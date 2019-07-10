import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Fee } from 'src/app/models/acquisition/fee/fee';
import { Message } from 'primeng/api';
import { BehaviorSubject, Subject } from 'rxjs';
import { FeeProperty } from 'src/app/models/acquisition/fee/fee-property';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FeeService {

  apiURL = 'http://localhost:8101/';

  private refresh = new Subject<void>();

  get refreshNeeded() {
    return this.refresh;
  }
  
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  messages: Message[]
  private message = new BehaviorSubject(this.messages);
  currentMessage = this.message.asObservable();

  constructor(private http: HttpClient) { }

  getFees() {
    return this.http.get(this.apiURL + 'fee/list');
  }

  getListFeeName() {
    return this.http.get(this.apiURL + 'fee/name');
  }

  getFee(feeId: string) {
    return this.http.get(this.apiURL + 'fee/' + feeId);
  }

  getFeeProperties(feeId: string) {
    return this.http.get(this.apiURL + 'fee/' + feeId + '/property');
  }

  addFee(fee: Fee) {
    return this.http.post(this.apiURL + 'fee', JSON.stringify(fee), this.httpOptions);
  }

  addFeeProperty(feeId: string, feeProperties: {}) {
    return this.http.post(this.apiURL + 'fee/' + feeId + '/property', JSON.stringify(feeProperties), this.httpOptions);
  }

  updateFee(feeId: string, fee: Fee) {
    return this.http.put(this.apiURL + 'fee/' + feeId, JSON.stringify(fee), this.httpOptions);
  }

  updateFeeProperty(feeId: string, feePropId: string, feeProperty: FeeProperty) {
    return this.http.put(this.apiURL + 'fee/' + feeId + '/property/' + feePropId, JSON.stringify(feeProperty), this.httpOptions).pipe(
      tap(() => {
        this.refresh.next();
      }));
  }

  changeMessage(status: string, message: string) {
    let messages: Message[] = [];
    if (status === 'success') {
      messages.push({ severity: 'success', summary: 'Success', detail: message });
      this.message.next(messages);
    }
    else {
      messages.push({ severity: 'error', summary: 'Error', detail: message });
      this.message.next(messages);
    }
  }

  clearMessage() {
    this.message.next([]);
  }
}
