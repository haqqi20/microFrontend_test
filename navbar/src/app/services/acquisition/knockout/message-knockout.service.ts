import { Injectable } from '@angular/core';
import { Message } from 'primeng/api';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class MessageKnockoutService {
  
  messages: Message[];

  private messageInUser = new BehaviorSubject(this.messages);
  currentMessageInUser = this.messageInUser.asObservable();

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
}
