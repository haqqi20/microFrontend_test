import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Surveyor } from '@app/models/acquisition/survey/surveyor';
import { SurveyService } from '@app/services/surveyService';
import { ActivatedRoute } from '@angular/router';
import { ZipCodeService } from '@app/services/global_set/zipcode/zip-code.service';
import { SurveyorPlace } from '@app/models/acquisition/survey/surveyor-place';

@Component({
  selector: 'app-survey-surveyor-detail',
  templateUrl: './survey-surveyor-detail.component.html',
  styleUrls: ['./survey-surveyor-detail.component.css']
})
export class SurveySurveyorDetailComponent implements OnInit {

  show: boolean;
  disabled = true;

  Model = new Surveyor;
  uuid = this.actRoute.snapshot.params['uuid'];
  surveyorPlace = new SurveyorPlace;

  selectedZipcode: any;
  filteredLocations: any[];
  cols: any[];

  constructor(
    private location: Location,
    private surveyService: SurveyService,
    private actRoute: ActivatedRoute,
    private zipcodeService: ZipCodeService
  ) { }

  ngOnInit() {
    this.surveyService.currentSurveyor.subscribe(datas => {
      for (const data of datas) {
        if (data['npk'] === this.uuid) {
          this.Model = data;
          console.log(this.Model);
          break;
        }
      }
    });

    this.cols = [
      { field: 'zipcode', header: 'Zipcode' },
      { field: 'village', header: 'Village' },
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

  toggleDisabled() {
    this.disabled = !this.disabled;
  }

  back() {
    this.location.back();
  }

  delete(i: number) {
    this.Model.location.splice(i, 1);
  }

}
