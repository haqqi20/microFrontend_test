import { Component, OnInit } from '@angular/core';
import { ConfirmationService, Message, MessageService } from 'primeng/components/common/api';
import { Location } from '@angular/common';
import { Supervisor } from '@app/models/acquisition/survey/supervisor';
import { SurveyService } from '@app/services/surveyService';
import { Surveyor } from '@app/models/acquisition/survey/surveyor';

@Component({
  selector: 'app-survey-supervisor-create',
  templateUrl: './survey-supervisor-create.component.html',
  styleUrls: ['./survey-supervisor-create.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class SurveySupervisorCreateComponent implements OnInit {
  router: any;
  msgs: Message[] = [];

  surveyorData: Surveyor[];

  filteredEmployee: any[];

  Model = new Supervisor;

  productType = ['Kredit Mobil Baru'];
  filteredProduct = [];

  constructor(
    private location: Location,
    private surveyService: SurveyService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit() {
    this.surveyService.getSurveyor().then(datas => {
      this.surveyService.currentSurveyor.subscribe(data => {
        this.surveyorData = data;
        console.log(this.surveyorData);
      });
      if (this.surveyorData.length === 0) {
        for (const data of datas) {
          this.surveyService.isiSurveyor(data);
        };
        this.surveyService.currentSurveyor.subscribe(data => {
          this.surveyorData = data;
        });
      };
    });

    this.Model.assignedSurveyor = [];
  }

  filterEmployee(event) {
    let query = event.query;
    this.surveyService.getEmployee().then(data => {
      this.filteredEmployee = this.filterEmployees(query, data);
    });
  }

  filterProductType(event) {
    let query = event.query;
    this.filteredProduct = this.filterAutoComplete(query, this.productType);
  }

  filterAutoComplete(query: string, arrayData: any[]): any[] {
    let filtered: any[] = [];
    for (let i = 0; i < arrayData.length; i++) {
      let selectedData = arrayData[i];
      if (selectedData.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(selectedData);
      }
    }
    return filtered;
  }

  filterEmployees(query, countries: any[]): any[] {
    let filtered: any[] = [];
    for (let i = 0; i < countries.length; i++) {
      let country = countries[i];
      if (country.fullName.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(country);
      }
    }
    return filtered;
  }

  getData(a: any) {
    this.Model = a;
    this.Model.assignedSurveyor = [];
  }

  addSupervisor(payload: any, sudah?: boolean) {
    this.surveyService.isiSupervisor(payload);
    this.Model = new Supervisor;
    if(sudah){
      this.router.navigateByUrl('acquisition/survey/supervisor');
    }
  }

  check(a: any) {
    console.log(a);
  }

  confirm() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to cancel?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.location.back();
      },
      reject: () => {
        this.msgs = [{ severity: 'info', summary: 'Rejected', detail: 'You have rejected' }];
      }
    });
  }

}
