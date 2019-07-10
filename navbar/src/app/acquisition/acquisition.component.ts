import { Component, OnInit } from '@angular/core';
import {DomData} from '../services/domain/domData';
import {AppService} from '../services/appService';

@Component({
  selector: 'app-acquisition',
  templateUrl: './acquisition.component.html',
  styleUrls: ['./acquisition.component.css']
})
export class AcquisitionComponent implements OnInit { displayDialog: boolean;

    dataentry: {} = <DomData>{};

    selectedData: DomData;

    newEntryData: boolean;

    data: DomData[];

    cols: any[];

    constructor(private appService: AppService) { }

    ngOnInit() {
        this.appService.getAppService().then(data => this.data = data);

        this.cols = [
            { field: 'dataEntry', header: 'Aplication Id' },
            { field: 'custType', header: 'Customer Type' },
            { field: 'businessType', header: 'Business Type' },
            { field: 'orderType', header: 'Order Type' }
        ];
    }

    showDialogToAdd() {
        this.newEntryData = true;
        this.dataentry = {};
        this.displayDialog = true;
    }

    save() {
        const data = [...this.data];
        if (this.newEntryData)
            data.push(<DomData>this.dataentry);
        else {
            data[this.data.indexOf(this.selectedData)] = <DomData>this.dataentry;
        }

        this.data = data;
        this.dataentry = null;
        this.displayDialog = false;
    }

    delete() {
        const index = this.data.indexOf(this.selectedData);
        this.data = this.data.filter((val, i) => i != index);
        this.dataentry = null;
        this.displayDialog = false;
    }

    onRowSelect(event) {
        this.newEntryData = false;
        this.dataentry = this.cloneCar(event.data);
        this.displayDialog = true;
    }

    cloneCar(c: DomData): DomData {
        const dataentry = {};
        for (const prop in c) {
            dataentry[prop] = c[prop];
        }
        return <DomData>dataentry;
    }
}
