import { Component, OnInit } from '@angular/core';
import { Fee } from 'src/app/models/acquisition/fee/fee';
import { FeeService } from 'src/app/services/acquisition/fee/fee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { Lookup } from 'src/app/models/global_set/lookup';
import { GlobalSettingService } from 'src/app/services/global_set/global-setting.service';
import { FeeProperty } from 'src/app/models/acquisition/fee/fee-property';
import { FeeParameter } from 'src/app/models/acquisition/fee/fee-parameter';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-fee-details',
  templateUrl: './fee-details.component.html',
  styleUrls: ['./fee-details.component.css'],
  providers: [ConfirmationService],
})
export class FeeDetailsComponent implements OnInit {

  rowsOptions = [];
  rows = 10;

  searchQuery = '';

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

  amountFixed: string;
  amountMinimum: string;

  feeId = this.actRoute.snapshot.params['feeId'];
  fee: Fee;

  cols: any[];
  tableProperties = [];

  show = false;
  disabled = true;

  constructor(
    private confirmationService: ConfirmationService,
    private feeService: FeeService,
    private globalService: GlobalSettingService,
    private router: Router,
    private actRoute: ActivatedRoute,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.createForm();
    this.feeService.refreshNeeded.subscribe(() => this.getFee());
    this.getFee();
    this.getFeeTypeList();
    this.getPaymentTermTypeList();
    this.getFeeParameterList();
    this.globalService.currentRows.subscribe(data => this.rows = data);
    this.globalService.currentRowsOptions.subscribe(data => this.rowsOptions = data);

    this.cols = [
      { header: 'Name', width: '20%' },
      { header: 'Charging Basis', width: '14%' },
      { header: 'Parameter Type', width: '23%' },
      { header: 'Amount', width: '12%' },
      { header: 'Minimum Amount', width: '12%' },
      { header: 'Active', width: '8%' },
    ];
  }

  getFee() {
    this.feeService.getFee(this.feeId).subscribe(data => {
      if (data !== undefined) {
        this.fee = data as Fee;
        this.updateForm(this.fee, this.disabled);
        this.tableProperties = this.fee.properties;
      }
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
    let feeProperty = new FeeProperty;

    let feeParameter: FeeParameter;
    let parameters: FeeParameter[];

    if (this.propForm.get('paymentTermType').value['lookupKey'] !== 'AF') {
      feeParameter = new FeeParameter;
      feeParameter.feeParameter = this.selectedFeeParameter['lookupKey'];
      feeParameter.amount = this.amountFixed;
      if (this.selectedFeeParameter['lookupKey'] !== 'Fixed') {
        feeParameter.minimum = this.amountMinimum;
      }
      parameters = [feeParameter];
    } else {
      parameters = new Array<FeeParameter>(this.selectedAmountOfYear);
      for (const year of this.arrayYear) {
        feeParameter = new FeeParameter;
        feeParameter.feeParameter = this.arrayParameter[year]['lookupKey'];
        feeParameter.yearNo = year + 1;
        feeParameter.amount = this.arrayAmount[year];
        if (this.arrayParameter[year]['lookupKey'] !== 'Fixed') {
          feeParameter.minimum = this.arrayMinimum[year];
        }
        parameters[year] = feeParameter;
      }
    }
    feeProperty.feeType = this.propForm.get('feeType').value['lookupKey'];
    feeProperty.paymentTermType = this.propForm.get('paymentTermType').value['lookupKey'];
    feeProperty.status = this.propForm.get('status').value;
    feeProperty.parameter = parameters;
    if (this.propForm.get('paymentTermType').value['lookupKey'] === 'AF') {
      feeProperty.amountOfYear = this.selectedAmountOfYear;
    }
    this.feeService.addFeeProperty(this.feeId, { properties: [feeProperty], updatedBy: 111 }).subscribe(
      data => {
        this.feeService.changeMessage('success', data['properties'][0]['response'])
        this.feeService.getFeeProperties(this.feeId).subscribe(data => {
          this.tableProperties = data['properties'];
        });
        this.discard();
      },
      err => {
        this.feeService.changeMessage('error', err.error.errorMessage);
      }
    );
  }

  createForm() {
    this.feeForm = this.fb.group({
      'feeName': new FormControl({ value: '', disabled: this.disabled }, Validators.required),
      'description': new FormControl({ value: '', disabled: this.disabled }, Validators.required),
      'status': new FormControl({ value: '', disabled: this.disabled }, Validators.required),
      'updatedBy': new FormControl(111),
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

  updateForm(fee: Fee, dis: boolean) {
    this.feeForm.reset({
      'feeName': { value: fee.feeName, disabled: dis },
      'description': { value: fee.description, disabled: dis },
      'status': { value: fee.status, disabled: dis },
      'updatedBy': 111,
    });
  }

  updateFee() {
    this.feeService.updateFee(this.feeId, this.feeForm.value).subscribe(
      data => {
        this.feeService.changeMessage('success', data['response'])
        this.getFee();
        this.discard();
        this.toggleDisabled();
        this.show = false;
      },
      err => {
        this.feeService.changeMessage('error', err.error.errorMessage);
      }
    );
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

  back() {
    this.router.navigateByUrl('acquisition/fee-management');
  }

  cancel() {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to cancel? Your data will be reset.',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.discard();
        this.toggleDisabled();
        this.show = false;
      },
      reject: () => {
        this.show = true;
      }
    });
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

  onItemClick(feePropId: string) {
    this.router.navigateByUrl('acquisition/fee-management/details/' + this.feeId + '/type/' + feePropId)
  }

  toggleDisabled() {
    this.disabled = !this.disabled;
    this.updateForm(this.fee, this.disabled);
  }

}
