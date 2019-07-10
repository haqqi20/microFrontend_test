import { Component, OnInit } from '@angular/core';
import { SurveyService } from '@app/services/surveyService';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Survey } from '@app/models/acquisition/survey/survey';

@Component({
  selector: 'app-survey-detail',
  templateUrl: './survey-detail.component.html',
  styleUrls: ['./survey-detail.component.css']
})
export class SurveyDetailComponent implements OnInit {

  show: boolean;
  disabled = true;
  
  Model = new Survey;
  uuid = this.actRoute.snapshot.params['uuid'];

  cols: any[];

  constructor(
    private location: Location,
    private surveyService: SurveyService,
    private actRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.surveyService.getSurvey().then(datas => {
      for (const data of datas) {
        if (data['identityNumber'] === this.uuid) {
          this.Model = data;
          console.log(this.Model);
          break;
        }
      }
    })

    this.cols = [
      { field: 'question', header: 'Questions' },
      { field: 'result', header: 'Results' }
    ]
  }

  toggleDisabled() {
    this.disabled = !this.disabled
  }

  back() {
    this.location.back();
  }

}
