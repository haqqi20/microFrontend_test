import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Employee } from 'src/app/models/global_set/employee/employee';
// import {catchError} from 'rxjs/operators';
import { EmployeeRequest } from 'src/app/models/global_set/employee/employee-request';
import { EmployeeRoleRequestParent } from 'src/app/models/global_set/employee/employee-role-request';
import { EmployeeOfficeRequestParent } from 'src/app/models/global_set/employee/employee-office-request';
import { throwError, Observable } from 'rxjs';
import { EmployeeResponse } from 'src/app/models/global_set/employee/employee-response';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  // apiURL = 'http://192.168.0.222:5552/';
  apiURL = 'http://localhost:8097/';

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  getEmployeeList(employeeRequest: EmployeeRequest) {
    return this.http.post(this.apiURL + 'employee/list', JSON.stringify(employeeRequest), this.httpOptions);
  }

  getEmployees() {
    return this.http.get(this.apiURL + 'employee/list');
  }

  getEmployeeById(empId: string) {
    return this.http.get(this.apiURL + 'employee/' + empId);
  }

  getEmployeeRole(empId: string) {
    return this.http.get(this.apiURL + 'employee/' + empId + '/role');
  }

  getEmployeeCompany(empId: string) {
    return this.http.get(this.apiURL + 'employee/' + empId + '/company');
  }

  getEmployeeOffice(empId: string) {
    return this.http.get(this.apiURL + 'employee/' + empId + '/office');
  }

  assignEmployeeRole(empId: string, requestBody: EmployeeRoleRequestParent) {
    return this.http.post(this.apiURL + 'employee/' + empId + '/role', JSON.stringify(requestBody), this.httpOptions);
  }

  updateEmployee(uuid: string, employee: Employee): Observable<EmployeeResponse> {
    return this.http.put<EmployeeResponse>(this.apiURL + 'employee/' + uuid, JSON.stringify(employee), this.httpOptions);
  }

  updateIsEnabled(uuid: string, isEnabled: boolean, updatedBy: number): Observable<EmployeeResponse> {
      return this.http.put<EmployeeResponse>(this.apiURL + 'enabled/' + uuid, {'isEnabled': isEnabled, 'updatedBy': updatedBy},
          this.httpOptions);
  }

  assignEmployeeOffice(empId: string, requestBody: EmployeeOfficeRequestParent ) {
    return this.http.post(this.apiURL + 'employee/' + empId + '/office', JSON.stringify(requestBody), this.httpOptions);
  }

  addEmployee(employee: Employee): Observable<EmployeeResponse> {
    return this.http.post<EmployeeResponse>(this.apiURL + 'employee', JSON.stringify(employee), this.httpOptions);
  }

  getEmployeeTypeList() {
    return this.http.get(this.apiURL + 'employee/type');
  }

  getEmployeeStatusList() {
    return this.http.get(this.apiURL + 'employee/status');
  }

  getSupervisorList() {
    return this.http.get(this.apiURL + 'employee/head');
  }

  getUserStatus(emplId: string) {
    return this.http.get(this.apiURL + 'status/' + emplId);
  }

}
