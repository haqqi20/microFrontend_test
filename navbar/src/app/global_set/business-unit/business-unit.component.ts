import { Component, OnInit } from '@angular/core';
import { BusinessUnitService } from '../../services/global_set/business-unit/business-unit.service';
import { BusinessUnit } from 'src/app/models/global_set/business-unit/business-unit'
import { BusinessUnitRequest } from 'src/app/models/global_set/business-unit/business-unit-request'
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-business-unit',
  templateUrl: './business-unit.component.html',
  styleUrls: ['./business-unit.component.css']
})

export class BusinessUnitComponent implements OnInit {

  businessUnit: BusinessUnit[] = [];

  businessUnitRequest: BusinessUnitRequest = new BusinessUnitRequest;

  cols: any[];

  // items: MenuItem[];

  // home: MenuItem;

  constructor(private businessUnitService: BusinessUnitService) { }

  ngOnInit() {

    this.businessUnitService.getBusuList(this.businessUnitRequest).subscribe((data) => {
      this.businessUnit = data['busu'];
      console.log(data['busu'])
    });

    // this.items = [
    //   { label: 'Global Setting' },
    //   { label: 'Business Unit List' },
    // ];

    // this.home = { icon: 'pi pi-home' };

    this.cols = [
      { field: 'no', header: 'No.', width:'5%' },
      { field: 'name', header: 'B.U. Name', width:'50%' },
      { field: 'businessunitType', header: 'B.U. Type', width:'5%' },
      { field: 'status', header: 'B.U. Status', width:'10%' }

    ];
  }

}
