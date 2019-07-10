import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService, Message } from 'primeng/components/common/api';
import { Location } from '@angular/common';
import { Template } from '@app/models/acquisition/survey/template';
import { Question } from '@app/models/acquisition/survey/template-question';
import { SurveyService } from '@app/services/surveyService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-survey-template-create',
  templateUrl: './survey-template-create.component.html',
  styleUrls: ['./survey-template-create.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class SurveyTemplateCreateComponent implements OnInit {

  cols: any[];
  msgs: Message[] = [];

  Model = new Template;
  question = new Question;

  surveyType = ['Regular Survey', 'TeleSurvey'];
  filteredSurvey = [];

  productType = ['Kredit Sahabat Muda', 'Kredit Spesial Kartini', 'Kredit Maju Bersama'];
  filteredProduct = [];

  dataType = ['Character', 'Number', 'Boolean'];
  filteredData = [];

  constructor(
    private location: Location,
    private surveyService: SurveyService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.Model.surveyQuestion = [];
    this.Model.templateId = Math.floor(1000000000 + Math.random() * 9000000000).toString();

    this.cols = [
      { field: 'question', header: 'Question' },
      { field: 'dataType', header: 'Data Type' },
      { field: 'isMandatory', header: 'Mandatory' },
      { field: 'priority', header: 'Priority' }
    ]
  }

  filterSurveyType(event) {
    let query = event.query;
    this.filteredSurvey = this.filterAutoComplete(query, this.surveyType);
  }

  filterProductType(event) {
    let query = event.query;
    this.filteredProduct = this.filterAutoComplete(query, this.productType);
  }

  filterDataType(event) {
    let query = event.query;
    this.filteredData = this.filterAutoComplete(query, this.dataType);
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

  addTemplate(payload: any, sudah?: boolean) {
    this.surveyService.isiTemplate(payload);
    this.Model = new Template;
    this.Model.templateId = Math.floor(1000000000 + Math.random() * 9000000000).toString();
    if(sudah){
      this.router.navigateByUrl('acquisition/survey/template');
    }
  }

  addQuestion() {
    this.Model.surveyQuestion.push(this.question);
    this.question = new Question;
  }

  reset() {
    this.question = new Question;
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

  check(a: any) {
    console.log(a);
  }

  delete(i: number) {
    this.Model.surveyQuestion.splice(i, 1);
  }

}
