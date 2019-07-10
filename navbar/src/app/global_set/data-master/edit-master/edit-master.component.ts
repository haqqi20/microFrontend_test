import { Component, OnInit } from '@angular/core';
import { Message } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { LookupMaster } from '../../../models/global_set/lookupMaster/lookup-master';
import { LookupMasterService } from '../../../services/global_set/lookupMaster/lookupMaster.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LookupDetail } from 'src/app/models/global_set/lookupMaster/lookup-detail';

@Component({
    selector: 'app-edit-master',
    templateUrl: './edit-master.component.html',
    styleUrls: ['./edit-master.component.css'],
    providers: [MessageService]
})
export class EditMasterComponent implements OnInit {
    lookupDetails: LookupDetail[];
    lookupMaster: LookupMaster = new LookupMaster;
    uuid = this.actRoute.snapshot.params['uuid'];
    messages: Message[] = [];
    clonedCars: { [s: string]: LookupDetail; } = {};

    constructor(
        private lookupMasterService: LookupMasterService,
        private actRoute: ActivatedRoute,
        private router: Router,
    ) {
    }

    ngOnInit() {
        this.lookupMasterService.getGroupByUUID(this.uuid).subscribe(data => {
            this.lookupMaster = data;
            this.lookupMaster.updateBy = 0;
        });

        this.lookupMasterService.getLookupDetailByvalue(this.uuid).subscribe(lookuplist => {
            this.lookupDetails = lookuplist['lookup'];
            // this.lookupDetails.updateBy = 0;
        });
    }

    updateGroupMaster() {
        if (window.confirm('Are you sure, you want to update?')) {
            this.lookupMasterService.updateGroupByUUID(this.uuid, this.lookupMaster).subscribe(data => {
                // this.lookupDetails = data['lookup'];
                this.handleSuccess(data['response']);
                // this.router.navigate(['/globalsetting/lookup/edit/group/']);
                // this.router.navigate(['/globalsetting/lookup/edit/group/', { uuid: this.uuid } ]);
            });
        }
    }

    updateLookupDetail(rowData) {
        if (window.confirm('Are you sure, you want to update?')) {
            rowData.updateBy = 0;
            this.lookupMasterService.updateLookupByUUID(rowData.lookupHeadId, rowData).subscribe(data => {
                this.lookupDetails = data['lookup'];
                this.handleSuccess(data['response']);
            });
        }
    }

    handleSuccess(response: string) {
        this.messages.push({ severity: 'success', summary: 'Success', detail: response });
    }

    onRowEditInit(lookupDetail: LookupDetail) {
        this.clonedCars[lookupDetail.lookupDetailId] = { ...lookupDetail };
    }

    onRowEditCancel(lookupDetail: LookupDetail, index: number) {
        this.lookupDetails[index] = this.clonedCars[lookupDetail.lookupDetailId];
        delete this.clonedCars[lookupDetail.lookupDetailId];
    }

}
