import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Setting } from '@app/models/acquisition/survey/setting';
import { SurveyService } from '@app/services/surveyService';

@Component({
  selector: 'app-survey-setting',
  templateUrl: './survey-setting.component.html',
  styleUrls: ['./survey-setting.component.css']
})
export class SurveySettingComponent implements OnInit {

  show: boolean;
  disabled = true;

  Model = new Setting;

  constructor(
    private location: Location,
    private surveyService: SurveyService
  ) { }

  ngOnInit() {
    this.surveyService.getSetting().then(data => {
          this.Model = data[0];
    })
  }

  toggleDisabled() {
    this.disabled = !this.disabled;
  }
  
  back(){
    this.location.back();
  }

}
