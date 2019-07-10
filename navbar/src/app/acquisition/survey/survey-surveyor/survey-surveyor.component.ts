import { Component, OnInit } from '@angular/core';
import { SurveyService } from '@app/services/surveyService';
import { Surveyor } from '@app/models/acquisition/survey/surveyor';

@Component({
  selector: 'app-survey-surveyor',
  templateUrl: './survey-surveyor.component.html',
  styleUrls: ['./survey-surveyor.component.css']
})
export class SurveySurveyorComponent implements OnInit {

  surveyor: {} = {};
  surveyorData: Surveyor[];

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

    this.cols = [
      { field: 'record', header: 'List of Surveyor' }
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
    this.surveyService.currentSurveyor.subscribe(data => {
      this.surveyorData = data;
    });
  }
}
