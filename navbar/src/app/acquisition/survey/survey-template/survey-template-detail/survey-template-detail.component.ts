import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Template } from '@app/models/acquisition/survey/template';
import { SurveyService } from '@app/services/surveyService';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-survey-template-detail',
  templateUrl: './survey-template-detail.component.html',
  styleUrls: ['./survey-template-detail.component.css']
})
export class SurveyTemplateDetailComponent implements OnInit {

  show: boolean;
  disabled = true;
  uuid = this.actRoute.snapshot.params['uuid'];

  Model = new Template;

  cols: any[];

  constructor(
    private location: Location,
    private surveyService: SurveyService,
    private actRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.surveyService.currentTemplate.subscribe(datas => {
      for (const data of datas) {
        if (data['templateId'] === this.uuid) {
          this.Model = data;
          console.log(this.Model);
          break;
        }
      }
    });

    this.cols = [
      { field: 'question', header: 'Question' },
      { field: 'dataType', header: 'Data Type' },
      { field: 'isMandatory', header: 'Mandatory' },
      { field: 'priority', header: 'Priority' }
    ]
  }

  toggleDisabled() {
    this.disabled = !this.disabled
  }

  back() {
    this.location.back();
  }

  delete(i: number) {
    this.Model.surveyQuestion.splice(i, 1);
  }

}
