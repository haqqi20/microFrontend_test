import { Component, OnInit } from '@angular/core';
import { Supervisor } from '@app/models/acquisition/survey/supervisor';
import { SurveyService } from '@app/services/surveyService';

@Component({
  selector: 'app-survey-supervisor',
  templateUrl: './survey-supervisor.component.html',
  styleUrls: ['./survey-supervisor.component.css']
})
export class SurveySupervisorComponent implements OnInit {

  supervisor: {} = {};
  supervisorData: Supervisor[];

  visible: boolean = true;
  cols: any[];

  checkAllOffice = true;

  office = ['PT Budi Jaya cab. Bekasi', 'PT Budi Jaya cab. Jakarta Selatan', 'CV Kurnia Sejahtera'];
  selectedOffice: string;
  filteredOffice = [];

  constructor(
    private surveyService: SurveyService
  ) { }

  ngOnInit() {
    this.surveyService.getSupervisor().then(datas => {
      this.surveyService.currentSupervisor.subscribe(data => {
        this.supervisorData = data;
        console.log(this.supervisorData);
      });
      if (this.supervisorData.length === 0) {
        for (const data of datas) {
          this.surveyService.isiSupervisor(data);
        };
        this.surveyService.currentSupervisor.subscribe(data => {
          this.supervisorData = data;
        });
      };
    });

    this.cols = [
      { field: 'record', header: 'List of Supervisor' }
    ]
  }

  filterOffice(event) {
    let query = event.query;
    this.filteredOffice = this.filterAutoComplete(query, this.office);
  }

  filterAutoComplete(query: string, arrayData: any[]): any[] {
    let filtered: any[] = [];
    for (let i = 0; i < arrayData.length; i++) {
      let selectedData = arrayData[i];
      if (selectedData.toLowerCase().indexOf(query.toLowerCase()) > -1) {
        filtered.push(selectedData);
      }
    }
    return filtered;
  }

  updateVisibility(): void {
    this.visible = false;
    setTimeout(() => this.visible = true, 0);
    this.surveyService.currentSupervisor.subscribe(data => {
      this.supervisorData = data;
    });
  }

}
