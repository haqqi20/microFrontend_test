import { Component, OnInit } from '@angular/core';
// import {Validators,FormControl,FormGroup,FormBuilder} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OfficeService } from 'src/app/services/global_set/office/office.service';
import { OfficeLookup } from 'src/app/models/global_set/office/office-lookup';
import { Message } from 'primeng/api';
// import { Office } from 'src/app/models/global_set/office/office';

@Component({
  selector: 'app-update-office',
  templateUrl: './update-office.component.html',
  styleUrls: ['./update-office.component.css'],
  // styles: [`
  //  :host ::ng-deep .ui-message,
  //   :host ::ng-deep .ui-inputtext {
  //       margin-right: .25em;
  //   }
  //   `],
})
export class UpdateOfficeComponent implements OnInit {

  cols: any[];

  showInformation: boolean = false;

  uuid = this.actRoute.snapshot.params['uuid'];
  
  officeData: any = {};

  officeInformation: any = {};

  officeHeads: OfficeLookup[];

  officeTypes: OfficeLookup[];

  selectedOfficeHead: OfficeLookup;
  
  selectedOfficeType: OfficeLookup;

  msgs: Message[] = [];

  // officeForm: FormGroup;

  constructor(
    // private fb: FormBuilder,
    private officeService: OfficeService,
    private actRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    // this.officeForm = new FormGroup({
    //   'firstname': new FormControl('', Validators.required),
    //   'lastname': new FormControl('', Validators.required),
    //   'password': new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)])),
    //   'description': new FormControl(''),
    // });

    this.cols = [
      { field: 'name', header: 'Office Name' },
      { field: 'officeHeadId', header: 'Office Head Name' },
      { field: 'officeType', header: 'Office Type' },
      { field: 'state', header: 'State' },
      { field: 'city', header: 'City' },
      { field: 'district', header: 'District' },
      { field: 'village', header: 'Village' },
      { field: 'address', header: 'Address' },
      { field: 'neighbourhoodNumber', header: 'Neighbourhood Number' },
      { field: 'hamletNumber', header: 'Hamlet Number' },
      { field: 'zipcode', header: 'Zip Code' }
    ];

    this.officeService.getOfficeByUUID(this.uuid).subscribe(data => {
      this.officeInformation = data;
      // this.officeInformation.compId = 100;
      this.officeInformation.updateBy = 111;
      this.getOfficeHeadList();
      this.getOfficeTypeList();
    });

  }

  getOfficeTypeList() {
    this.officeService.getOfficeTypeList()
    .subscribe(data => {
      this.officeTypes = data['lookup'];
      this.selectedOfficeType = this.officeTypes[0];
      for (const i of this.officeTypes) {
        if (i.label === this.officeInformation['officeType']) {
          this.selectedOfficeType = i;
          break;
        }
      }
    });
  }

  getOfficeHeadList() {
    this.officeService.getOfficeHeadList()
    .subscribe(data => {
      this.officeHeads = data['lookup'];
      this.officeHeads.unshift({uuid:'0', label: 'No Office Head', value: '0'});
      for (const i of this.officeHeads) {
        if (i.label === this.officeInformation['officeHeadId']) {
          this.selectedOfficeHead = i;
          break;
        }
      }
      this.getOfficeById();
    });
  }

  updateOffice() {
    this.officeInformation.officeHeadId = +this.selectedOfficeHead['value'];
    this.officeInformation.officeType = this.selectedOfficeType['value'];
    if(window.confirm('Are you sure, you want to update?')) {
      this.officeService.updateOffice(this.uuid, this.officeInformation).subscribe(data => {
        // this.officeService.handleSuccess(data);
        this.router.navigate(['/office/update'])
      })
    }
  }

  getOfficeById() {
    if((this.selectedOfficeHead['value'] === '0') || (this.selectedOfficeHead['label'] === this.officeInformation.name)){
      this.showInformation = false;
      this.officeData = {}
    } else {
      this.showInformation = true;
      this.officeService.getOfficeByUUID(this.selectedOfficeHead['uuid'])
      .subscribe(data => this.officeData = data);
    }
  }

  showSuccess() {
    this.msgs = [];
    this.msgs.push({ severity: 'success', summary: 'Cendol gan!', detail: 'Data berhasil diperbaharui' });
  }
}
