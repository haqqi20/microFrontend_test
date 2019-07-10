import {Component, Inject, OnInit} from '@angular/core';
import {SESSION_STORAGE, StorageService} from 'ngx-webstorage-service';
import {Router} from '@angular/router';
import {BasicAuthenticationService} from '../../services/auth/basic-authentication.service';
import {NgxSpinnerService} from 'ngx-spinner';
import { JwtHelperService } from '@auth0/angular-jwt';

const STORAGE_TOKEN = 'token';
const STORAGE_REFRESH_TOKEN = 'refresh_token';
const USERNAME = 'username';
const NAME = 'name';
const USERROLE = 'user_role';
const USERCOMP = 'user_comp';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    username = 'admin';
    password = 'admin123';
    errorMessage = 'Invalid Credentials';
    invalidLogin = 0;
    componentName = 'login';

    constructor(private router: Router,
                private  basicAuthenticationService: BasicAuthenticationService,
                @Inject(SESSION_STORAGE) private sessionStorage: StorageService,
                private spinner: NgxSpinnerService
    ) { }

  ngOnInit() {
  }

    handleJWTAuthLogin() {

        this.spinner.show();


        const helper = new JwtHelperService();

        this.basicAuthenticationService.executeJWTAuthenticationService(this.username, this.password)
            .subscribe(
                data => {

                    const access_token = data['access_token'];
                    const refresh_token = data['refresh_token'];

                    this.sessionStorage.set(STORAGE_TOKEN, access_token);
                    this.sessionStorage.set(STORAGE_REFRESH_TOKEN, refresh_token);

                    const decodedToken = helper.decodeToken(access_token);
                    const expirationDate = helper.getTokenExpirationDate(access_token);
                    const isExpired = helper.isTokenExpired(access_token);

                    console.log("token : ");
                    console.log(decodedToken);

                    this.sessionStorage.set(USERNAME, decodedToken['user_name']);
                    this.sessionStorage.set(USERROLE, JSON.stringify(decodedToken['authorities']));

                    // this.router.navigate(['welcome', this.username]);

                    this.spinner.hide();
                    this.router.navigate(['dashboard']);

                },
                error => {
                    console.log(error)
                    this.spinner.hide();
                    this.router.navigate(['/', this.errorMessage]);
                    this.invalidLogin++;

                }
            );
    }

}
