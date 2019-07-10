import { Component, OnInit } from '@angular/core';
import {Office} from '../../models/global_set/office/office';
import {OfficeList} from '../../models/global_set/office/officelist';
import {OfficeService} from '../../services/global_set/office/office.service';
import {AddOfficeComponent} from '../../global_set/office/add-office/add-office.component';
import {MenuItem, SelectItem} from 'primeng/api';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-office',
  templateUrl: './office.component.html',
  styleUrls: ['./office.component.css']
})
export class OfficeComponent implements OnInit {

    officeList: OfficeList = new OfficeList;

    offices: Office[] = [];

    cols: any[];

    officeHead: SelectItem[];
    items: MenuItem[];
    home: MenuItem;
    messages: Message[] = [];
    //
    // colors: SelectItem[];
    // years: SelectItem[];

    // yearFilter: number;
    //
    // yearTimeout: any;

    constructor(private officeService: OfficeService) { }

    ngOnInit() {
        // this.officeService.getofficelist().then(officeList => this.officeList = officeList);

        this.officeService.getOfficeList(this.officeList).subscribe((data) => {
            this.offices = data['office'];
        });

        this.items = [
            {label: 'Global Setting'},
            {label: 'Office List'},
        ];

        this.home = {icon: 'pi pi-home'};
        this.officeHead = [
            { label: 'All Office', value: null },
            { label: 'HQ Office', value: 'HQ Office' },
            { label: 'Branch', value: 'Branch' },
            { label: 'Factory', value: 'Factory' },
            { label: 'Director', value: 'Director' },
            { label: 'Booth', value: 'Booth' },
        ];
        // this.colors = [
        //     { label: 'White', value: 'White' },
        //     { label: 'Green', value: 'Green' },
        //     { label: 'Silver', value: 'Silver' },
        //     { label: 'Black', value: 'Black' },
        //     { label: 'Red', value: 'Red' },
        //     { label: 'Maroon', value: 'Maroon' },
        //     { label: 'Brown', value: 'Brown' },
        //     { label: 'Orange', value: 'Orange' },
        //     { label: 'Blue', value: 'Blue' }
        // ];
        // this.years = [
        //     { label: '1998', value: '1998' },
        //     { label: '1979', value: '1979' },
        // ];

        this.cols = [
            // {field: 'no', header:'No'},
            { field: 'name', header: 'Office Name' },
            { field: 'officeHeadId', header: 'Parent' },
            { field: 'officeType', header: 'Office Type' },
            { field: 'address', header: 'Address' },
            { field: 'city', header: 'City' }
        ];
    }

    // onYearChange(event, dt) {
    //     if (this.yearTimeout) {
    //         clearTimeout(this.yearTimeout);
    //     }
    //
    //     this.yearTimeout = setTimeout(() => {
    //         dt.filter(event.value, 'year', 'gt');
    //     }, 250);
    // }
}
export class OfficeComponen implements OnInit {
    ngOnInit(): void {
    }
}
