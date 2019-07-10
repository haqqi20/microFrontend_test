import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Message } from 'primeng/api';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiURL = 'http://localhost:8091/';

  messages: Message[];

  private back = new BehaviorSubject(true);
  currentBack = this.back.asObservable();

  private messageInUser = new BehaviorSubject(this.messages);
  currentMessageInUser = this.messageInUser.asObservable();

  constructor(
    private http: HttpClient
  ) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  changeBack(back: boolean) {
    this.back.next(back);
  }

  changeMessageInUser(status: string, message: string) {
    let messages: Message[] = [];
    if(status === 'success') {
      messages.push({ severity: 'success', summary: 'Success', detail: message });
      this.messageInUser.next(messages);
    }
    else {
      messages.push({ severity: 'error', summary: 'Error', detail: message });
      this.messageInUser.next(messages);
    }
  }

  clearMessageInUser() {
    this.messageInUser.next([]);
  }

  resetPass(empId: string) {
    return this.http.put(this.apiURL + 'reset/' + empId, {});
  }

  invite(empId: string) {
    return this.http.post(this.apiURL + 'invite/' + empId, {});
  }
}
