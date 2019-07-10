import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { OfficeService } from 'src/app/services/global_set/office/office.service';
import { OfficeLookup } from 'src/app/models/global_set/office/office-lookup';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
// import {MessageService, Message} from 'primeng/api';
// import { Message } from 'primeng/components/common/api';
import { MessageService, TreeNode, Message } from 'primeng/api';
import { ZipCodeService } from '../../../services/global_set/zipcode/zip-code.service';
// import { MessageService } from 'primeng/components/common/api';
// import { Office } from 'src/app/models/global_set/office/office';

@Component({
  selector: 'app-add-office',
  templateUrl: './add-office.component.html',
  styleUrls: ['./add-office.component.css'],
  providers: [MessageService]
})
export class AddOfficeComponent implements OnInit {

  cols: any[];

  @Input() officeInformation = {
    officeId: '',
    officeHeadId: 0,
    name: '',
    officeType: '',
    address: '',
    city: '',
    district: '',
    village: '',
    state: '',
    hamletNumber: '',
    neighbourhoodNumber: '',
    zipcode: '',
    compId: 100,
    updateBy: 111,
  };

  officeForm: FormGroup;
  submitted: boolean;

  showInformation = false;

  officeData: any = {};

  officeHeads: OfficeLookup[];

  officeTypes: OfficeLookup[];

  selectedOfficeHead: OfficeLookup;

  selectedOfficeType: OfficeLookup;

  msgs: Message[] = [];

  // autocomplete
  filteredParents: OfficeLookup[];

  filteredTypes: OfficeLookup[];
  filteredLocations = [];
  messages: Message[] = [];

  // secondFormGroup: FormGroup;
  // myForm: any;

  constructor(
    private officeService: OfficeService,
    private router: Router,
    private fb: FormBuilder,
    private messageService: MessageService,
    private zipcodeService: ZipCodeService,
  ) { }

  ngOnInit() {
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

    this.officeService.getOfficeHeadList()
      .subscribe(data => {
        this.officeHeads = data['lookup'];
        this.officeHeads.unshift({ uuid: '0', label: 'No Office Head', value: '0' });
        this.selectedOfficeHead = this.officeHeads[''];
      });

    this.officeService.getOfficeTypeList()
      .subscribe(data => {
        console.log(data['lookup']);
        this.officeTypes = data['lookup'];
        this.selectedOfficeType = this.officeTypes[''];
      });

    this.officeForm = this.fb.group({
      'offcName': new FormControl('', Validators.required),
      'offcType': new FormControl('', Validators.required),
      'address': new FormControl('', Validators.required),
      'village': new FormControl('', Validators.required),
      'district': new FormControl('', Validators.required),
      'city': new FormControl('', Validators.required),
      'state': new FormControl('', Validators.required),
      // 'zipcode': new FormControl('', Validators.required),
      'zipcode': new FormControl('', Validators.compose
        ([Validators.required, Validators.pattern('[0-9]*')])),
      'officeHeads': new FormControl('', Validators.required),
      'location': new FormControl(''),
    });
  }

  addOffice() {
    this.officeInformation.officeHeadId = +this.selectedOfficeHead['value'];
    this.officeInformation.officeType = this.selectedOfficeType['value'];
    this.officeService.addOffice(this.officeInformation).subscribe(data => {
      this.handleSuccess(data['response']);
      this.officeForm.reset();
    }, err => {
      this.handleError('Office Name was exist');
      // this.router.navigate(['/globalsetting/office/add']);
    });
  }

  addofficeNew() {
    this.officeInformation.officeHeadId = +this.selectedOfficeHead['value'];
    this.officeInformation.officeType = this.selectedOfficeType['value'];
    this.officeService.addOffice(this.officeInformation).subscribe(data => {
      this.handleSuccess(data['response']);
      this.officeForm.reset();
      this.router.navigate(['/globalsetting/office']);
    }, err => {
      this.handleError('Office Name was exist');
    });
  }

  getOfficeById() {
    if (this.selectedOfficeHead['value'] === '0') {
      this.showInformation = false;
      this.officeData = {};
    } else {
      this.showInformation = true;
      this.officeService.getOfficeByUUID(this.selectedOfficeHead['uuid'])
        .subscribe(data => this.officeData = data);
    }
  }

  filterParents(event) {
    const query = event.query;
    this.filteredParents = this.filterParent(query, this.officeHeads);
  }

  filterParent(query, officeHeads: any[]): any[] {
    // in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    const filtered: any[] = [];
    for (let i = 0; i < officeHeads.length; i++) {
      const selectedOfficeHead = officeHeads[i];
      if (selectedOfficeHead.label.toLowerCase().indexOf(query.toLowerCase()) === 0) {
        filtered.push(selectedOfficeHead);
      }
    }
    return filtered;
  }

  filterTypes(event) {
    const query = event.query;
    this.filteredTypes = this.filterType(query, this.officeTypes);
  }

  filterType(query, officeTypes: any[]): any[] {
    // in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    const filtered: any[] = [];
    for (let i = 0; i < officeTypes.length; i++) {
      const selectedOfficeType = officeTypes[i];
      if (selectedOfficeType.label.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(selectedOfficeType);
      }
    }
    return filtered;
  }

  filterLocations(event) {
    const query = event.query;
    this.zipcodeService.getLocation(query).subscribe(data => {
      this.filteredLocations = this.filterLocation(query, data['zipcode']);
    });
  }

  filterLocation(query: string, locations: any[]): any[] {
    const filtered: any[] = [];
    for (let i = 0; i < locations.length; i++) {
      const location = locations[i];
      if (location.location.toLowerCase().indexOf(query.toLocaleLowerCase()) > -1) {
        filtered.push(location);
      }
    }
    return filtered;
  }

  onSelectLocation() {
    const loc: string = this.officeForm.get('location').value['location'];
    const sLoc = loc.split(' , ');
    this.officeForm.patchValue({
      'village': sLoc[0],
      'district': sLoc[1],
      'city': sLoc[2],
      'state': sLoc[3],
      'zipcode': sLoc[4],
    });
  }

  showSuccess() {
    this.msgs = [];
    this.msgs.push({ severity: 'success', summary: 'Cendol gan!', detail: 'Data berhasil diperbaharui' });
  }

  handleSuccess(response: string) {
    this.messages.push({ severity: 'success', summary: 'Success', detail: response });
  }

  handleError(response: string) {
    this.messages = [];
    this.messages.push({ severity: 'error', summary: 'Error', detail: response });
  }
}
