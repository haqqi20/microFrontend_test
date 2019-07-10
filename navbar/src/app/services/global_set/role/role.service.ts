import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RoleRequest } from 'src/app/models/global_set/role/role-request';
import { Role } from 'src/app/models/global_set/role/role';
import { Observable, throwError, Subject } from 'rxjs';
import { RoleResponse } from 'src/app/models/global_set/role/role-response';
import { catchError, tap } from 'rxjs/operators';
import { RoleMenu } from 'src/app/models/global_set/role/role-menu';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  // apiURL = 'http://192.168.0.222:5552/';
  apiURL = 'http://localhost:8095/';

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  private _refreshNeeded$ = new Subject<void>();

  get refreshNeeded$() {
    return this._refreshNeeded$;
  }
  
  getRoleList(roleRequest: RoleRequest) {
    return this.http.get(this.apiURL + 'role/list');
  }

  getRoles() {
    return this.http.get(this.apiURL + 'role/list');
  }

  getRoleById(roleId: string) {
    return this.http.get(this.apiURL + 'role/' + roleId);
  }

  addRole(role: Role): Observable<RoleResponse> {
    return this.http.post<RoleResponse>(this.apiURL + 'role', JSON.stringify(role), this.httpOptions).pipe(
      tap(() => {
        this._refreshNeeded$.next();
      })
    )
  }

  updateRole(roleId: string, role: Role):Observable<RoleResponse> {
    return this.http.put<RoleResponse>(this.apiURL + 'role/' + roleId, JSON.stringify(role), this.httpOptions);
}

// getRoleMenu(menu: Menu, roleId:string): Observable<Menu> {
//   // return this.http.post<roleId>(this.apiURL + 'role/' + roleId + 'menu',  );
//   return this.http.post<Menu>(this.apiURL + '/role' + roleId + '/menu', JSON.stringify(Menu), this.httpOptions)
// }

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
  handleSuccess(data: RoleResponse) {
    window.alert(data.response);
  }
}
