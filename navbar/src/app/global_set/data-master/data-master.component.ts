import { Component, OnInit } from '@angular/core';
import { LookupMaster } from '../../models/global_set/lookupMaster/lookup-master';
import { LookupMasterService } from '../../services/global_set/lookupMaster/lookupMaster.service';

@Component({
    selector: 'app-data-master',
    templateUrl: './data-master.component.html',
    styleUrls: ['./data-master.component.css']
})
export class DataMasterComponent implements OnInit {

    lookupList: LookupMaster[];
    lookupName = '';
    rowGroupMetadata: any;
    checked: boolean = false;
    show: boolean;
    disabled = true;
    toggleDisabled() {
        this.disabled = !this.disabled;
    }
    constructor(private lookupService: LookupMasterService) { }

    ngOnInit() {
        // this.lookupMaster.getLookupList().subscribe(lookuplist => {
        //     this.lookuplist = lookuplist['lookup'];
        //     this.updateRowGroupMetaData();
        // });
        // this.lookupMaster.getlookupMasterList(this.lookupgroup).subscribe(group => {
        //     this.lookuplist = group['group'];
        //     // this.updateRowGroupMetaData();
        // });
    }

    onSort() {
        this.updateRowGroupMetaData();
    }

    updateRowGroupMetaData() {
        this.rowGroupMetadata = {};
        if (this.lookupList) {
            for (let i = 0; i < this.lookupList.length; i++) {
                const rowData = this.lookupList[i];
                const groupValue = rowData.groupValue;
                if (i === 0) {
                    this.rowGroupMetadata[groupValue] = { index: 0, size: 1 };
                } else {
                    const previousRowData = this.lookupList[i - 1];
                    const previousRowGroup = previousRowData.groupValue;
                    if (groupValue === previousRowGroup) {
                        this.rowGroupMetadata[groupValue].size++;
                    } else {
                        this.rowGroupMetadata[groupValue] = { index: i, size: 1 };
                    }
                }
            }
        }
    }

    getLookupListByName() {
        this.lookupService.getLookupListByName(this.lookupName).subscribe(data => {
            this.lookupList = data['lookup'];
            this.updateRowGroupMetaData();
            this.show = true;
        })
    }
}
