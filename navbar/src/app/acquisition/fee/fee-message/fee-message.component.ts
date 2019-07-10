import { Component, OnInit } from '@angular/core';
import { FeeService } from 'src/app/services/acquisition/fee/fee.service';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-fee-message',
  templateUrl: './fee-message.component.html',
  styleUrls: ['./fee-message.component.css']
})
export class FeeMessageComponent implements OnInit {

  messages: Message[] = [];

  constructor(private feeService: FeeService) { }

  ngOnInit() {
    this.feeService.currentMessage.subscribe(data => {
      if(data !== []) {
        this.messages = data;
      }
    });
  }

  clearMessage() {
    this.feeService.clearMessage();
  }
}