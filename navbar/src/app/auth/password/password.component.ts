import { Component, OnInit, Input } from '@angular/core';
import { ChangePasswordService } from 'src/app/services/auth/change-passsword/change-password.service';
import { Password } from 'src/app/models/auth/password';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {

  // @Input() passwordData = { 
  //   oldPass: '', 
  //   newPass: '',
  //   cekPass: '',
  // }

  passwordData: Password;

  constructor(
    private passwordService: ChangePasswordService
  ) { }

  ngOnInit() {
    this.passwordData = new Password;
  }

  changePassword() {
    this.passwordService.changePassword("faisal", this.passwordData).subscribe(data =>
      {
        this.passwordService.handleSuccess(data);
      }
    )
  }

}
