import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/components/common/api';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalSettingService } from 'src/app/services/global_set/global-setting.service';
import { Lookup } from 'src/app/models/global_set/lookup';
import { FeeProperty } from 'src/app/models/acquisition/fee/fee-property';
import { FeeParameter } from 'src/app/models/acquisition/fee/fee-parameter';
import { FeeService } from 'src/app/services/acquisition/fee/fee.service';

@Component({
    selector: 'app-fee-add',
    templateUrl: './fee-add.component.html',
    styleUrls: ['./fee-add.component.css'],
    providers: [ConfirmationService],
})
export class FeeAddComponent implements OnInit {

    searchQuery = '';
    cols: any[];

    rowsOptions = [];
    rows = 10;

    feeForm: FormGroup;
    propForm: FormGroup;

    selectedFeeType = new Lookup;
    selectedPaymentTerm = new Lookup;
    selectedFeeParameter = new Lookup;
    selectedAmountOfYear: number = null;

    arrayParameter = new Array<Lookup>(20);
    arrayAmount = new Array(20);
    arrayMinimum = new Array(20);

    feeTypes: Lookup[];
    paymentTerms: Lookup[];
    feeParameters: Lookup[];
    amountOfYears = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]

    filteredFeeTypes = [];
    filteredPaymentTerms = [];
    filteredFeeParameters = [];
    filteredAmountOfYears = [];

    arrayYear = [];
    // format crrecy
    amountOpt = {
        prefix: '',
        thousands: '.',
        decimal: ',',
        allowNegative: false,
        nullable: true
    };

    amountPercent = {
        prefix: '',
        suffix: '%',
        thousands: '.',
        decimal: ',',
        allowNegative: false,
        nullable: true
    };

    feeId: string;

    amountFixed: string;
    amountMinimum: string;

    feeProperties = [];
    tableProperties = [];

    constructor(
        private fb: FormBuilder,
        private confirmationService: ConfirmationService,
        private router: Router,
        private globalService: GlobalSettingService,
        private feeService: FeeService
    ) {
        this.createForm();
    }

    ngOnInit() {
        this.getFeeTypeList();
        this.getPaymentTermTypeList();
        this.getFeeParameterList();
        this.globalService.currentRows.subscribe(data => this.rows = data);
        this.globalService.currentRowsOptions.subscribe(data => this.rowsOptions = data);

        this.cols = [
            { field: 'feeType', header: 'Name', width: '18%' },
            { field: 'paymentTermType', header: 'Charging Basis', width: '15%' },
            { field: 'parameter', header: 'Parameter Type', width: '22%' },
            { field: 'amountOfYear', header: 'Year(s)', width: '10%' },
            { header: 'Amount', width: '14%' },
            { field: 'status', header: 'Active', width: '9%' },
        ];
    }

    createForm() {
        this.feeForm = this.fb.group({
            'feeName': new FormControl('', Validators.required),
            'description': new FormControl('', Validators.required),
            'status': new FormControl(true, Validators.required),
            'properties': new FormControl(null),
            'updatedBy': new FormControl(111)
        });
        this.propForm = this.fb.group({
            'feeType': new FormControl('', Validators.required),
            'paymentTermType': new FormControl('', Validators.required),
            'amountOfYear': new FormControl(''),
            'status': new FormControl(true, Validators.required),
            'parameter': new FormControl(null),
            'updatedBy': new FormControl(111)
        });
    }

    addFee(andNew?: boolean) {
        this.feeForm.get('properties').setValue(this.feeProperties);
        this.feeService.addFee(this.feeForm.value).subscribe(
            data => {
                this.feeId = data['feeId'];
                this.feeService.changeMessage('success', data['response']);
                if (andNew) {
                    this.resetFee();
                } else {
                    this.router.navigateByUrl('acquisition/fee');
                }
            },
            err => {
                this.feeService.changeMessage('error', err.error.errorMessage);
            });
    }

    isPropertyValid() {
        let isValid = false;
        if (this.propForm.get('paymentTermType').valid
            && this.propForm.get('feeType').valid
            && this.propForm.get('status').valid
        ) {
            if (this.propForm.get('paymentTermType').value['lookupKey'] !== 'AF') {
                if (this.selectedFeeParameter !== null && this.amountFixed !== null) {
                    if (this.selectedFeeParameter['lookupKey'] !== 'Fixed') {
                        if (this.amountMinimum !== null) {
                            isValid = true;
                        }
                    } else {
                        isValid = true;
                    }
                }
            } else {
                if (this.selectedAmountOfYear > 0) {
                    for (let index = 0; index < this.selectedAmountOfYear; index++) {
                        if (this.arrayParameter[index] === null || this.arrayAmount[index] === null) {
                            isValid = false;
                            break;
                        } else {
                            if (this.arrayParameter[index]['lookupKey'] !== 'Fixed') {
                                if (this.arrayMinimum[index] === null) {
                                    isValid = false;
                                    break;
                                } else {
                                    isValid = true;
                                }
                            } else {
                                isValid = true;
                            }
                        }
                    }
                }
            }
        } else {
            isValid = false;
        }
        return isValid;
    }

    addProperty() {
        let add = true;
        let feeProperty = new FeeProperty;

        let feeParameter: FeeParameter;
        let parameters: FeeParameter[];

        let tableParameter: {};
        let tableParameters: any[];

        if (this.tableProperties.length !== 0) {
            for (const prop of this.tableProperties) {
                if (prop.feeType === this.propForm.get('feeType').value['lookupValue']) {
                    add = false;
                    break;
                }
            }
        }
        if (!add) {
            this.feeService.changeMessage('error', 'Type name was exist');
        } else {
            if (this.propForm.get('paymentTermType').value['lookupKey'] !== 'AF') {
                feeParameter = new FeeParameter;
                feeParameter.feeParameter = this.selectedFeeParameter['lookupKey'];
                feeParameter.amount = this.amountFixed;
                if (this.selectedFeeParameter['lookupKey'] !== 'Fixed') {
                    feeParameter.minimum = this.amountMinimum;
                }
                parameters = [feeParameter];

                tableParameter = {
                    feeParameter: this.selectedFeeParameter['lookupValue'],
                    amount: this.selectedFeeParameter['lookupKey'] !== 'Fixed' ? this.amountFixed + '%' : this.amountFixed,
                    minimum: this.amountMinimum
                }

                tableParameters = [tableParameter];
            } else {
                parameters = new Array<FeeParameter>(this.selectedAmountOfYear);
                tableParameters = new Array<FeeParameter>(this.selectedAmountOfYear);
                for (const year of this.arrayYear) {
                    feeParameter = new FeeParameter;
                    feeParameter.feeParameter = this.arrayParameter[year]['lookupKey'];
                    feeParameter.yearNo = year + 1;
                    feeParameter.amount = this.arrayAmount[year];
                    if (this.arrayParameter[year]['lookupKey'] !== 'Fixed') {
                        feeParameter.minimum = this.arrayMinimum[year];
                    }
                    parameters[year] = feeParameter;

                    tableParameter = {
                        feeParameter: this.arrayParameter[year]['lookupValue'],
                        yearNo: year + 1,
                        amount: this.arrayParameter[year]['lookupKey'] !== 'Fixed' ? this.arrayAmount[year] + '%' : this.arrayAmount[year],
                        minimum: this.arrayMinimum[year]
                    }

                    tableParameters[year] = tableParameter;
                }
            }
            feeProperty.feePropertyId = this.feeProperties.length + ''
            feeProperty.feeType = this.propForm.get('feeType').value['lookupKey'];
            feeProperty.paymentTermType = this.propForm.get('paymentTermType').value['lookupKey'];
            feeProperty.status = this.propForm.get('status').value;
            feeProperty.parameter = parameters;
            if (this.propForm.get('paymentTermType').value['lookupKey'] === 'AF') {
                feeProperty.amountOfYear = this.selectedAmountOfYear;
            }
            this.feeProperties.push(feeProperty);

            this.tableProperties.push({
                feePropertyId: this.tableProperties.length + '',
                feeType: this.propForm.get('feeType').value['lookupValue'],
                paymentTermType: this.propForm.get('paymentTermType').value['lookupValue'],
                amountOfYear: this.selectedAmountOfYear,
                status: this.propForm.get('status').value,
                parameter: tableParameters,
            });
            this.discard();
        }
    }

    deleteProperty(id: string) {
        this.tableProperties = this.tableProperties.filter(prop => prop.feePropertyId !== id);
        this.feeProperties = this.feeProperties.filter(prop => prop.feePropertyId !== id);
    }

    onPaymentTermSelect() {
        this.selectedAmountOfYear = null;
        this.onAmountOfYearSelect();
    }

    onAmountOfYearSelect() {
        this.arrayYear = [];
        this.arrayParameter = new Array<Lookup>(20);
        for (let index = 0; index < this.selectedAmountOfYear; index++) {
            this.arrayYear.push(index);
            this.arrayParameter[index] = { lookupKey: '', lookupValue: '' };
        }
        this.selectedFeeParameter = new Lookup;

        this.arrayAmount = new Array(20);
        this.arrayMinimum = new Array(20);

        this.amountFixed = null;
        this.amountMinimum = null;
    }

    onParameterSelect(index?: number) {
        if (index >= 0) {
            this.arrayAmount[index] = null;
            this.arrayMinimum[index] = null;
        } else {
            this.amountFixed = null;
            this.amountMinimum = null;
        }
    }

    getFeeTypeList() {
        return new Promise(res => {
            this.globalService.getLookup('fee.type').subscribe((data: []) => {
                this.feeTypes = data;
                res(this.feeTypes);
            });
        });
    }

    getPaymentTermTypeList() {
        return new Promise(res => {
            this.globalService.getLookup('payment.term.type').subscribe((data: []) => {
                this.paymentTerms = data;
                res(this.paymentTerms);
            });
        });
    }

    getFeeParameterList() {
        return new Promise(res => {
            this.globalService.getLookup('fee.parameter').subscribe((data: []) => {
                this.feeParameters = data;
                res(this.feeParameters);
            });
        });
    }

    filterFeeTypes(event) {
        let query = event.query;
        this.filteredFeeTypes = this.filterFeeType(query, this.feeTypes);
    }

    filterFeeType(query: string, feeTypes: any[]): any[] {
        //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
        let filtered: any[] = [];
        for (let i = 0; i < feeTypes.length; i++) {
            let selectedFeeType = feeTypes[i];
            if (selectedFeeType.lookupValue.toLowerCase().indexOf(query.toLowerCase()) > -1) {
                filtered.push(selectedFeeType);
            }
        }
        return filtered;
    }

    filterPaymentTermTypes(event) {
        let query = event.query;
        this.filteredPaymentTerms = this.filterPaymentTermType(query, this.paymentTerms);
    }

    filterPaymentTermType(query: string, paymentTerms: any[]): any[] {
        //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
        let filtered: any[] = [];
        for (let i = 0; i < paymentTerms.length; i++) {
            let selectedPaymentTerm = paymentTerms[i];
            if (selectedPaymentTerm.lookupValue.toLowerCase().indexOf(query.toLowerCase()) > -1) {
                filtered.push(selectedPaymentTerm);
            }
        }
        return filtered;
    }

    filterFeeParameters(event) {
        let query = event.query;
        this.filteredFeeParameters = this.filterFeeParameter(query, this.feeParameters);
    }

    filterFeeParameter(query: string, feeParameters: any[]): any[] {
        //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
        let filtered: any[] = [];
        for (let i = 0; i < feeParameters.length; i++) {
            let selectedFeeParameter = feeParameters[i];
            if (selectedFeeParameter.lookupValue.toLowerCase().indexOf(query.toLowerCase()) > -1) {
                filtered.push(selectedFeeParameter);
            }
        }
        return filtered;
    }

    filterAmountOfYears(event) {
        let query = event.query;
        this.filteredAmountOfYears = this.filterAmountOfYear(query, this.amountOfYears);
    }

    filterAmountOfYear(query: string, amountOfYears: any[]): any[] {
        //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
        let filtered: any[] = [];
        for (let i = 0; i < amountOfYears.length; i++) {
            let selectedAmountOfYear = amountOfYears[i] + '';
            if (selectedAmountOfYear.indexOf(query.toLowerCase()) > -1) {
                filtered.push(selectedAmountOfYear);
            }
        }
        return filtered;
    }

    resetFee() {
        this.feeForm.reset({
            'feeName': '',
            'description': '',
            'status': true,
            'updatedBy': 111
        });
        this.discard();
        this.feeProperties = [];
        this.tableProperties = [];
    }

    discard() {
        this.propForm.reset({
            'feeType': '',
            'paymentTermType': '',
            'amountOfYear': '',
            'status': true,
            'updatedBy': 111
        });

        this.selectedAmountOfYear = null;
        this.selectedFeeParameter = new Lookup;

        this.arrayParameter = new Array<Lookup>(20);
        this.arrayAmount = new Array(20);
        this.arrayMinimum = new Array(20);

        this.amountFixed = null;
        this.amountMinimum = null;
    }

    cancelSave() {
        this.confirmationService.confirm({
            message: 'Are you sure that you want to cancel? Your data will be reset.',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.router.navigateByUrl('acquisition/fee-management');
            },
            reject: () => {
                console.log('canceled');
            }
        });
    }

}
