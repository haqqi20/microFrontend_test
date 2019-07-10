import { Component, OnInit, Input } from '@angular/core';
import { LookupMasterList } from 'src/app/models/global_set/lookupMaster/lookupMasterList';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { LookupDetail } from 'src/app/models/global_set/lookupMaster/lookup-detail';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { LookupMasterService } from 'src/app/services/global_set/lookupMaster/lookupMaster.service'
import { MessageKnockoutService } from 'src/app/services/acquisition/knockout/message-knockout.service';

@Component({
  selector: 'app-knockout-parameter',
  templateUrl: './knockout-parameter.component.html',
  styleUrls: ['./knockout-parameter.component.css']
})
export class KnockoutParameterComponent implements OnInit {
  cols: any[];

  lookup = new LookupMasterList;
  lookupMasterList2: LookupMasterList[];
  lookupMasterList1: LookupMasterList = new LookupMasterList();
  lookupDetailForm: FormGroup;
  lookups: {};
  lookupDetails = [];
  dataAvailable = false;

  clonedlookupDetails: { [s: string]: LookupDetail; } = {};
  msgs: Message[] = [];

  @Input() lookupName = 'knockout.operator';
  @Input() title = '';

  constructor(
    private lookupService: LookupMasterService,
    private msgService: MessageKnockoutService,
    private fb: FormBuilder
  ) { this.createForm() }

  ngOnInit() {
    this.cols = [
      { field: 'paramKey', header: 'Parameter Key', width: '23%' },
      { field: 'paramValue', header: 'Parameter Value', width: '28%' },
      { field: 'isActive', header: 'Active', width: '12%' },
    ];

    this.lookupService.refreshNeeded$.subscribe(() => {
      this.getLookupDoc();
    });

    this.getLookupDoc();
  }

  getLookupDoc() {
    this.lookupService.getLookupByName(this.lookupName).subscribe(data => {
      if (data !== undefined) {
        this.lookups = data;
        this.lookupDetails = data['lookupDetail'];
        this.dataAvailable = true;
      }
    });
  }

  createForm() {
    this.lookupDetailForm = this.fb.group({
      'lookupKey': new FormControl('', Validators.required),
      'lookupValue': new FormControl('', Validators.required),
      'isActive': new FormControl(true),
      'updateBy': new FormControl(111)
    });
  }

  addLookupDetail() {
    this.lookupService.addLookupDetail(this.lookupDetailForm.value, this.lookups['lookupHeadId']).subscribe(
      data => {
        this.msgService.changeMessageInUser('success', data['response']);
        this.lookupDetailForm.reset({
          'isActive': new FormControl(true),
          'updateBy': 111
        });
      },
      err => {
        this.msgService.changeMessageInUser('error', err.error.errorMessage);
        this.lookupDetailForm.reset({
          'isActive': new FormControl(true),
          'updateBy': 111
        });
      }
    );
  }


  onRowEditInit(lookupDetail: LookupDetail) {
    this.clonedlookupDetails[lookupDetail.lookupDetailId] = { ...lookupDetail };
  }

  onRowEditSave(lookupDetail: LookupDetail) {
    if (lookupDetail.lookupKey !== null && lookupDetail.lookupValue !== null) {
      delete this.clonedlookupDetails[lookupDetail.lookupDetailId];
      lookupDetail.updateBy = 111;
      this.lookupService.updateLookupDetailByUUID(this.lookups['lookupHeadId'], lookupDetail.lookupDetailId, lookupDetail).subscribe(
        data => {
          this.msgService.changeMessageInUser('success', data.response);
        },
        err => {
          this.msgService.changeMessageInUser('error', err.error.errorMessage);
        }
      )
    }
    else {
      this.msgService.changeMessageInUser('error', 'Parameter Key and Parameter Value is required');
    }
  }

  onRowEditCancel(lookupDetail: LookupDetail, index: number) {
    this.lookupDetails[index] = this.clonedlookupDetails[lookupDetail.lookupDetailId];
    delete this.clonedlookupDetails[lookupDetail.lookupDetailId];
  }

  discard() {
    this.lookupDetailForm.reset({ 'isActive': true });
  }

}
