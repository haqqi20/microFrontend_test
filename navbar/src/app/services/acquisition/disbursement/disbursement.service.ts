import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import json from 'src/assets/demo/data/disbursement-data.json'

@Injectable({
  providedIn: 'root'
})
export class DisbursementService {

  private indexTab = new BehaviorSubject(0);
  currentIndexTab = this.indexTab.asObservable();

  apps1 = json.data;
  private apps1Source = new BehaviorSubject(this.apps1);
  currentApps1 = this.apps1Source.asObservable();

  apps = [];
  private apps2Source = new BehaviorSubject(this.apps);
  currentApps2 = this.apps2Source.asObservable();

  private apps3Source = new BehaviorSubject(this.apps);
  currentApps3 = this.apps3Source.asObservable();

  private apps4Source = new BehaviorSubject(this.apps);
  currentApps4 = this.apps4Source.asObservable();

  constructor() { }

  changeIndexTab(indexTab: number) {
    this.indexTab.next(indexTab);
  }

  changeApps1(apps: any[]) {
    this.apps1Source.next(apps);
  }

  changeApps2(apps: any[]) {
    this.apps2Source.next(apps);
  }

  changeApps3(apps: any[]) {
    this.apps3Source.next(apps);
  }

  changeApps4(apps: any[]) {
    this.apps4Source.next(apps);
  }
}
