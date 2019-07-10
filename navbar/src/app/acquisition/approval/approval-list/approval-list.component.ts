import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SelectItem } from 'primeng/api';
import { ApprovalService } from '@app/services/acquisition/approval/approval.service';

@Component({
  selector: 'app-approval-list',
  templateUrl: './approval-list.component.html',
  styleUrls: ['./approval-list.component.css']
})
export class ApprovalListComponent implements OnInit {

  apps = [];
  clonedApps = [];

  checkAllProduct = true;
  productNames = ['Special Kartini', 'Rumah Sejahtera', 'Sahabat Muda'];
  selectedProductName: string;
  filteredProductNames = [];

  surveyTypes = [
    { label: 'Reguler', value: 'Reguler' },
    { label: 'Telesurvey', value: 'Telesurvey' }
  ];
  selectedSurveyTypes: any[];

  surveyors = [
    { label: 'Sukma Indriyanti', value: 'Sukma Indriyanti' },
    { label: 'Dadang Faturahman', value: 'Dadang Faturahman' },
    { label: 'Rudi Pratomo', value: 'Rudi Pratomo' }
  ];
  selectedSurveyors: any[];

  pics = [
    { label: 'Kurnia Wijaya', value: 'Kurnia Wijaya' },
    { label: 'Robbi Anas', value: 'Robbi Anas' },
    { label: 'Fahmi Abdurohman', value: 'Fahmi Abdurohman' }
  ];
  selectedPics: any[];

  checkAllStatus = true;
  statuss = ['Approved', 'Rejected', 'On Progress'];
  selectedStatus: string;
  filteredStatuss = [];

  checkAllDate = true;
  dateTypes = [
    { label: 'Assign Date', value: 'assinDate' },
    { label: 'Survey Date', value: 'surveyDate' },
    { label: 'Application Date', value: 'applicationDate' }];
  selectedDateType: SelectItem;
  filteredDateTypes = [];

  selectedDate: Date;

  showSearch = false;

  constructor(
    private router: Router,
    private approvalService: ApprovalService
  ) { }

  ngOnInit() {
    this.approvalService.currentApps.subscribe((data: any[]) => {
      this.apps = data;
      this.clonedApps = data;
    });
  }

  onSurveyTypeSelected(event: string[]) {
    this.apps = this.clonedApps.filter(app => event.includes(app.surveyType));
  }

  onSurveyorSelected(event: string[]) {
    this.apps = this.clonedApps.filter(app => event.includes(app.surveyor));
  }

  onPicSelected(event: string[]) {
    this.apps = this.clonedApps.filter(app => event.includes(app.surveyPic));
  }

  approvalDetail(appId: string) {
    this.router.navigateByUrl('acquisition/approval/detail/' + appId);
  }

  clearFilters() {
    this.checkAllStatus = true;
    this.checkAllProduct = true;
    this.checkAllDate = true;
    this.selectedStatus = null;
    this.selectedProductName = null;
    this.selectedDateType = null;
    this.selectedDate = null;
    this.selectedSurveyTypes = [];
    this.selectedSurveyors = [];
    this.selectedPics = [];
    this.apps = this.clonedApps;
  }

  filterProductNames(event) {
    let query = event.query;
    this.filteredProductNames = this.filterAutoComplete(query, this.productNames);
  }

  filterStatuss(event) {
    let query = event.query;
    this.filteredStatuss = this.filterAutoComplete(query, this.statuss);
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
      if (typeof selectedData === 'object') {
        if (selectedData.label.toLowerCase().indexOf(query.toLowerCase()) > -1) {
          filtered.push(selectedData);
        }
      } else {
        if (selectedData.toLowerCase().indexOf(query.toLowerCase()) > -1) {
          filtered.push(selectedData);
        }
      }
    }
    return filtered;
  }

}
