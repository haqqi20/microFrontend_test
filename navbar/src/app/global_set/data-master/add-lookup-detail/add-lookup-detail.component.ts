import { Component, OnInit, Input } from '@angular/core';
import { LookupMasterService } from 'src/app/services/global_set/lookupMaster/lookupMaster.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LookupMaster } from 'src/app/models/global_set/lookupMaster/lookup-master';
import { Message } from 'primeng/api';
import { LookupDetail } from 'src/app/models/global_set/lookupMaster/lookup-detail';

@Component({
  selector: 'app-add-lookup-detail',
  templateUrl: './add-lookup-detail.component.html',
  styleUrls: ['./add-lookup-detail.component.css']
})
export class AddLookupDetailComponent implements OnInit {

  lookupHeadId = this.actRoute.snapshot.params['uuid'];
  
  lookup = new LookupMaster;
  
  @Input() lookupDetail = {
    lookupKey: '',
    lookupValue: '',
    updateBy: 0,
  };
  
  messages: Message[] = [];
  
  constructor(
    private lookupService: LookupMasterService,
    private actRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    console.log(this.lookupHeadId);
    this.getLookupById();
  }

  getLookupById() {
    this.lookupService.getLookupByUUID(this.lookupHeadId).subscribe(data =>
      {
        this.lookup = data;
      })
  }

  addLookupDetail() {
    this.lookupService.addLookupDetail(this.lookupDetail, this.lookupHeadId).subscribe(data => {
      this.handleSuccess(data['response']);
    })
  }

  reset() {
    this.lookupDetail = new LookupDetail;
  }

  handleSuccess(response: string) {
    this.messages.push({ severity: 'success', summary: 'Success', detail: response });
  }
}
