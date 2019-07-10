import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import json from 'src/assets/demo/data/approval-data.json'

@Injectable({
  providedIn: 'root'
})
export class ApprovalService {

  apps = json.data;
  private appsSource = new BehaviorSubject(this.apps);
  currentApps = this.appsSource.asObservable();

  constructor() { }

  changeApps(apps: any[]) {
    this.appsSource.next(apps);
  }
}
