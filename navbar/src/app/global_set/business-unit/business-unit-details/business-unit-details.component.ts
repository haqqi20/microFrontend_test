import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Message, TreeNode } from 'primeng/api';
// import { SelectItem, MenuItem } from 'primeng/api';
import { BusinessUnit } from 'src/app/models/global_set/business-unit/business-unit'
import { BusinessUnitRequest } from 'src/app/models/global_set/business-unit/business-unit-request';
import { BusinessUnitService } from 'src/app/services/global_set/business-unit/business-unit.service';
import { BusinessUnitLookup } from 'src/app/models/global_set/business-unit/business-unit-lookup'

@Component({
  selector: 'app-business-unit-details',
  templateUrl: './business-unit-details.component.html',
  styleUrls: ['./business-unit-details.component.css']
})
export class BusinessUnitDetailsComponent implements OnInit {

  show: false;
  disabled = true;

  data: TreeNode[];
  officeData: any = {};
  selectedNode: TreeNode;
  uuid = this.actRoute.snapshot.params['uuid'];
  name: string;
  // update
  cols: any[];
  businessUnit: any = {};
  // busuType: SelectItem[];
  // busuStatus: SelectItem[];

  msgs: Message[] = [];

  constructor(
    private businessUnitService: BusinessUnitService,
    private actRoute: ActivatedRoute,
    private router: Router
  ) {
    // this.buType = [
    //   { label: '2R', value: { id: 1, name: '2R', code: '2R' } },
    //   { label: '4R', value: { id: 2, name: '4R', code: '4R' } },
    // ];

    // this.buStatus = [
    //   { label: 'New', value: { id: 1, name: 'New', code: 'New' } },
    //   { label: 'Old', value: { id: 2, name: 'Old', code: 'Old' } },
    // ];
  }

  updateBusu() {
    this.businessUnit.updatedBy = 111;
    if (window.confirm('Are you sure, you want to update?')) {
      this.businessUnitService.updateBusu(this.uuid, this.businessUnit).subscribe(data => {
        this.businessUnitService.handleSuccess(data);
        this.router.navigate(['/business-unit/details']);
      })
    }
  }

  toggleDisabled() {
    this.disabled = !this.disabled;
  }

  ngOnInit() {
    this.businessUnitService.getBusuById(this.uuid).subscribe(data => {
      this.businessUnit = data;
      this.businessUnit.updatedBy = 111;
    });
  }

  showSuccess() {
    this.msgs = [];
    this.msgs.push({ severity: 'success', summary: 'Sukses!', detail: 'Data berhasil diperbaharui' });
  }
}
