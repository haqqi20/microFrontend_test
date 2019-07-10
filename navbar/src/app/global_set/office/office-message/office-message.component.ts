import { Component, OnInit } from '@angular/core';
import { OfficeService } from 'src/app/services/global_set/office/office.service';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-office-message',
  templateUrl: './office-message.component.html',
  styleUrls: ['./office-message.component.css']
})
export class OfficeMessageComponent implements OnInit {

    messages: Message[];

    constructor(private msgOfficr: OfficeService) { }

    ngOnInit() {
        this.msgOfficr.currentMessageInOffice.subscribe(data => {
            if (data !== []) {
                this.messages = data;
            }
        });
    }

}
