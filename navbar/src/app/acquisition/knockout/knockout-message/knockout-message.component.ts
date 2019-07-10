import { Component, OnInit } from '@angular/core';
import { Message } from 'primeng/components/common/api';
import { MessageKnockoutService } from 'src/app/services/acquisition/knockout/message-knockout.service';

@Component({
  selector: 'app-knockout-message',
  templateUrl: './knockout-message.component.html',
  styleUrls: ['./knockout-message.component.css']
})
export class KnockoutMessageComponent implements OnInit {

  messages: Message[];

  constructor(private knocService: MessageKnockoutService) { }

  ngOnInit() {
    this.knocService.currentMessageInUser.subscribe(data => {
      if (data !== []) {
        this.messages = data;
      }
    });
  }

  clearMessage() {
    this.knocService.clearMessageInUser();
  }
}
