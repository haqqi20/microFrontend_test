import { Component, OnInit } from '@angular/core';
import { Template } from '@app/models/acquisition/survey/template';
import { SurveyService } from '@app/services/surveyService';

@Component({
  selector: 'app-survey-template',
  templateUrl: './survey-template.component.html',
  styleUrls: ['./survey-template.component.css']
})
export class SurveyTemplateComponent implements OnInit {

  template: {} = {};
  templateData: Template[];
  checkAllTemplate = true;

  visible: boolean = true;

  productType = ['Kredit Sahabat Muda', 'Kredit Special Kartini'];
  filteredProduct = [];

  status = [
    {label: 'All', value: ''},
    {label: 'yes', value: true}, 
    {label: 'no', value: false}];

  cols: any[];

  constructor(
    private surveyService: SurveyService
  ) { }

  ngOnInit() {
    this.surveyService.getTemplate().then(datas => {
      this.surveyService.currentTemplate.subscribe(data => {
        this.templateData = data;
        console.log(this.templateData);
      });
      if (this.templateData.length === 0) {
        for (const data of datas) {
          this.surveyService.isiTemplate(data);
        };
        this.surveyService.currentTemplate.subscribe(data => {
          this.templateData = data;
        });
      };
      console.log(datas);

    });

    this.cols = [
      { field: 'templeteName', header: 'Template Name' },
      { field: 'productType', header: 'Product Type' },
      { field: 'isActive', header: 'Active' }
    ]
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

  updateVisibility(): void {
    this.visible = false;
    setTimeout(() => this.visible = true, 0);
    this.surveyService.currentTemplate.subscribe(data => {
      this.templateData = data;
    });
  }

}
