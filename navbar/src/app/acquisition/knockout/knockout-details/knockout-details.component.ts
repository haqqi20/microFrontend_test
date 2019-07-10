import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Message, MessageService, SelectItem } from 'primeng/components/common/api';
import { Knockout } from '@app/models/acquisition/knock-out/knockout';
import { Properties } from '@app/models/acquisition/knock-out/properties';
import { AddKnockoutService } from 'src/app/services/acquisition/knockout/add-knockout.service';
import { ActivatedRoute } from '@angular/router';
import { LookupPropertiesService } from 'src/app/services/acquisition/knockout/lookup-properties.service';
import { KnockoutLookup, KnockoutLookupOperator } from '@app/models/acquisition/knock-out/knockout-lookup';

@Component({
  selector: 'app-knockout-details',
  templateUrl: './knockout-details.component.html',
  styleUrls: ['./knockout-details.component.css'],
  providers: [MessageService]
})
export class KnockoutDetailsComponent implements OnInit {

  checked: boolean;
  checked1: boolean = true;
  checked2: boolean = true;
  cols: any[];
  show: boolean;
  disabled = true;
  knockForm: FormGroup;
  msgs: Message[] = [];
  props: Properties[] = [];
  knockLookup: KnockoutLookup[];
  selectedLookup: KnockoutLookup;
  filteredLookup: KnockoutLookup[];
  knockLookupOperator: KnockoutLookupOperator[];
  selectedLookupOperator: KnockoutLookupOperator;
  filteredLookupOperator: KnockoutLookupOperator[];
  knockout = new Knockout;
  properties = new Properties;
  knockForm1: FormGroup;
  uuid = this.actRoute.snapshot.params['uuid'];
  knockInformation: any = {};
  propertiesInformation: any = {};
  cars: SelectItem[];
  propList: Properties[];
  propList1: Properties = new Properties();
  propList2: Properties[];
  clonedCars: { [s: string]: Properties; } = {};
  private propList11: any;

  toggleDisabled() {
    this.disabled = !this.disabled;
    this.updateForm(this.properties, this.disabled);
    this.updateKnock(this.knockInformation, this.disabled);
  }
  constructor(
    private fb: FormBuilder,
    private fb1: FormBuilder,
    private knockoutService: AddKnockoutService,
    private lookupService: LookupPropertiesService,
    private actRoute: ActivatedRoute,
  ) {
    this.createKnock();
    this.createForm();
    this.cars = [
      { label: 'None', value: 'none' },
      { label: 'Select Input', value: 'dynamic' },
      { label: 'Manual Input', value: 'static' },
    ];
  }

  ngOnInit() {
    this.cols = [
      { field: 'priority', header: 'Priority', width: '8%' },
      { field: 'attribute', header: 'Attribute', width: '15%' },
      { field: 'operator', header: 'Operator', width: '13%' },
      { field: 'value', header: 'Value', width: '18%' },
      { field: 'nextTrue', header: 'Next True', width: '8%' },
      { field: 'nextFalse', header: 'Next False', width: '8%' },
      { field: 'Status', header: 'Status', width: '8%' },
    ];

    this.lookupService.getLookup()
      .subscribe((data: []) => {
        this.knockLookup = data;
        this.knockLookup.unshift({ uuid: '0', lookupKey: 'No Criteria', lookupValue: '' })
        this.selectedLookup = this.knockLookup[0];
      });

    this.lookupService.getLookupOperator()
      .subscribe((data: []) => {
        this.knockLookupOperator = data;
        this.knockLookupOperator.unshift({ uuid: '0', lookupKey: 'No Criteria', lookupValue: '' })
        this.selectedLookupOperator = this.knockLookupOperator[0];
      });

    this.knockoutService.refreshNeeded$.subscribe(() => {
      this.loadKnock();
      this.loadProperties();
    })    
    this.loadKnock();
    this.loadProperties();
  }

  createKnock() {
    this.knockForm1 = this.fb.group({
      'knockoutName': new FormControl({ value: '', disabled: this.disabled }, Validators.required),
      'description': new FormControl({ value: '', disabled: this.disabled }, Validators.required),
      'status': new FormControl({ value: '', disabled: this.disabled }),
      'properties': new FormControl(''),
      'updatedBy': new FormControl(111),
    });
  }
  updateKnock(knock: Knockout, dis: boolean) {
    this.knockForm1.reset({
      'knockoutName': { value: knock.knockoutName, disabled: dis },
      'description': { value: knock.description, disabled: dis },
      'status': { value: knock.status, disabled: dis },
      // 'properties': { value: knock.properties },
      'updatedBy': 111,
    });
  }
  //asdasdasd
  createForm() {
    this.knockForm = this.fb.group({
      'valueCriteria': new FormControl({ value: '', disabled: this.disabled }, Validators.required),
      'atributeCriteria': new FormControl({ value: '', disabled: this.disabled }, Validators.required),
      'operator': new FormControl({ value: '', disabled: this.disabled }, Validators.required),
      'typeCriteria': new FormControl({ value: '', disabled: this.disabled }, Validators.required),
      // 'values': new FormControl({value: '', disabled: this.disabled}, Validators.required),
      'priority': new FormControl({ value: '', disabled: this.disabled }, Validators.required),
      'nextTrue': new FormControl({ value: '', disabled: this.disabled }, Validators.required),
      'nextFalse': new FormControl({ value: '', disabled: this.disabled }, Validators.required),
      'status': new FormControl(true),
    });
  }

  updateForm(properties: Properties, dis: boolean) {
    this.knockForm.reset({
      'valueCriteria': { value: properties.valueCriteria, disabled: dis },
      'atributeCriteria': { value: properties.atributeCriteria, disabled: dis },
      'typeCriteria': { value: properties.typeCriteria, disabled: dis },
      'operator': { value: properties.operator, disabled: dis },
      // 'values': {value: properties.valueCriteria, disabled: dis},
      'priority': { value: properties.priority, disabled: dis },
      'nextTrue': { value: properties.nextTrue, disabled: dis },
      'nextFalse': { value: properties.nextFalse, disabled: dis },
      'status': { value: properties.status, disabled: dis },
    });
  }

  loadKnock() {
    this.knockForm1.get('properties').setValue([this.knockForm.value]);
    this.knockoutService.getKnockoutById(this.uuid).subscribe(data => {
      this.knockInformation = data;
      this.updateKnock(this.knockInformation, this.disabled);
      this.knockInformation.updatedBy = 100;
    });
  }

  loadProperties() {
    this.knockoutService.getPropertiesList(this.uuid).subscribe(data => {
      this.props = data['properties']
    })
  }

  filterParents(event) {
    const query = event.query;
    this.filteredLookup = this.filterParent(query, this.knockLookup);
  }

  filterParent(query, knockLookup: any[]): any[] {
    const filtered: any[] = [];
    for (let i = 0; i < knockLookup.length; i++) {
      const selectedLookup = knockLookup[i];
      if (selectedLookup.lookupKey.toLowerCase().indexOf(query.toLowerCase()) === 0) {
        filtered.push(selectedLookup);
      }
    }
    return filtered;
  }

  filterOperators(event) {
    const query = event.query;
    this.filteredLookupOperator = this.filterOperator(query, this.knockLookupOperator);
  }

  filterOperator(query, knockLookupOperator: any[]): any[] {
    const filtered: any[] = [];
    for (let i = 0; i < knockLookupOperator.length; i++) {
      const selectedLookupOperator = knockLookupOperator[i];
      if (selectedLookupOperator.lookupKey.toLowerCase().indexOf(query.toLowerCase()) === 0) {
        filtered.push(selectedLookupOperator);
      }
    }
    return filtered;
  }

  addCriteria() {
    this.knockForm.get('atributeCriteria').setValue(this.knockForm.get('atributeCriteria').value['lookupKey']);
    this.knockForm.get('operator').setValue(this.knockForm.get('operator').value['lookupKey']);
    this.knockout.properties = [this.knockForm.value];
    this.knockout.updatedBy = 111;
    this.knockoutService.addCriteria(this.uuid, this.knockout).subscribe(data => {
      this.handleSuccess(data['response']);
      this.knockForm.reset({
        'status': (true)
      });
      this.loadKnock();
    },
      err => {
        this.handleError(err.error.errorMessage);
        this.loadKnock();
      });
  }

  updateOffice() {
    this.knockoutService.updateKnockout(this.uuid, this.knockForm1.value).subscribe(data => {
      this.handleSuccess(data['response']);
      this.loadKnock();
    },
      err => {
        console.log(err);
        this.handleError(err.error.errorMessage);
        this.loadKnock();
      });
  }

  updateCriteria(rowData) {
    rowData.updatedBy = 0;
    rowData.operator = this.selectedLookupOperator['lookupKey'];
    this.knockoutService.updateCriteriaByUUID(this.uuid, rowData.knockoutPropertyId, rowData).subscribe(data => {
      rowData.operator = this.selectedLookupOperator['lookupValue'];
      this.propList11 = data['properties'];
      this.handleSuccess(data['response']);
      this.loadKnock();
    },
      err => {
        this.handleError(err.error.errorMessage);
        this.loadKnock();
      });
  }

  onRowEditInit(properties: Properties) {
    this.clonedCars[properties.knockoutPropertyId] = { ...properties };
  }

  onRowEditCancel(properties: Properties, index: number) {
    this.propList2[index] = this.clonedCars[properties.knockoutPropertyId];
    delete this.clonedCars[properties.knockoutPropertyId];
  }

  handleSuccess(response: string) {
    this.msgs = [];
    this.msgs.push({ severity: 'success', summary: 'Success', detail: response });
  }

  handleError(response: string) {
    this.msgs = [];
    this.msgs.push({ severity: 'error', summary: 'Error', detail: response });
  }

  discard() {
    this.knockForm.reset({
      'status': (true)
    })
  }
}
