import { Component, OnInit, Input } from '@angular/core';
import { LookupMasterService } from 'src/app/services/global_set/lookupMaster/lookupMaster.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LookupMaster } from 'src/app/models/global_set/lookupMaster/lookup-master';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-add-lookup',
  templateUrl: './add-lookup.component.html',
  styleUrls: ['./add-lookup.component.css']
})
export class AddLookupComponent implements OnInit {

    lookupGroup = this.actRoute.snapshot.params['uuid'];

    lookup = new LookupMaster;

    @Input() lookupValue = {
        lookupName: '',
        groupValue: '',
        updateBy: 0,
    };

    messages: Message[] = [];

    constructor(
        private lookupService: LookupMasterService,
        private actRoute: ActivatedRoute
    ) { }

    ngOnInit() {
        console.log(this.lookupGroup);
        this.getLookupById();
    }

    getLookupById() {
        this.lookupService.getLookupDetailByvalue(this.lookupGroup).subscribe(data => {
            this.lookup = data;
        });
    }

    addLookupDetail() {
        this.lookupService.addLookupValue(this.lookupValue, this.lookupGroup).subscribe(data => {
            this.handleSuccess(data['response']);
        });
    }

    reset() {
        this.lookupValue = new LookupMaster;
    }

    handleSuccess(response: string) {
        this.messages.push({ severity: 'success', summary: 'Success', detail: response });
    }
}
