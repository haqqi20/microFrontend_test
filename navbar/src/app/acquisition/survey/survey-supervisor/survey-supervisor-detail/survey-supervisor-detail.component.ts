import { Component, OnInit } from '@angular/core';
import { Supervisor } from '@app/models/acquisition/survey/supervisor';
import { SurveyService } from '@app/services/surveyService';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Surveyor } from '@app/models/acquisition/survey/surveyor';

@Component({
  selector: 'app-survey-supervisor-detail',
  templateUrl: './survey-supervisor-detail.component.html',
  styleUrls: ['./survey-supervisor-detail.component.css']
})
export class SurveySupervisorDetailComponent implements OnInit {

  show: boolean;
  disabled = true;
  surveyorData: Surveyor[];

  Model = new Supervisor;
  uuid = this.actRoute.snapshot.params['uuid'];

  constructor(
    private location: Location,
    private surveyService: SurveyService,
    private actRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.surveyorData = [];

    this.surveyService.currentSupervisor.subscribe(datas => {
      for (const data of datas) {
        if (data['npk'] === this.uuid) {
          this.Model = data;
          console.log(this.Model);
          break;
        }
      }
    });
  }

  toggleDisabled(){
    this.disabled = !this.disabled;
  }

  back(){
    this.location.back();
  }

}
