import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/global_set/user/user.service';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-user-message',
  templateUrl: './user-message.component.html',
  styleUrls: ['./user-message.component.css']
})
export class UserMessageComponent implements OnInit {

  messages: Message[];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.currentMessageInUser.subscribe(data => {
      if(data !== []) {
        this.messages = data;
      }
    });
  }

  clearMessage() {
    this.userService.clearMessageInUser();
  }
}
