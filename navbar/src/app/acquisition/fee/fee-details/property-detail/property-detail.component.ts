import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import { Lookup } from 'src/app/models/global_set/lookup';
import { Fee } from 'src/app/models/acquisition/fee/fee';
import { FeeService } from 'src/app/services/acquisition/fee/fee.service';
import { GlobalSettingService } from 'src/app/services/global_set/global-setting.service';
import { ActivatedRoute } from '@angular/router';
import { FeeProperty } from 'src/app/models/acquisition/fee/fee-property';
import { FeeParameter } from 'src/app/models/acquisition/fee/fee-parameter';
import { Location } from '@angular/common';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.css'],
  providers: [ConfirmationService]
})
export class PropertyDetailComponent implements OnInit {

  propForm: FormGroup;
  parameter: FormArray;

  selectedFeeType = new Lookup;
  selectedPaymentTerm = new Lookup;
  selectedFeeParameter = new Lookup;
  selectedAmountOfYear: number = null;

  arrayParameter = new Array<Lookup>(20).fill(new Lookup);
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
  // format currency
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

  feeId = this.actRoute.parent.snapshot.params['feeId'];
  feePropId = this.actRoute.snapshot.params['feePropId'];
  fee: Fee;
  feeProperty: FeeProperty;

  show = false;
  disabled = true;

  dataAvailable = false;

  constructor(
    private confirmationService: ConfirmationService,
    private feeService: FeeService,
    private globalService: GlobalSettingService,
    private actRoute: ActivatedRoute,
    private fb: FormBuilder,
    private location: Location
  ) { }

  ngOnInit() {
    this.createForm();
    this.getFee();
  }

  async loadFeeProperty(fee: Fee) {
    await new Promise(res => {
      for (const prop of fee.properties) {
        if (prop.feePropertyId === this.feePropId) {
          this.feeProperty = prop;
          res(this.feeProperty);
          break;
        }
      }
    });
    await this.getFeeTypeList();
    await this.getPaymentTermTypeList();
    await this.getFeeParameterList();
    if (this.feeProperty.parameter !== undefined) {
      if (this.feeProperty.paymentTermType !== 'Annual Float') {
        for (const feeParameter of this.feeParameters) {
          if (this.feeProperty.parameter[0].feeParameter === feeParameter['lookupValue']) {
            this.selectedFeeParameter = feeParameter;
            break;
          }
        }
      }
      else {
        for (const param of this.feeProperty.parameter) {
          for (const feeParameter of this.feeParameters) {
            if (param.feeParameter === feeParameter['lookupValue']) {
              this.arrayParameter[param.yearNo - 1] = feeParameter;
              break;
            }
          }
        }
      }
    }
    this.updateForm(this.feeProperty, this.disabled);
  }

  getFee() {
    this.feeService.getFee(this.feeId).subscribe(data => {
      if (data !== undefined) {
        this.fee = data as Fee;
        this.loadFeeProperty(this.fee);
      }
      this.dataAvailable = true;
    });
  }

  createForm() {
    this.propForm = this.fb.group({
      'feeType': new FormControl({ value: '', disabled: true }, Validators.required),
      'paymentTermType': new FormControl({ value: '', disabled: this.disabled }, Validators.required),
      'amountOfYear': new FormControl({ value: '', disabled: this.disabled }),
      'status': new FormControl({ value: false, disabled: this.disabled }, Validators.required),
      'parameter': null,
      'updatedBy': new FormControl(111)
    });
  }

  updateForm(feeProperty: FeeProperty, dis: boolean) {
    this.propForm.reset({
      'feeType': this.selectedFeeType,
      'paymentTermType': { value: this.selectedPaymentTerm, disabled: dis },
      'amountOfYear': { value: feeProperty.amountOfYear, disabled: dis },
      'parameter': null,
      'status': { value: feeProperty.status, disabled: dis },
      'updatedBy': 111
    });
  }

  isPropertyValid() {
    let isValid = false;
    if (this.propForm.get('paymentTermType').valid
      && this.propForm.get('status').valid
    ) {
      if (this.propForm.get('paymentTermType').value['lookupKey'] !== 'AF') {
        if (this.selectedFeeParameter !== null && this.feeProperty.parameter[0].amount !== null) {
          if (this.selectedFeeParameter['lookupKey'] !== 'Fixed') {
            if (this.feeProperty.parameter[0].minimum !== null) {
              isValid = true;
            }
          } else {
            isValid = true;
          }
        }
      } else {
        if (this.propForm.get('amountOfYear').value > 0) {
          for (let index = 0; index < this.propForm.get('amountOfYear').value; index++) {
            if (this.arrayParameter[index] === null || this.feeProperty.parameter[index].amount === null) {
              isValid = false;
              break;
            } else {
              if (this.arrayParameter[index]['lookupKey'] !== 'Fixed') {
                if (this.feeProperty.parameter[index].minimum === null) {
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

  updateFeeProperty() {
    for (const parameter of this.feeProperty.parameter) {
      if (parameter.feeParameter !== null) {
        if (this.propForm.get('paymentTermType').value !== null && this.propForm.get('paymentTermType').value['lookupKey'] === 'AF' && this.propForm.get('amountOfYear').value !== null) {
          parameter.feeParameter = this.arrayParameter[parameter.yearNo - 1]['lookupKey'];
        } else {
          parameter.feeParameter = this.selectedFeeParameter['lookupKey'];
        }
      }
    }
    this.propForm.patchValue({
      'feeType': this.propForm.get('feeType').value['lookupKey'],
      'paymentTermType': this.propForm.get('paymentTermType').value['lookupKey'],
      'parameter': this.feeProperty.parameter
    });

    this.feeService.updateFeeProperty(this.feeId, this.feePropId, this.propForm.value).subscribe(
      data => {
        this.feeService.changeMessage('success', data['response'])
        this.getFee();
        this.toggleDisabled();
        this.show = false;
      },
      err => {
        this.feeService.changeMessage('error', err.error.errorMessage);
      }
    );
  }

  onPaymentTermSelect() {
    this.propForm.get('amountOfYear').setValue(null);
    this.feeProperty.parameter = [];
    this.feeProperty.parameter.push(new FeeParameter);
    this.selectedFeeParameter = new FeeParameter;
  }

  onAmountOfYearSelect() {
    this.arrayParameter = new Array<Lookup>(20).fill(new Lookup);
    this.feeProperty.parameter = [];
    for (let index = 0; index < this.propForm.get('amountOfYear').value; index++) {
      let parameter = new FeeParameter;
      parameter.yearNo = index + 1;
      this.feeProperty.parameter.push(parameter);
    }
  }

  onParameterSelect(index?: number) {
    if (index >= 0) {
      this.feeProperty.parameter[index].amount = null;
      this.feeProperty.parameter[index].minimum = null;
    } else {
      this.feeProperty.parameter[0].amount = null;
      this.feeProperty.parameter[0].minimum = null;
    }
  }

  getFeeTypeList() {
    return new Promise(res => {
      this.globalService.getLookup('fee.type').subscribe((data: []) => {
        this.feeTypes = data;
        for (const feeType of this.feeTypes) {
          if (feeType['lookupValue'] === this.feeProperty.feeType) {
            this.selectedFeeType = feeType;
            res(this.selectedFeeType);
            break;
          }
        }
      });
    });
  }

  getPaymentTermTypeList() {
    return new Promise(res => {
      this.globalService.getLookup('payment.term.type').subscribe((data: []) => {
        this.paymentTerms = data;
        for (const payment of this.paymentTerms) {
          if (payment['lookupValue'] === this.feeProperty.paymentTermType) {
            this.selectedPaymentTerm = payment;
            res(this.selectedPaymentTerm);
            break;
          }
        }
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
    this.location.back();
  }

  cancel() {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to cancel? Your data will be reset.',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.getFee();
        this.toggleDisabled();
        this.show = false;
      },
      reject: () => {
        this.show = true;
      }
    });
  }

  toggleDisabled() {
    this.disabled = !this.disabled;
    this.updateForm(this.feeProperty, this.disabled);
  }

}
