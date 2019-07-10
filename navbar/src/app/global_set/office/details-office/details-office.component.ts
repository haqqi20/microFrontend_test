import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MessageService, TreeNode, Message } from 'primeng/api';
import { OfficeService } from '../../../services/global_set/office/office.service';
import { ActivatedRoute, Router } from '@angular/router';
import { OfficeLookup } from '../../../models/global_set/office/office-lookup';
import { OfficeList } from '../../../models/global_set/office/officelist';
import { Office } from '../../../models/global_set/office/office';
import { Employee } from '../../../models/global_set/employee/employee';
import { MenuItem, SelectItem } from 'primeng/api';
import { EmployeeRequest } from 'src/app/models/global_set/employee/employee-request';
import { EmployeeService } from 'src/app/services/global_set/employee/employee.service';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { ZipCodeService } from '../../../services/global_set/zipcode/zip-code.service';

@Component({
    selector: 'app-details-office',
    templateUrl: './details-office.component.html',
    styleUrls: ['./details-office.component.css'],
    providers: [MessageService],
    encapsulation: ViewEncapsulation.None
})
export class DetailsOfficeComponent implements OnInit {

    show: boolean;
    disabled = true;

    data: TreeNode[];
    officeData: any = {};
    selectedNode: TreeNode;
    uuid = this.actRoute.snapshot.params['uuid'];
    name: string;
    // update
    cols: any[];
    msgs: Message[] = [];

    officeHead: SelectItem[];
    showInformation = false;
    officeInformation: any = {};
    officeHeads: OfficeLookup[];
    officeTypes: OfficeLookup[];
    selectedOfficeHead: OfficeLookup;
    selectedOfficeType: OfficeLookup;
    items: MenuItem[];
    home: MenuItem;

    // office list
    officeList: OfficeList = new OfficeList;
    employee: Employee[];
    selectedCar: Office;
    ofc = new Office;
    employeeRequest: EmployeeRequest = new EmployeeRequest;
    roles: any[] = [];
    listRoles: any[] = [];
    messages: Message[] = [];

    filteredLocations = [];
    ofcForm: FormGroup;

    constructor(
        private officeService: OfficeService,
        private messageService: MessageService,
        private actRoute: ActivatedRoute,
        private router: Router,
        private employeeService: EmployeeService,
        private zipcodeService: ZipCodeService,
        private fb: FormBuilder
    ) { this.createForm(); }

    ngOnInit() {
        // this.officeService.getOfficeChartByUUID(this.uuid).subscribe(data => {
        //     this.data = data['office'];
        // });
        // this.employeeRequest.compId = 100;
        this.employeeService.getEmployeeList(this.employeeRequest).subscribe(data => {
            this.employee = data['employee'];
        });
        this.cols = [
            // { field: 'no', header: 'No.', width: '7%' },
            { field: 'employeeNo', header: 'Employee Number' },
            { field: 'fullName', header: 'Name' },
            { field: 'workPosition', header: 'Job Entitlement' },
            { field: 'employmentStatus', header: 'Status' },
            { field: 'employeeType', header: 'Employee Type' },
        ];

        this.items = [
            { label: 'Global Setting' },
            { label: 'Office List' },
            { label: 'Office Information' },
        ];

        this.home = { icon: 'pi pi-home' };
        this.officeHead = [
            { label: 'All Office', value: null },
            { label: 'HQ Office', value: 'HQ Office' },
            { label: 'Branch', value: 'Branch' },
            { label: 'Factory', value: 'Factory' },
            { label: 'Director', value: 'Director' },
            { label: 'Booth', value: 'Booth' },
        ];

        this.loadOffice();

        this.officeService.getOfficeEmployee(this.uuid).subscribe(data => {
            this.employee = data['employee'];
        });
    }

    async loadOffice() {
        this.officeService.getOfficeByUUID(this.uuid).subscribe(data => {
            this.officeInformation = data;
            this.officeInformation.updateBy = 111;
            this.getOfficeHeadList();
            this.getOfficeTypeList();
            this.updateForm(this.officeInformation, this.disabled);
        });
        this.officeService.getOfficeChartByUUID(this.uuid).subscribe(data => {
            this.data = data['office'];
            // this.officeInformation = data;
        });
    }

    createForm() {
        this.ofcForm = this.fb.group({
            'name': new FormControl({ value: '', disabled: this.disabled }, Validators.required),
            'officeType': new FormControl({ value: '', disabled: this.disabled }, Validators.required),
            'address': new FormControl({ value: '', disabled: this.disabled }, Validators.required),
            'village': new FormControl({ value: '', disabled: this.disabled }, Validators.required),
            'district': new FormControl({ value: new Date(), disabled: this.disabled }, Validators.required),
            'city': new FormControl({ value: '', disabled: this.disabled }, Validators.required),
            'state': new FormControl({ value: '', disabled: this.disabled }, Validators.required),
            'zipcode': new FormControl({ value: '', disabled: this.disabled }, Validators.compose
                ([Validators.required, Validators.pattern('[0-9]*')])),
            'officeHeadId': new FormControl({ value: '', disabled: this.disabled }),
            'location': new FormControl({ value: '', disabled: this.disabled }),
            'updateBy': new FormControl(111),
        });
    }
    updateForm(ofc: Office, dis: boolean) {
        this.ofcForm.reset({
            'name': { value: ofc.name, disabled: dis },
            'officeType': { value: this.selectedOfficeType, disabled: dis },
            'address': { value: ofc.address, disabled: dis },
            'village': { value: ofc.village, disabled: dis },
            'district': { value: ofc.district, disabled: dis },
            'city': { value: ofc.city, disabled: dis },
            'state': { value: ofc.state, disabled: dis },
            'zipcode': { value: ofc.zipcode, disabled: dis },
            'officeHeadId': { value: this.selectedOfficeHead, disabled: dis },
            'location': { value: '', disabled: dis },
            'updateBy': 111,
        });
    }
    toggleDisabled() {
        this.disabled = !this.disabled;
        this.updateForm(this.officeInformation, this.disabled);
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
                this.officeHeads.unshift({ uuid: '0', label: 'No Office Head', value: '0' });
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
        this.ofcForm.patchValue({ 'officeHeadId': this.ofcForm.get('officeHeadId').value['value'] });
        this.ofcForm.patchValue({ 'officeType': this.ofcForm.get('officeType').value['value'] });
        this.officeInformation.officeHeadId = +this.selectedOfficeHead['value'];
        this.officeInformation.officeType = this.selectedOfficeType['value'];
        console.log(this.ofcForm.get('name').value);
        // if (window.confirm('Are you sure, you want to update?')) {
        this.officeService.updateOffice(this.uuid, this.ofcForm.value).subscribe(data => {
            // this.officeService.handleSuccess(data);
            this.handleSuccess(data['response']);
            // this.router.navigate(['/office']);
            this.loadOffice();
        },
            err => {
                this.handleError(err.error.errorMessage);
                this.loadOffice();
            });
        // }
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
        const loc: string = this.ofcForm.get('location').value['location'];
        const sLoc = loc.split(' , ');
        this.ofcForm.patchValue({
            'village': sLoc[0],
            'district': sLoc[1],
            'city': sLoc[2],
            'state': sLoc[3],
            'zipcode': sLoc[4],
        });
    }
    getOfficeById() {
        if ((this.selectedOfficeHead['value'] === '0') || (this.selectedOfficeHead['label'] === this.officeInformation.name)) {
            this.showInformation = false;
            this.officeData = {};
        } else {
            this.showInformation = true;
            this.officeService.getOfficeByUUID(this.selectedOfficeHead['uuid'])
                .subscribe(data => this.officeData = data);
        }
    }
    onNodeSelect(event) {
        this.messageService.add({ severity: 'success', summary: 'Node Selected', detail: event.node.label });
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
