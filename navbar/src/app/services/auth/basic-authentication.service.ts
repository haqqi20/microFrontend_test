import {API_URL, CLIENT_ID, SECRET_KEY} from '../../app.constants';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators';
import {Router} from "@angular/router";

const STORAGE_TOKEN = 'token';
const STORAGE_REFRESH_TOKEN = 'refresh_token';

@Injectable({
  providedIn: 'root'
})
export class BasicAuthenticationService {

  constructor(private http: HttpClient,
              private router: Router) { }

    private getArgHeaders(): any {

        const base64Credential: string = btoa( `${CLIENT_ID}` + ':' + `${SECRET_KEY}`);
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                'Authorization': 'Basic ' + base64Credential
            })
        };
        return httpOptions;
    }

  executeJWTAuthenticationService(username, password) {

      console.log('perform user auth');

      const params = new URLSearchParams();
      params.append('username', username);
      params.append('password', password);
      params.append('grant_type', 'password');

    return this.http.post<any>(
      `${API_URL}/mfauth/oauth/token`,
      params.toString(),
      this.getArgHeaders()).pipe(
        map(
          data => {
            return data;
          }
        )
      );
  }


  getAuthenticatedUser() {
    return sessionStorage.getItem(STORAGE_TOKEN);
  }

  getAuthenticatedToken() {
    if (this.getAuthenticatedUser()) {
      return sessionStorage.getItem(STORAGE_TOKEN);
    }
  }

  isUserLoggedIn() {
    const user = sessionStorage.getItem(STORAGE_TOKEN);

      if (user === null) {
          return false;
      } else {
          return true;
      }
  }

  logout() {
    sessionStorage.removeItem(STORAGE_TOKEN);
    sessionStorage.removeItem(STORAGE_REFRESH_TOKEN);
  }

}

export class AuthenticationBean {
  constructor(public message: string) { }
}
