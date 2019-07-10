import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  constructor(
    private http: HttpClient
  ) { }

  getSurveyorData() {
    return this.http.get<any>('assets/demo/data/survey-surveyor-data.json')
      .toPromise()
      .then(res => <SurveyService[]>res.data)
      .then(data => data);
  }
}
