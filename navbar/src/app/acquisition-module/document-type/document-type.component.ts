import { Component, OnInit, Input } from '@angular/core';
import { LookupMasterService } from 'src/app/services/global_set/lookupMaster/lookupMaster.service';
import { Message } from 'primeng/components/common/api';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { DocumentService } from 'src/app/services/acquisition/document/document.service';
import { LookupDetail } from 'src/app/models/global_set/lookupMaster/lookup-detail';

@Component({
  selector: 'app-document-type',
  templateUrl: './document-type.component.html',
})
export class DocumentTypeComponent implements OnInit {
  cols: any[];

  lookupDetailForm: FormGroup;
  lookups: {};
  lookupDetails = [];
  dataAvailable = false;

  clonedlookupDetails: { [s: string]: LookupDetail; } = {};
  msgs: Message[] = [];

  @Input() lookupName = 'Personal Identity';
  @Input() title = '';

  constructor(
    private lookupService: LookupMasterService,
    private docService: DocumentService,
    private fb: FormBuilder
  ) { this.createForm() }

  ngOnInit() {
    this.cols = [
      { field: 'paramKey', header: 'Parameter Key', width: '23%' },
      { field: 'paramValue', header: 'Parameter Value', width: '28%' },
      { field: 'status', header: 'Active', width: '12%' },
    ];

    this.lookupService.refreshNeeded$.subscribe(() => {
      this.getLookupDoc();
    })
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
        this.docService.changeMessageInUser('success', data['response']);
        this.lookupDetailForm.reset({
          'updateBy': 111
        });
      },
      err => {
        this.docService.changeMessageInUser('error', err.error.errorMessage);
        this.lookupDetailForm.reset({
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
          this.docService.changeMessageInUser('success', data.response);
        },
        err => {
          this.docService.changeMessageInUser('error', err.error.errorMessage);
        }
      )
    }
    else {
      this.docService.changeMessageInUser('error', 'Parameter Key and Parameter Value is required');
    }
  }

  onRowEditCancel(lookupDetail: LookupDetail, index: number) {
    this.lookupDetails[index] = this.clonedlookupDetails[lookupDetail.lookupDetailId];
    delete this.clonedlookupDetails[lookupDetail.lookupDetailId];
  }

  discard() {
    this.lookupDetailForm.reset({ 'isActive': true });
  }
  handleSuccess(response: string) {
    this.msgs.push({ severity: 'success', summary: 'Success', detail: response });
  }
  handleError(response: string) {
    this.msgs = [];
    this.msgs.push({ severity: 'error', summary: 'Error', detail: response });
  }

}
