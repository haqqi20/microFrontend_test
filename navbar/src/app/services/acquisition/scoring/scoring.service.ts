import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Scoring } from '@app/models/acquisition/scoring/Scoring';

@Injectable({
  providedIn: 'root'
})
export class ScoringService {

  constructor(
    private http: HttpClient
  ) { }

  getScoringList(){
    return this.http.get<any>('assets/demo/data/scoring-data.json')
      .toPromise()
      .then(res => <Scoring[]>res.data)
      .then(data => data);
  }
}
