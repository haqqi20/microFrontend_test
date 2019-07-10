import { Component, OnInit } from '@angular/core';
import { ConfirmationService, Message } from 'primeng/components/common/api';
import { Location } from '@angular/common';
import { MessagesModule } from 'primeng/primeng';
import { Surveyor } from '@app/models/acquisition/survey/surveyor';
import { ZipCodeService } from '@app/services/global_set/zipcode/zip-code.service';
import { SurveyorPlace } from '@app/models/acquisition/survey/surveyor-place';
import { SurveyService } from '@app/services/surveyService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-survey-surveyor-create',
  templateUrl: './survey-surveyor-create.component.html',
  styleUrls: ['./survey-surveyor-create.component.css'],
  providers: [MessagesModule, ConfirmationService]
})
export class SurveySurveyorCreateComponent implements OnInit {

  cols: any[];
  msgs: Message[] = [];

  empl: any;
  Model = new Surveyor;
  surveyorPlace = new SurveyorPlace;

  selectedZipcode: any;
  filteredLocations: any[];

  filteredEmployee: any[];

  productType = ['Kredit Mobil Baru'];
  filteredProduct = [];

  constructor(
    private location: Location,
    private confirmationService: ConfirmationService,
    private surveyService: SurveyService,
    private router: Router,
    private zipcodeService: ZipCodeService
  ) { }

  ngOnInit() {
    this.Model.location = [];
    this.cols = [
      { field: 'zipCode', header: 'Zipcode' },
      { field: 'vilage', header: 'Village' },
      { field: 'district', header: 'District' },
      { field: 'city', header: 'City' },
      { field: 'province', header: 'Province' }
    ]
  }

  filterLocations(event) {
    let query = event.query;
    this.zipcodeService.getLocation(query).subscribe(data => {
      this.filteredLocations = this.filterLocation(query, data['zipcode']);
    });
  }

  filterEmployee(event) {
    let query = event.query;
    this.surveyService.getEmployee().then(data => {
      this.filteredEmployee = this.filterEmployees(query, data);
    });
  }

  filterProductType(event) {
    let query = event.query;
    this.filteredProduct = this.filterAutoComplete(query, this.productType);
  }

  filterLocation(query: string, locations: any[]): any[] {
    let filtered: any[] = [];
    for (let i = 0; i < locations.length; i++) {
      let location = locations[i];
      if (location.location.toLowerCase().indexOf(query.toLocaleLowerCase()) > -1) {
        filtered.push(location);
      }
    }
    return filtered;
  }

  filterEmployees(query, countries: any[]): any[] {
    let filtered: any[] = [];
    for (let i = 0; i < countries.length; i++) {
      let country = countries[i];
      if (country.fullName.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(country);
      }
    }
    return filtered;
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

  getData(a: any) {
    this.Model = a;
    this.Model.location = [];
  }

  addSurveyor(payload: any, sudah?: boolean) {
    this.surveyService.isiSurveyor(payload);
    this.Model = new Surveyor;
    if (sudah) {
      this.router.navigateByUrl('acquisition/survey/surveyor');
    }
  }

  onSelectLocation() {
    let loc: string = this.selectedZipcode.location;
    let sLoc = loc.split(' , ');
    this.surveyorPlace.vilage = sLoc[0];
    this.surveyorPlace.district = sLoc[1];
    this.surveyorPlace.city = sLoc[2];
    this.surveyorPlace.province = sLoc[3];
    this.surveyorPlace.zipCode = sLoc[4];
    console.log(this.surveyorPlace);
  }

  addLocation() {
    this.Model.location.push(this.surveyorPlace);
    this.surveyorPlace = new SurveyorPlace;
    this.selectedZipcode = '';
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

  delete(i: number) {
    this.Model.location.splice(i, 1);
  }
}
