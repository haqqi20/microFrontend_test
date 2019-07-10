import { Component, Input, OnInit } from '@angular/core';
import { Message } from 'primeng/api';
import { LookupMaster } from '../../../models/global_set/lookupMaster/lookup-master';
import { LookupMasterService } from '../../../services/global_set/lookupMaster/lookupMaster.service';
import { ActivatedRoute } from '@angular/router';
import { LookupDetail } from 'src/app/models/global_set/lookupMaster/lookup-detail';
import { GlobalSettingService } from 'src/app/services/global_set/global-setting.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-edit-lookup-detail',
    templateUrl: './edit-lookup-detail.component.html',
    styleUrls: ['./edit-lookup-detail.component.css']
})
export class EditLookupDetailComponent implements OnInit {

    uuid = this.actRoute.snapshot.params['uuid'];

    messages: Message[];

    seqrchQuery = '';

    lookup: LookupMaster;

    rowsOptions = [];

    rows = 10;

    lookupDetails = [];
    clonedlookupDetails: { [s: string]: LookupDetail; } = {};

    lookupDetailForm: FormGroup;

    dataAvailable = false;

    constructor(
        private actRoute: ActivatedRoute,
        private lookupMasterService: LookupMasterService,
        private globalService: GlobalSettingService,
        private fb: FormBuilder
    ) { this.createForm(); }

    ngOnInit() {
        this.loadLookup();
        this.globalService.currentRows.subscribe(data => this.rows = data);
        this.globalService.currentRowsOptions.subscribe(data => this.rowsOptions = data);
    }

    loadLookup() {
        this.lookupMasterService.getLookupByUUID(this.uuid).subscribe(data => {
            this.lookup = data;
            this.dataAvailable = true;
        });
        this.lookupMasterService.getLookupDetailByUUID(this.uuid).subscribe(data => {
            this.lookupDetails = data['lookupDetail'];
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
        this.lookupMasterService.addLookupDetail(this.lookupDetailForm.value, this.uuid).subscribe(
            data => {
                this.handleSuccess(data['response']);
                this.discard();
                this.loadLookup();
            },
            err => {
                this.handleError(err.error.errorMessage);
            }
        );
    }

    onRowEditInit(lookupDetail: LookupDetail) {
        this.clonedlookupDetails[lookupDetail.lookupDetailId] = { ...lookupDetail };
    }

    onRowEditSave(lookupDetail: LookupDetail, index: number) {
        if (lookupDetail.lookupKey !== '' && lookupDetail.lookupValue !== '') {
            lookupDetail.updateBy = 111;
            this.lookupMasterService.updateLookupDetailByUUID(this.uuid, lookupDetail.lookupDetailId, lookupDetail).subscribe(
                data => {
                    this.handleSuccess(data.response);
                    delete this.clonedlookupDetails[lookupDetail.lookupDetailId];
                },
                err => {
                    this.lookupDetails[index] = this.clonedlookupDetails[lookupDetail.lookupDetailId];
                    this.handleError(err.error.errorMessage);
                    delete this.clonedlookupDetails[lookupDetail.lookupDetailId];
                }
            );
        }
        else {
            this.handleError('Parameter Key and Parameter Value is required');
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

    handleSuccess(response: string) {
        this.messages = [];
        this.messages.push({ severity: 'success', summary: 'Success', detail: response });
    }

    handleError(response: string) {
        this.messages = [];
        this.messages.push({ severity: 'error', summary: 'Error', detail: response });
    }
}
