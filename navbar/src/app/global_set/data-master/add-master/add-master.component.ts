import {Component, OnInit} from '@angular/core';
import {LookupMasterService} from '../../../services/global_set/lookupMaster/lookupMaster.service';
import {Router} from '@angular/router';
import {LookupMaster} from '../../../models/global_set/lookupMaster/lookup-master';
import {Message} from 'primeng/api';

@Component({
  selector: 'app-add-master',
  templateUrl: './add-master.component.html',
  styleUrls: ['./add-master.component.css']
})
export class AddMasterComponent implements OnInit {
  constructor(
      private lookupMasterService: LookupMasterService,
  ) {

  }
    messages: Message[] = [];
    lookupMaster = new LookupMaster;
    ngOnInit() {

    }
    addlookupmaster() {
        this.lookupMasterService.addGroupMaster(this.lookupMaster).subscribe(data => {
            // this.officeService.handleSuccess(data);
            this.handleSuccess(data['response']);
            // this.router.navigate(['/addmaster']);
        });
    }
    handleSuccess(response: string) {
        this.messages.push({ severity: 'success', summary: 'Success', detail: response });
    }
}
