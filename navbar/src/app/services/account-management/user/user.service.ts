import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {User} from 'src/app/models/account-management/user/user';
import {Userlist} from 'src/app/models/account-management/user/userlist';

@Injectable({
    providedIn: 'root'
})

export class UserService {

    apiURL = 'http://192.168.0.222:5555';

    constructor(private http: HttpClient) {
    }


    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };

  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiURL + '/user', JSON.stringify(user), this.httpOptions)
    .pipe(catchError(this.handleError)
    );
  }

    getuserlist(userlist: Userlist): Observable<Userlist> {
        // return this.http.get<any>('assets/demo/data/cars-small.json')
        return this.http.post<Userlist>(this.apiURL + '/userlist', JSON.stringify(userlist), this.httpOptions)
            .pipe(catchError(this.handleError)
            );
    }

    updateUser(uuid: string, user: User): Observable<User> {
        return this.http.put<User>(this.apiURL + '/User/' + uuid, JSON.stringify(User), this.httpOptions)
            .pipe(catchError(this.handleError));
    }

    getUserByUUID(uuid: string): Observable<User> {
        return this.http.get<User>(this.apiURL + '/user/' + uuid)
            .pipe(catchError(this.handleError));
    }
    handleError(error) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
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
