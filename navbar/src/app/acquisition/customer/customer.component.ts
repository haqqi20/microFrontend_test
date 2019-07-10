import { Component, OnInit } from '@angular/core';
import {CstData} from '../../services/domain/cstData';
import {CstService} from '../../services/cstService';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {displayDialog: boolean;

    cst: {} = {};

    selectedCst: CstData;

    newCst: boolean;

    customer: CstData[];

    cols: any[];

    constructor(private cstService: CstService) { }

    ngOnInit() {
        this.cstService.getCstService().then(cars => this.customer = cars);

        this.cols = [
            { field: 'idCustomer', header: 'Customer Id' },
            { field: 'aliasname', header: 'Account Name' },
            { field: 'phone', header: 'Phone' },
            { field: 'email', header: 'Email' }
        ];
    }

    showDialogToAdd() {
        this.newCst = true;
        this.cst = {};
        this.displayDialog = true;
    }

    save() {
        const customer = [...this.customer];
        if (this.newCst)
            customer.push(<CstData>this.cst);
        else {
            customer[this.customer.indexOf(this.selectedCst)] = <CstData>this.cst;
        }

        this.customer = customer;
        this.cst = null;
        this.displayDialog = false;
    }

    delete() {
        const index = this.customer.indexOf(this.selectedCst);
        this.customer = this.customer.filter((val, i) => i != index);
        this.cst = null;
        this.displayDialog = false;
    }

    onRowSelect(event) {
        this.newCst = false;
        this.cst = this.cloneCar(event.data);
        this.displayDialog = true;
    }

    cloneCar(c: CstData): CstData {
        const car = {};
        for (const prop in c) {
            car[prop] = c[prop];
        }
        return <CstData>car;
    }

}
