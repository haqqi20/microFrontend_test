import { Component, OnInit, Input } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { Router } from '@angular/router';
import { BusinessUnitService } from 'src/app/services/global_set/business-unit/business-unit.service';
import { Message } from 'primeng/api';
import { BusinessUnitLookup } from 'src/app/models/global_set/business-unit/business-unit-lookup';
import { BusinessUnit } from 'src/app/models/global_set/business-unit/business-unit';

@Component({
  selector: 'app-business-unit-add',
  templateUrl: './business-unit-add.component.html',
  styleUrls: ['./business-unit-add.component.css']
})
export class BusinessUnitAddComponent implements OnInit {

  cols: any[];

  showInformation: boolean = false;

  officeData: any = {}

  busuType: BusinessUnitLookup[];

  busuStatus: BusinessUnitLookup[];

  selectedBusuType: BusinessUnitLookup;

  selectedBusuStatus: BusinessUnitLookup;

  filteredBusuTypes: BusinessUnitLookup[]

  filteredBusuStatus: BusinessUnitLookup[]

  msgs: Message[] = [];

  @Input() businessUnit = {
    busuId: '',
    name: '',
    businessunitType: '',
    status: '',
    compId: 100,
    updatedBy: 111,
  }

  constructor(
    private businessUnitService: BusinessUnitService,
    private router: Router
  ) 
  {
      // this.busuType = [
      //   { label: '2R', value: { id: 1, name: '2R', code: '2R' } },
      //   { label: '4R', value: { id: 2, name: '4R', code: '4R' } },
      // ];

      // this.busuStatus = [
      //   { label: 'New', value: { id: 1, name: 'New', code: 'New' } },
      //   { label: 'Old', value: { id: 2, name: 'Old', code: 'Old' } },
      // ];
  }

  ngOnInit() {
    this.cols = [
      { field: 'name', header: 'Business Unit Name' },
      { field: 'businessunitType', header: 'Type' },
      { field: 'status', header: 'Status' },
    ];
  }

  addBusu() {
    this.businessUnitService.addBusu(this.businessUnit).subscribe(data => {
      this.businessUnitService.handleSuccess(data);
      this.router.navigate(['/business-unit/add'])
    })
  }

  // this.businessUnitService.getBusuTypeList()
  //   .subscribe(data => {
  //     console.log(data['lookup']);
  //     this.busuTypes = data['lookup'];
  //     this.selectedBusuType = this.busuTypes[0];
  //   });

  // filterStatuses(event) {
  //   let query = event.query;
  //   this.filteredBusuStatus = this.filterStatus(query, this.busuStatus);
  // }

  // filterStatus(query, busuStatus: any[]): any[] {
  //   //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
  //   let filtered: any[] = [];
  //   for (let i = 0; i < busuStatus.length; i++) {
  //     let selectedBusuStatus = busuStatus[i];
  //     if (selectedBusuStatus.label.toLowerCase().indexOf(query.toLowerCase()) == 0) {
  //       filtered.push(selectedBusuStatus);
  //     }
  //   }
  //   return filtered;
  // }

  // filterTypes(event) {
  //   let query = event.query;
  //   this.filteredBusuTypes = this.filterType(query, this.busuTypes);
  // }

  // filterType(query, busuTypes: any[]): any[] {
  //   //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
  //   let filtered: any[] = [];
  //   for (let i = 0; i < busuTypes.length; i++) {
  //     let selectedBusuType = busuTypes[i];
  //     if (selectedBusuType.label.toLowerCase().indexOf(query.toLowerCase()) == 0) {
  //       filtered.push(selectedBusuType);
  //     }
  //   }
  //   return filtered;
  // }

  showSuccess() {
    this.msgs = [];
    this.msgs.push({ severity: 'success', summary: 'Sukses', detail: 'Data berhasil disimpan' });
  }

  // reset() {
  //   this.addBusu();
  // }

  // onSubmit(value: any): void {
  //   // code that happens when form is submitted
  //   // then reset the form
  //   // this.reset();
  // }
}
