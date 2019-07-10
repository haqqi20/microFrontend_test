import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ModelAplication } from '../../../models/acquisition/aplication/model-aplication';
import {BehaviorSubject} from 'rxjs/internal/BehaviorSubject';
import {Car} from '@app/dashboard/domain/car';


@Injectable()
export class AplicationService {
  modelAplication: ModelAplication[] = [];
  private template = new BehaviorSubject(this.modelAplication);
  currentTemplate = this.template.asObservable();
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
    constructor(private http: HttpClient) { }


  getAplication() {
    return this.http.get<any>('assets/demo/data/applications.json')
      .toPromise()
      .then(res => <ModelAplication[]>res.data)
      .then(data => data);
  }

  isiTemplate(payload: any) {
    console.log(payload);
    this.modelAplication.push(payload);
    console.log(this.modelAplication);
  }





}
