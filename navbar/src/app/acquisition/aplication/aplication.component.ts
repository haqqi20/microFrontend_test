import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {AplicationService} from '@app/services/acquisition/aplication/aplication.service';
import {ModelAplication} from '@app/models/acquisition/aplication/model-aplication';

@Component({
  selector: 'app-aplication',
  templateUrl: './aplication.component.html',
  styleUrls: ['./aplication.component.css']
})
export class AplicationComponent implements OnInit {

  aliasName = '';
  fullName = '';
  birthDate = '';
  identityNumber = '';
  address = '';
  motherName = '';

  show: boolean;
  apps = [];
  clonedApps = [];

  template: {} = {};
  templateData: ModelAplication[];

  visible: boolean = true;

  cols: any[];

  constructor(
    private router: Router,
    private http: HttpClient,
    private aplication: AplicationService
  ) { }

  ngOnInit() {
    // this.http.get<any>('assets/demo/data/applications.json')
    //   .toPromise()
    //   .then(res => res.data)
    //   .then(data => data)
    //   .then(apps => {
    //     this.apps = apps;
    //     this.clonedApps = apps;
    //   });

    this.aplication.getAplication().then(datas => {
      this.aplication.currentTemplate.subscribe(data => {
        this.apps = data;
        // console.log(this.templateData);
      });
      if (this.apps.length === 0) {
        for (const data of datas) {
          this.aplication.isiTemplate(data);
        }
        this.aplication.currentTemplate.subscribe(data => {
          this.apps = data;
        });
      }
      console.log(datas);

    });

  }

  updateVisibility(): void {
    this.visible = false;
    setTimeout(() => this.visible = true, 0);
    this.aplication.currentTemplate.subscribe(data => {
      this.templateData = data;
    });
  }

  aplicationDetail(appId: string) {
    this.router.navigateByUrl('acquisition/aplication/detail/' + appId);
  }


  // onSearchDedup() {
  //   if (!(this.aliasName.trim() === '' && this.identityNumber.trim() === '' && this.motherName.trim() === '')) {
  //     this.apps = this.apps.filter(app =>
  //       (this.aliasName.trim() !== '' && app.aliasName.toLowerCase().indexOf(this.aliasName.toLowerCase()) > -1) &&
  //       (this.identityNumber.trim() !== '' && app.identityNumber.toLowerCase().indexOf(this.identityNumber.toLowerCase()) > -1) &&
  //       (this.motherName.trim() !== '' && app.motherName.toLowerCase().indexOf(this.motherName.toLowerCase()) > -1));
  //   }
  // }
}
