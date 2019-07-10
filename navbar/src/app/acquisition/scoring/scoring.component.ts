import { Component, OnInit } from '@angular/core';
import { Scoring } from '@app/models/acquisition/scoring/Scoring';
import { ScoringService } from '@app/services/acquisition/scoring/scoring.service';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-scoring',
  templateUrl: './scoring.component.html',
  styleUrls: ['./scoring.component.css']
})
export class ScoringComponent implements OnInit {

  scoringData: Scoring[];
  clonedData: any[];

  checkAllOffice = true;
  checkAllStatus = true;
  checkAllProduct = true;
  checkAllDate = true;
  checkAllZipcode = true;
  checkAllAmount = true;

  office = ['PT Budi Jaya cab. Bekasi', 'PT Budi Jaya cab. Jakarta Selatan', 'CV Kurnia Sejahtera'];
  selectedOffice: string;
  filteredOffice = [];

  Status = [
    { label: 'Approved', value: 'Approved' },
    { label: 'Rejected', value: 'Rejected' },
    { label: 'Survey', value: 'Survey' }
  ];
  selectedStatus: any[];

  productNames = ['Special Kartini', 'Rumah Sejahtera', 'Sahabat Muda'];
  selectedProductName: string;
  filteredProductNames = [];

  dateTypes = [
    { label: 'Assign Date', value: 'assinDate' },
    { label: 'Survey Date', value: 'surveyDate' },
    { label: 'Application Date', value: 'applicationDate' }];
  selectedDateType: SelectItem;
  filteredDateTypes = [];

  constructor(
    private scoringService: ScoringService
  ) { }

  ngOnInit() {
    this.scoringService.getScoringList().then(data => { this.scoringData = data; this.clonedData = data; });
  }

  onStatusSelected(event: string[]) {
    this.scoringData = this.clonedData.filter(app => event.includes(app.scoringStatus));
  }

  filterOffice(event) {
    let query = event.query;
    this.filteredOffice = this.filterAutoComplete(query, this.office);
  }

  filterProductNames(event) {
    let query = event.query;
    this.filteredProductNames = this.filterAutoComplete(query, this.productNames);
  }

  filterDateTypes(event) {
    let query = event.query;
    this.filteredDateTypes = this.filterAutoComplete(query, this.dateTypes);
  }

  filterAutoComplete(query: string, arrayData: any[]): any[] {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtered: any[] = [];
    for (let i = 0; i < arrayData.length; i++) {
      let selectedData = arrayData[i];
      if (selectedData.toLowerCase().indexOf(query.toLowerCase()) > -1) {
        filtered.push(selectedData);
      }
    }
    return filtered;
  }

}
