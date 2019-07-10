import { Component, OnInit } from '@angular/core';
import { FeeService } from 'src/app/services/acquisition/fee/fee.service';
import { GlobalSettingService } from 'src/app/services/global_set/global-setting.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fee-list',
  templateUrl: './fee-list.component.html',
  styleUrls: ['./fee-list.component.css']
})
export class FeeListComponent implements OnInit {

  fees = [];

  cols: any[];

  rowsOptions = [10, 50];

  rows = 10;

  constructor(
    private feeService: FeeService,
    private globalService: GlobalSettingService,
    private router: Router
  ) { }

  ngOnInit() {
    this.feeService.getFees().subscribe(data => {
      this.fees = data['fee'];
    });

    this.globalService.getLookup('pagination.number').subscribe(data => {
      if (data !== undefined) {
        let paginations = [];
        for (const lookup of data) {
          paginations.push(+lookup['lookupValue']);
        }
        this.rowsOptions = paginations.sort((a, b) => a - b);
        this.rows = this.rowsOptions[0];
      } else {
        this.rowsOptions.push(10);
      }
    });

    this.cols = [
      { field: 'feeName', header: 'Fee Category', width: '23%' },
      { field: 'description', header: 'Description', width: '50%' },
      { field: 'status', header: 'Active', width: '12%' },
    ];
  }

  onItemClick(uuid: string) {
    this.router.navigateByUrl('acquisition/fee-management/details/' + uuid)
  }

  showAdd() {
    this.router.navigateByUrl('acquisition/fee-management/create')
  }

}
