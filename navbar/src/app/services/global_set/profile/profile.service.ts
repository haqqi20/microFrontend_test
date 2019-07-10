import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Employee } from 'src/app/models/global_set/employee/employee';
import { EmployeeResponse } from 'src/app/models/global_set/employee/employee-response';
import { UploadResponse } from 'src/app/models/global_set/company/upload-response';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  // apiURL = 'http://192.168.0.222:5551/';
  apiURL = 'http://localhost:8092/';

  private avatarSource = new BehaviorSubject('');
  currentAvatar = this.avatarSource.asObservable();

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  changeAvatarTopBar(avater: string) {
    this.avatarSource.next(avater)
  }

  getAvatar(emplId: string): Observable<Employee> {
    return this.http.get<Employee>(this.apiURL + 'profile/' + emplId + '/avatar');
  }

  deleteAvatar(emplId: string, updatedBy: number): Observable<EmployeeResponse> {
    return this.http.put<EmployeeResponse>(this.apiURL + 'profile/' + emplId + '/avatar', {'updatedBy': updatedBy}, this.httpOptions);
  }

  updateProfile(emplId: string, profile: Employee): Observable<EmployeeResponse> {
    return this.http.put<EmployeeResponse>(this.apiURL + 'profile/' + emplId, JSON.stringify(profile), this.httpOptions);
  }

  uploadAvatar(emplId: string, updatedBy: string, avatar: File): Observable<UploadResponse> {
    const formData: FormData = new FormData;
    formData.append('avatar', avatar);
    formData.append('updatedBy', updatedBy);
    return this.http.post<UploadResponse>(this.apiURL + 'profile/' + emplId + '/upload', formData);
  }

}
