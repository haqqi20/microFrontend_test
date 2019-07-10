import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RoleRequest } from 'src/app/models/global_set/role/role-request';
import { Role } from 'src/app/models/global_set/role/role';
import { Observable, throwError } from 'rxjs';
import { RoleResponse } from 'src/app/models/global_set/role/role-response';
import { catchError } from 'rxjs/operators';
import { RoleMenu } from 'src/app/models/global_set/role/role-menu';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  apiURL = 'http://localhost:8099/';

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  getRoleList(roleRequest: RoleRequest) {
    return this.http.post(this.apiURL + 'role/list', JSON.stringify(roleRequest), this.httpOptions);
  }

  getMenu() {
    return this.http.get(this.apiURL + 'menu/tree/');
  }

  getMenuById(roleId: string) {
    return this.http.get(this.apiURL + 'menu/tree/' + roleId);
  }

  handleError(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
  handleSuccess(data: RoleResponse) {
    window.alert(data.response);
  }
}
