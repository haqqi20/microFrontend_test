import { Component, OnInit, Input } from '@angular/core';
import { LookupDetail } from 'src/app/models/global_set/lookupMaster/lookup-detail';
import { LookupMasterService } from 'src/app/services/global_set/lookupMaster/lookupMaster.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { FeeService } from 'src/app/services/acquisition/fee/fee.service';
import { GlobalSettingService } from 'src/app/services/global_set/global-setting.service';

@Component({
  selector: 'app-fee-lookup',
  templateUrl: './fee-lookup.component.html',
  styleUrls: ['./fee-lookup.component.css']
})
export class FeeLookupComponent implements OnInit {

  @Input() lookupName = 'fee.type';
  @Input() title = '';
  
  seqrchQuery = '';

  lookup: {};

  rowsOptions = [];

  rows = 10;
  
  lookupDetails = [];
  clonedlookupDetails: { [s: string]: LookupDetail; } = {};

  lookupDetailForm: FormGroup;

  dataAvailable = false;

  constructor(
    private lookupService: LookupMasterService,
    private globalService: GlobalSettingService,
    private feeService: FeeService,
    private fb: FormBuilder
  ) { this.createForm(); }

  ngOnInit() {
    this.getLookup();
    this.globalService.currentRows.subscribe(data => this.rows = data);
    this.globalService.currentRowsOptions.subscribe(data => this.rowsOptions = data);
  }

  getLookup() {
    this.lookupService.getLookupByName(this.lookupName).subscribe(data => {
      if (data !== undefined) {
        this.lookup = data;
        this.lookupDetails = data['lookupDetail'];
        this.dataAvailable = true;
      }
    });
  }

  createForm() {
    this.lookupDetailForm = this.fb.group({
      'lookupKey': new FormControl('', Validators.required),
      'lookupValue': new FormControl('', Validators.required),
      'isActive': new FormControl(true, Validators.required),
      'updateBy': new FormControl(111)
    });
  }

  addLookupDetail() {
    this.lookupService.addLookupDetail(this.lookupDetailForm.value, this.lookup['lookupHeadId']).subscribe(
      data => {
        this.feeService.changeMessage('success', data['response']);
        this.discard();
        this.getLookup();
      },
      err => {
        this.feeService.changeMessage('error', err.error.errorMessage);
      }
    );
  }

  onRowEditInit(lookupDetail: LookupDetail) {
    this.clonedlookupDetails[lookupDetail.lookupDetailId] = { ...lookupDetail };
  }

  onRowEditSave(lookupDetail: LookupDetail, index: number) {
    if (lookupDetail.lookupKey !== '' && lookupDetail.lookupValue !== '') {
      lookupDetail.updateBy = 111;
      this.lookupService.updateLookupDetailByUUID(this.lookup['lookupHeadId'], lookupDetail.lookupDetailId, lookupDetail).subscribe(
        data => {
          this.feeService.changeMessage('success', data.response);
          delete this.clonedlookupDetails[lookupDetail.lookupDetailId];
        },
        err => {
          this.lookupDetails[index] = this.clonedlookupDetails[lookupDetail.lookupDetailId];
          this.feeService.changeMessage('error', err.error.errorMessage);
          delete this.clonedlookupDetails[lookupDetail.lookupDetailId];
        }
      );
    }
    else {
      this.feeService.changeMessage('error', 'Parameter Key and Parameter Value is required');
    }
  }

  onRowEditCancel(lookupDetail: LookupDetail, index: number) {
    this.lookupDetails[index] = this.clonedlookupDetails[lookupDetail.lookupDetailId];
    delete this.clonedlookupDetails[lookupDetail.lookupDetailId];
  }

  discard() {
    this.lookupDetailForm.reset({
      'lookupKey': '',
      'lookupValue': '',
      'isActive': true,
      'updateBy': 111
    });
  }
}
