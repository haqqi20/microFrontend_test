import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Password } from 'src/app/models/auth/password';

@Injectable({
  providedIn: 'root'
})
export class ChangePasswordService {

  // apiURL = 'http://192.168.0.222:5553';
  apiURL = 'http://localhost:9000';

  constructor(private http : HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  changePassword(username: string, password: Password) {
    return this.http.put(this.apiURL + '/change/' + username, JSON.stringify(password), this.httpOptions)
    .pipe(catchError(this.handleError));
  }

  handleError(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
  
  handleSuccess(data) {
    window.alert(data.response);
  }

}
