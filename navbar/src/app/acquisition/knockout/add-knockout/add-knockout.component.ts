import { Component, OnInit } from '@angular/core';
import { Message, MessageService, SelectItem, ConfirmationService, SelectItemGroup } from 'primeng/components/common/api';
import { Knockout } from '@app/models/acquisition/knock-out/knockout';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AddKnockoutService } from 'src/app/services/acquisition/knockout/add-knockout.service';
import { Properties } from '@app/models/acquisition/knock-out/properties';
import { KnockoutLookup, KnockoutLookupOperator } from '@app/models/acquisition/knock-out/knockout-lookup';
import { LookupPropertiesService } from 'src/app/services/acquisition/knockout/lookup-properties.service';

@Component({
  selector: 'app-add-knockout',
  templateUrl: './add-knockout.component.html',
  styleUrls: ['./add-knockout.component.css'],
  providers: [MessageService, ConfirmationService],
})
export class AddKnockoutComponent implements OnInit {

  cols: any[];
  msgs: Message[] = [];
  knockout: Knockout = new Knockout;
  knockForm: FormGroup;
  knockForm1: FormGroup;
  prop: Properties[] = [];
  //dummy
  knockLookup: KnockoutLookup[];
  selectedLookup: KnockoutLookup;
  filteredLookup: KnockoutLookup[];
  knockLookupOperator: KnockoutLookupOperator[];
  selectedLookupOperator: KnockoutLookupOperator;
  filteredLookupOperator: KnockoutLookupOperator[];
  cars: SelectItem[];
  selectedCar1: string;
  items: SelectItem[];
  item: string;
  selected: any;

  constructor(
    private messageService: MessageService,
    private fb: FormBuilder,
    private fb1: FormBuilder,
    private confirmationService: ConfirmationService,
    private router: Router,
    private knockoutService: AddKnockoutService,
    private lookupService: LookupPropertiesService,
  ) {
    this.createForm();
    this.createForm1();
    this.cars = [
      { label: 'Manual Input', value: 'static' },
    ];
  }

  ngOnInit() {
    this.cols = [
      { field: 'priority', header: 'Priority', width: '8%' },
      { field: 'attribute', header: 'Attribute', width: '20%' },
      { field: 'operator', header: 'Operator', width: '10%' },
      { field: 'value', header: 'Value', width: '18%' },
      { field: 'nextTrue', header: 'Next True', width: '12%' },
      { field: 'nextFalse', header: 'Next False', width: '12%' },
      { field: 'Status', header: 'Status', width: '10%' },
    ];

    this.lookupService.getLookup()
      .subscribe((data: []) => {
        this.knockLookup = data;
      });

    this.lookupService.getLookupOperator()
      .subscribe((data: []) => {
        this.knockLookupOperator = data;
      });

  }

  createForm() {
    this.knockForm = this.fb.group({
      'valueCriteria': new FormControl('', Validators.required),
      'atributeCriteria': new FormControl('', Validators.required),
      'operator': new FormControl('', Validators.required),
      'typeCriteria': new FormControl('static', Validators.required),
      'priority': new FormControl('', Validators.required),
      'nextTrue': new FormControl('', Validators.required),
      'nextFalse': new FormControl('', Validators.required),
      'status': new FormControl(true),
    });
  }

  updateForm(prop: Properties) {
    this.knockForm.reset({
      'valueCriteria': { value: prop.valueCriteria },
      'atributeCriteria': { value: prop.atributeCriteria },
      'operator': { value: prop.operator },
      'typeCriteria': { value: prop.typeCriteria },
      'priority': { value: prop.priority },
      'nextTrue': { value: prop.nextTrue },
      'nextFalse': { value: prop.nextFalse },
      'status': { value: prop.status },
    });
  }

  createForm1() {
    this.knockForm1 = this.fb1.group({
      'knockoutName': new FormControl('', Validators.required),
      'description': new FormControl('', Validators.required),
      'status': new FormControl(true),
      'properties': new FormControl(''),
      'updatedBy': new FormControl(111),
    });
  }

  updateForm1(knock: Knockout) {
    this.knockForm1.reset({
      'knockoutName': { value: knock.knockoutName },
      'description': { value: knock.description },
      'status': { value: knock.status },
      'properties': { value: knock.properties },
    });
  }

  addKnockout() {
    this.knockForm1.patchValue({
      'properties': this.prop,
    });
    this.knockoutService.addKnockout(this.knockForm1.value).subscribe(data => {
      this.prop = [];
      this.handleSuccess(data['response']);
      this.knockForm1.reset({
        'status': (true),
        'updatedBy': 111
      });
      this.knockForm.reset({
        'status': (true),
        'updatedBy': 111,
        'typeCriteria': 'static'
      });
      this.router.navigate(['/acquisition/knockout']);
    },
      err => {
        this.handleError(err.error.errorMessage);
      })
  }

  addNewKnockout() {
    this.knockForm1.patchValue({
      'properties': this.prop,
    });
    this.knockoutService.addKnockout(this.knockForm1.value).subscribe(data => {
      this.prop = [];
      this.handleSuccess(data['response']);
      this.knockForm1.reset({
        'status': (true),
        'updatedBy': 111,
      });
      this.knockForm.reset({
        'status': (true),
        'updatedBy': 111,
        'typeCriteria': 'static'
      });
    },
      err => {
        this.handleError(err.error.errorMessage);
        this.knockForm1.controls['properties'].reset();
      })
  }

  addCriteria() {
    var exist = true;
    for (const property of this.prop) {
      if (this.knockForm.get('priority').value === property['priority']) {
        this.msgs.push({ severity: 'error', summary: 'Error', detail: 'Criteria is already exist' });
        exist = false;
        break;
      }
    }
    if (exist) {
      this.knockForm.get('atributeCriteria').setValue(this.knockForm.get('atributeCriteria').value['lookupValue']);
      this.knockForm.get('operator').setValue(this.knockForm.get('operator').value['lookupValue']);
      this.prop.push(this.knockForm.value);
      this.knockForm.reset({
        'status': (true),
        'updatedBy': 111,
        'typeCriteria': 'static'
      });
      
    }
    return this.prop;
  }

  cancelAddCriteria() {
    this.knockForm.reset({
      'status': (true),
      'updatedBy': 111,
      'typeCriteria': 'static'
    });
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

  handleSuccess(response: string) {
    this.msgs = [];
    this.msgs.push({ severity: 'success', summary: 'Success', detail: response });
  }

  handleError(response: string) {
    this.msgs = [];
    this.msgs.push({ severity: 'error', summary: response });
  }

  confirm1() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to cancel?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.router.navigate(['/acquisition/knockout'])
      },
      reject: () => {
        this.msgs = [{ severity: 'info', summary: 'Rejected', detail: 'You have rejected' }];
      }
    });
  }

  delete(i: number) {
    this.prop.splice(i, 1);
  }
}
