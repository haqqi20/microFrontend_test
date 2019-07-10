import { Component, OnInit } from '@angular/core';
import { SurveyService } from '@app/services/surveyService';
import { Survey } from '@app/models/acquisition/survey/survey';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mytask',
  templateUrl: './mytask.component.html',
  styleUrls: ['./mytask.component.css']
})
export class MytaskComponent implements OnInit {

  surveyData: Survey[];

  showSur = true;

  constructor(
    private surveyService: SurveyService,
    private router: Router
  ) { }

  ngOnInit() {
    this.surveyService.getSurvey().then(data => this.surveyData = data);
  }

  navigate(a: any){
    this.router.navigateByUrl(a);
  }

}
