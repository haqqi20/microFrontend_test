import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from 'src/app/models/global_set/role/role';
import { Office } from 'src/app/models/global_set/office/office';
import { RoleService } from 'src/app/services/global_set/role/role.service';
import { OfficeService } from 'src/app/services/global_set/office/office.service';
import { OfficeRequest } from 'src/app/models/global_set/office/office-request';
import { EmployeeService } from 'src/app/services/global_set/employee/employee.service';
import { EmployeeRoleRequest } from 'src/app/models/global_set/employee/employee-role-request';
import { RoleRequest } from 'src/app/models/global_set/role/role-request';
import { Employee } from 'src/app/models/global_set/employee/employee';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { EmployeeLookup } from 'src/app/models/global_set/employee/employee-lookup';
import { ZipCodeService } from 'src/app/services/global_set/zipcode/zip-code.service';
import { formatDate } from '@angular/common';
import { EmployeeOfficeRequest } from 'src/app/models/global_set/employee/employee-office-request';
import { UserService } from 'src/app/services/global_set/user/user.service';
import { GlobalSettingService } from 'src/app/services/global_set/global-setting.service';
import { Lookup } from 'src/app/models/global_set/lookup';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
})
export class AddUserComponent implements OnInit {

    emplForm: FormGroup;

    constructor(
        private roleService: RoleService,
        private officeService: OfficeService,
        private employeeService: EmployeeService,
        private zipcodeService: ZipCodeService,
        private userService: UserService,
        private globalService: GlobalSettingService,
        private router: Router,
        private fb: FormBuilder,
    ) {}

    uuid = '';
    sourceRoles: Role[] = [];
    roles: Role[] = [];
    sourceOffices: Office[] = [];
    offices: Office[] = [];
    @Input() employeeData = new Employee;
    maxDate = new Date();

    blockSpace: RegExp = /[^\s]/; 

    employeeTypes: Lookup[];
    employeeStatuss: Lookup[];
    directSupervisors: EmployeeLookup[];

    filteredTypes = [];
    filteredStatuss = [];
    filteredSupervisors = [];
    filteredLocations = [];

    ngOnInit() {
        this.createForm();
        this.loadData();
        this.loadOfficeList();
        this.loadRoleList();
    }

    createForm() {
        this.maxDate.setDate(this.maxDate.getDate() - (365 * 17));
        this.emplForm = this.fb.group({
            'employeeUserLogin': new FormControl(this.employeeData.employeeUserLogin, Validators.required),
            'fullName': new FormControl(this.employeeData.fullName, Validators.required),
            'phone': new FormControl(this.employeeData.phone, Validators.required),
            'email': new FormControl(this.employeeData.email, 
                Validators.compose([Validators.required, Validators.email])),
            'birthDate': new FormControl(this.maxDate),
            'birthPlace': new FormControl(this.employeeData.birthPlace),
            'address': new FormControl(this.employeeData.address),
            'location': new FormControl(''),
            'village': new FormControl(this.employeeData.village),
            'district': new FormControl(this.employeeData.district),
            'city': new FormControl(this.employeeData.city),
            'state': new FormControl(this.employeeData.state),
            'zipcode': new FormControl(this.employeeData.zipcode),
            'employeeType': new FormControl(this.employeeData.employeeType, Validators.required),
            'employmentStatus': new FormControl(this.employeeData.employmentStatus, Validators.required),
            'workPosition': new FormControl(this.employeeData.workPosition, Validators.required),
            'directSupervisor': new FormControl(this.employeeData.directSupervisor, Validators.required),
            'division': new FormControl(this.employeeData.division),
            'department': new FormControl(this.employeeData.department),
            'workgroup': new FormControl(this.employeeData.workgroup),
            'office': new FormControl(this.employeeData.office),
            'role': new FormControl(this.employeeData.role),
            'isEnabled': new FormControl(true),
            'compId': new FormControl(100),
            'updatedBy': new FormControl(111),
        });
    }

    async loadData() {
        this.getEmployeeTypeList();
        this.getEmployeeStatusList();
        this.getSupervisorList();
    }

    getEmployeeTypeList() {
        return new Promise(res => {
            this.globalService.getLookup('Employee Type').subscribe((data: []) => {
                this.employeeTypes = data;
                res(this.employeeTypes);
            });
        });
    }

    getEmployeeStatusList() {
        return new Promise(res => {
            this.globalService.getLookup('Employee Status').subscribe((data: []) => {
                this.employeeStatuss = data;
                res(this.employeeStatuss);
            });
        });
    }

    getSupervisorList() {
        return new Promise(res => {
            this.employeeService.getSupervisorList().subscribe(data => {
                this.directSupervisors = data['lookup'];
                this.directSupervisors.unshift({ label: 'No Supervisor', value: '0' });
                res(this.directSupervisors);
            });
        });
    }

    loadRoleList() {
        return this.roleService.getRoleList(new RoleRequest).subscribe(data => {
            this.sourceRoles = data['role'];
        });
    }

    loadOfficeList() {
        return this.officeService.getOfficeList(new OfficeRequest).subscribe(data => {
            this.sourceOffices = data['office'];
        });
    }

    assignEmployeeRole() {
        let employeeRoleRequest = new EmployeeRoleRequest;
        let employeeRoleRequests = [];
        for (const addRole of this.roles) {
            employeeRoleRequest.roleName = addRole.roleName;
            employeeRoleRequest.status = "ADD"
            employeeRoleRequests.push(employeeRoleRequest);
        }
        return employeeRoleRequests;
    }

    //office
    assignEmployeeOffice() {
        let employeeOfficeRequest = new EmployeeOfficeRequest;
        const employeeOfficeRequests = [];
        for (const addOffice of this.offices) {
            employeeOfficeRequest.officeId = addOffice.officeId;
            employeeOfficeRequest.officeName = addOffice.name;
            employeeOfficeRequest.status = "ADD"
            employeeOfficeRequests.push(employeeOfficeRequest);
        }
        return employeeOfficeRequests;
    }

    addEmployee() {
        this.emplForm.patchValue({
            'location': null,
            'employeeType': this.emplForm.get('employeeType').value['lookupKey'],
            'employmentStatus': this.emplForm.get('employmentStatus').value['lookupKey'],
            'directSupervisor': this.emplForm.get('directSupervisor').value['value'],
            'birthDate': formatDate(this.emplForm.get('birthDate').value, 'dd-MMM-yyyy', 'en-US'),
            'office': this.assignEmployeeOffice(),
            'role': this.assignEmployeeRole(),
        })
        this.employeeService.addEmployee(this.emplForm.value).subscribe(
            data => {
                this.uuid = data.employeeId;
                this.router.navigateByUrl('invitation/' + this.uuid)
                this.handleSuccess(data.response);
                this.userService.changeBack(false);
            },
            err => {
                this.handleError(err.error.errorMessage);
            }
        );
    }

    filterTypes(event) {
        let query = event.query;
        this.filteredTypes = this.filterType(query, this.employeeTypes);
    }
      
    filterType(query: string, employeeTypes: any[]):any[] {
        //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
        let filtered : any[] = [];
        for(let i = 0; i < employeeTypes.length; i++) {
            let selectedEmployeeType = employeeTypes[i];
            if(selectedEmployeeType.lookupValue.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(selectedEmployeeType);
            }
        }
        return filtered;
    }

    filterStatuss(event) {
        let query = event.query;
        this.filteredStatuss = this.filterStatus(query, this.employeeStatuss);
    }
      
    filterStatus(query: string, employeeStatuss: any[]):any[] {
        //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
        let filtered : any[] = [];
        for(let i = 0; i < employeeStatuss.length; i++) {
            let selectedEmployeeStatus = employeeStatuss[i];
            if(selectedEmployeeStatus.lookupValue.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(selectedEmployeeStatus);
            }
        }
        return filtered;
    }

    filterSupervisors(event) {
        let query = event.query;
        this.filteredSupervisors = this.filterSupervisor(query, this.directSupervisors);
    }
      
    filterSupervisor(query: string, directSupervisors: any[]):any[] {
        //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
        let filtered : any[] = [];
        for(let i = 0; i < directSupervisors.length; i++) {
            let selectedDirectSupervisor = directSupervisors[i];
            if(selectedDirectSupervisor.label.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(selectedDirectSupervisor);
            }
        }
        return filtered;
    }

    filterLocations(event) {
        let query = event.query;
        this.zipcodeService.getLocation(query).subscribe(data => {
            this.filteredLocations = this.filterLocation(query, data['zipcode']);
        });
    }

    filterLocation(query: string, locations: any[]):any[] {
        //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
        let filtered : any[] = [];
        for(let i = 0; i < locations.length; i++) {
            let location = locations[i];
            if(location.location.toLowerCase().indexOf(query.toLowerCase()) > -1) {
                filtered.push(location);
            }
        }
        return filtered;
    }

    onSelectLocation() {
        let loc: string = this.emplForm.get('location').value['location'];
        let sLoc = loc.split(' , ');
        this.emplForm.patchValue({
            'village': sLoc[0],
            'district': sLoc[1],
            'city': sLoc[2],
            'state': sLoc[3],
            'zipcode': sLoc[4],
        });
    }

    cancel() {
        this.router.navigateByUrl('globalsetting/user-management')
    }

    handleSuccess(response: string) {
        this.userService.changeMessageInUser('success', response);
    }

    handleError(response: string) {
        this.userService.changeMessageInUser('error', response);
    }
}
