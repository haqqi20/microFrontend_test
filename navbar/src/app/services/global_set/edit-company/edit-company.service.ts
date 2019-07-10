import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { UploadResponse } from 'src/app/models/global_set/company/upload-response';
import { Company } from 'src/app/models/global_set/company/company';


@Injectable({
  providedIn: 'root'
})
export class EditCompanyService {
  // apiURL = 'http://192.168.0.222:5551/';
  apiURL = 'http://localhost:8096/';

  private logoSource = new BehaviorSubject('');
  currentLogo = this.logoSource.asObservable();

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  changeLogoTopBar(logo: string) {
    this.logoSource.next(logo)
  }

  getCompany(cmpyId: string): Observable<Company> {
    return this.http.get<Company>(this.apiURL + 'company/' + cmpyId);
  }

  getCompanyLogo(cmpyId: string): Observable<Company> {
    return this.http.get<Company>(this.apiURL + 'company/' + cmpyId + '/logo');
  }

  deleteCompanyLogo(emplId: string, updatedBy: number) {
    return this.http.put(this.apiURL + 'company/' + emplId + '/logo', {'updatedBy': updatedBy}, this.httpOptions);
  }

  editCompany(cmpyId: string, company: Company) {
    return this.http.put(this.apiURL + 'company/' + cmpyId, JSON.stringify(company), this.httpOptions);
  }

  uploadLogo(cmpyId: string, updatedBy: string, logo: File): Observable<UploadResponse> {
    const formData: FormData = new FormData;
    formData.append('logo', logo);
    formData.append('updatedBy', updatedBy);
    return this.http.post<UploadResponse>(this.apiURL + 'company/' + cmpyId + '/upload', formData);
  }
    
}

