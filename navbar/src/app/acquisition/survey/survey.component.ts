import { Component, OnInit } from '@angular/core';
import { SurveyService } from '../../services/surveyService';
import { Survey } from '@app/models/acquisition/survey/survey';
import { SelectItem } from 'primeng/api';

@Component({
    selector: 'app-survey',
    templateUrl: './survey.component.html',
    styleUrls: ['./survey.component.css']
})
export class SurveyComponent implements OnInit {

    survey: {} = {};

    surveyData: Survey[];
    clonedData = [];

    cols: any[];

    checkAllStatus = true;
    checkAllProduct = true;
    checkAllDate = true;
    checkAllZipcode = true;

    statuss = ['Unassign', 'Assigned', 'Approved', 'Rejected'];
    selectedStatus: string;
    filteredStatuss = [];

    surveyTypes = [
        { label: 'Reguler', value: 'Reguler' },
        { label: 'Telesurvey', value: 'Telesurvey' }
    ];
    selectedSurveyTypes: any[];

    productNames = ['Special Kartini', 'Rumah Sejahtera', 'Sahabat Muda'];
    selectedProductName: string;
    filteredProductNames = [];

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

    dateTypes = [
        { label: 'Assign Date', value: 'assignDate' },
        { label: 'Survey Date', value: 'surveyDate' }];
    selectedDateType: SelectItem;
    filteredDateTypes = [];
    selectedDate = new Date;

    showSearch = false;

    constructor(private surveyService: SurveyService) { }

    ngOnInit() {
        this.surveyService.getSurvey().then(data => {
            this.surveyData = data;
            this.clonedData = data;
        });

        this.cols = [
            { field: 'Record', header: 'List of Survey' },
        ];
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
        this.surveyData = this.clonedData;
    }

    onSurveyTypeSelected(event: string[]) {
        this.surveyData = this.clonedData.filter(app => event.includes(app.surveyType));
    }

    onSurveyorSelected(event: string[]) {
        this.surveyData = this.clonedData.filter(app => event.includes(app.surveyor));
    }

    onPicSelected(event: string[]) {
        this.surveyData = this.clonedData.filter(app => event.includes(app.surveyPic));
    }

    filterStatuss(event) {
        let query = event.query;
        this.filteredStatuss = this.filterAutoComplete(query, this.statuss);
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
