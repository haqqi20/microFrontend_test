import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/global_set/user/user.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-user-invitation',
  templateUrl: './user-invitation.component.html',
  styleUrls: ['./user-invitation.component.css']
})
export class UserInvitationComponent implements OnInit {

  uuid = this.actRoute.snapshot.params['uuid'];

  imageUrl: string;
  back = true;

  constructor(
    private userService: UserService,
    private actRoute: ActivatedRoute,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit() {
    this.userService.currentBack.subscribe(data => this.back = data);
  }

  invite() {
    this.userService.invite(this.uuid).subscribe(() => {
      this.userService.changeMessageInUser('success', 'Invitation email was sent successfully');
      if(this.back) {
        this.location.back();
      }
      else {
        this.router.navigateByUrl('globalsetting/user-management');
      }
    })
  }

  cancel() {
    if(this.back) {
      this.location.back();
    }
    else {
      this.router.navigateByUrl('globalsetting/user-management');
    }
  }

}
