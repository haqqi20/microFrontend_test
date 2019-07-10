import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/global_set/user/user.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  uuid = this.actRoute.snapshot.params['uuid'];

  constructor(
    private userService: UserService,
    private actRoute: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    
  }

  resetPass(){
    this.userService.resetPass(this.uuid).subscribe(() => {
      this.userService.changeMessageInUser('success', 'Reset password has been sent');
      this.location.back();
    })
  }

  cancel() {
    this.location.back();
  }

}
