import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/models/global_set/employee/employee';
import { Office } from 'src/app/models/global_set/office/office';
import { EmployeeService } from 'src/app/services/global_set/employee/employee.service';
import { RoleService } from 'src/app/services/global_set/role/role.service';
import { RoleRequest } from 'src/app/models/global_set/role/role-request';
import { ProfileService } from 'src/app/services/global_set/profile/profile.service';
import { EmployeeRoleRequestParent, EmployeeRoleRequest } from 'src/app/models/global_set/employee/employee-role-request';
import { EmployeeOfficeRequestParent, EmployeeOfficeRequest } from 'src/app/models/global_set/employee/employee-office-request';
import { OfficeRequest } from 'src/app/models/global_set/office/office-request';
import { OfficeService } from 'src/app/services/global_set/office/office.service';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { EmployeeLookup } from 'src/app/models/global_set/employee/employee-lookup';
import { formatDate } from '@angular/common';
import { Message } from 'primeng/api';
import { ZipCodeService } from 'src/app/services/global_set/zipcode/zip-code.service';
import { Role } from 'src/app/models/global_set/role/role';
import { UserService } from 'src/app/services/global_set/user/user.service';

@Component({
    selector: 'app-user-details',
    templateUrl: './user-details.component.html',
    styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

    constructor(
        private router: Router,
        private actRoute: ActivatedRoute,
        private employeeService: EmployeeService,
        private profileService: ProfileService,
        private roleService: RoleService,
        private officeService: OfficeService,
        private zipcodeService: ZipCodeService,
        private userService: UserService,
        private fb: FormBuilder
    ) {
        this.createForm();
    }

    uuid = this.actRoute.snapshot.params['uuid'];
    blockSpace: RegExp = /[^\s]/;

    userLock = false;
    userStatus: string;
    birthDate: Date;
    imageUrl: string;
    rolesString: string;
    show: boolean;
    disabled = true;
    messages: Message[] = [];

    employee = new Employee;
    emplForm: FormGroup;

    sourceRoles: Role[] = [];
    roles: Role[] = [];
    sourceOffices: Office[] = [];
    offices: Office[] = [];

    selectedEmployeeType = new EmployeeLookup;
    selectedEmployeeStatus = new EmployeeLookup;
    selectedDirectSupervisor = new EmployeeLookup;

    employeeTypes: EmployeeLookup[];
    employeeStatuss: EmployeeLookup[];
    directSupervisors: EmployeeLookup[];

    filteredTypes = [];
    filteredStatuss = [];
    filteredSupervisors = [];
    filteredLocations = [];

    ngOnInit() {
        this.loadData();
    }

    onSend() {
        this.userService.changeBack(true);
        this.router.navigate(['/invitation/' + this.uuid]);
    }

    onResend() {
        this.router.navigate(['/reset-pass/' + this.uuid]);
    }

    createForm() {
        this.emplForm = this.fb.group({
            'employeeUserLogin': new FormControl({value: '', disabled: this.disabled}, Validators.required),
            'fullName': new FormControl({value: '', disabled: this.disabled}, Validators.required),
            'phone': new FormControl({value: '', disabled: this.disabled}, Validators.required),
            'email': new FormControl({value: '', disabled: this.disabled}, 
                Validators.compose([Validators.required, Validators.email])),
            'birthDate': new FormControl({value: new Date(), disabled: this.disabled}),
            'birthPlace': new FormControl({value: '', disabled: this.disabled}),
            'address': new FormControl({value: '', disabled: this.disabled}),
            'location': new FormControl({value: '', disabled: this.disabled}),
            'village': new FormControl({value: '', disabled: this.disabled}),
            'district': new FormControl({value: '', disabled: this.disabled}),
            'city': new FormControl({value: '', disabled: this.disabled}),
            'state': new FormControl({value: '', disabled: this.disabled}),
            'zipcode': new FormControl({value: '', disabled: this.disabled}),
            'employeeNo': new FormControl({value: '', disabled: true}, Validators.required),
            'employeeType': new FormControl({value: '', disabled: this.disabled}, Validators.required),
            'employmentStatus': new FormControl({value: '', disabled: this.disabled}, Validators.required),
            'workPosition': new FormControl({value: '', disabled: this.disabled}, Validators.required),
            'directSupervisor': new FormControl({value: '', disabled: this.disabled}, Validators.required),
            'division': new FormControl({value: '', disabled: this.disabled}),
            'department': new FormControl({value: '', disabled: this.disabled}),
            'workgroup': new FormControl({value: '', disabled: this.disabled}),
            'isEnabled': new FormControl({value: false, disabled: this.disabled}),
            'updatedBy': new FormControl(111),
        });
    }

    updateForm(empl: Employee, dis: boolean) {
        this.emplForm.reset({
            'employeeUserLogin': {value: empl.employeeUserLogin, disabled: dis},
            'fullName': {value: empl.fullName, disabled: dis},
            'phone': {value: empl.phone, disabled: dis},
            'email': {value: empl.email, disabled: dis},
            'birthDate': {value: new Date(empl.birthDate), disabled: dis},
            'birthPlace': {value: empl.birthPlace, disabled: dis},
            'address': {value: empl.address, disabled: dis},
            'location': {value: '', disabled: dis},
            'village': {value: empl.village, disabled: dis},
            'district': {value: empl.district, disabled: dis},
            'city': {value: empl.city, disabled: dis},
            'state': {value: empl.state, disabled: dis},
            'zipcode': {value: empl.zipcode, disabled: dis},
            'employeeNo': {value: empl.employeeNo, disabled: true},
            'employeeType': {value: this.selectedEmployeeType, disabled: dis},
            'employmentStatus': {value: this.selectedEmployeeStatus, disabled: dis},
            'workPosition': {value: empl.workPosition, disabled: dis},
            'directSupervisor': {value: this.selectedDirectSupervisor, disabled: dis},
            'division': {value: empl.division, disabled: dis},
            'department': {value: empl.department, disabled: dis},
            'workgroup': {value: empl.workgroup, disabled: dis},
            'isEnabled': {value: empl.isEnabled, disabled: dis},
            'updatedBy': 111,
        });
    }

    async loadData() {
        let empl = await this.loadEmployeeById();
        await this.getEmployeeTypeList(empl);
        await this.getEmployeeStatusList(empl);
        await this.getSupervisorList(empl);
        this.loadEmployeeRole();
        this.loadEmployeeOffice();
        this.getUserStatus(empl);
        this.updateForm(empl, this.disabled);
    }

    getUserStatus(empl: Employee) {
        this.employeeService.getUserStatus(this.uuid).subscribe(data => {
            if (empl.isEnabled === false) {
                this.userStatus = 'Disable'
            }
            else {
                if ((data['invitedDate'] !== undefined) && (data['activatedDate'] !== undefined)){
                    this.userStatus = 'Active'
                }
                else if (data['invitedDate'] !== undefined){
                    this.userStatus = 'Pending'
                }
                else if ((data['invitedDate'] === undefined) && (data['activatedDate'] === undefined)){
                    this.userStatus = 'Inactive'
                }
            }
        });
    }

    loadEmployeeById = () => new Promise<Employee>(res => {
        this.employeeService.getEmployeeById(this.uuid).subscribe((data: Employee) => {
            this.employee = data;
            this.birthDate = new Date(this.employee.birthDate);
            if (this.employee.image != undefined) {
                this.imageUrl = this.profileService.apiURL + 'files/' + this.employee.image;
            }
            res(this.employee);
        });
    });

    getEmployeeTypeList(empl: Employee) {
        return new Promise(res => {
            this.employeeService.getEmployeeTypeList().subscribe(data => {
                this.employeeTypes = data['lookup'];
                for (const i of this.employeeTypes) {
                    if (i.label === empl.employeeType) {
                        this.selectedEmployeeType = i;
                        res(this.selectedEmployeeType);
                        break;
                    }
                }
            });
        });
    }

    getEmployeeStatusList(empl: Employee) {
        return new Promise(res => {
            this.employeeService.getEmployeeStatusList().subscribe(data => {
                this.employeeStatuss = data['lookup'];
                for (const i of this.employeeStatuss) {
                    if (i.label === empl.employmentStatus) {
                        this.selectedEmployeeStatus = i;
                        res(this.selectedEmployeeStatus);
                        break;
                    }
                }
            });
        });
    }

    getSupervisorList(empl: Employee) {
        return new Promise(res => {
            this.employeeService.getSupervisorList().subscribe(data => {
                this.directSupervisors = data['lookup'];
                this.directSupervisors.unshift({ label: 'No Supervisor', value: '0' });
                if (empl.directSupervisor === undefined) {
                    this.selectedDirectSupervisor = this.directSupervisors[0];
                    res(this.selectedDirectSupervisor);
                }
                else {
                    for (const i of this.directSupervisors) {
                        if (i.label === empl.directSupervisor) {
                            this.selectedDirectSupervisor = i;
                            res(this.selectedDirectSupervisor);
                            break;
                        }
                    }
                }
            });
        });
    }

    loadEmployeeRole() {
        return this.employeeService.getEmployeeRole(this.uuid).subscribe(data => {
            if (data['role'] != undefined) {
                this.roles = data['role'];
            }
            this.rolesString = this.rolesToString(this.roles);
            this.loadRoleList();
        });
    }

    loadRoleList() {
        return this.roleService.getRoleList(new RoleRequest).subscribe(data => {
            this.sourceRoles = this.createSourceRoles(data['role'], this.roles);
        });
    }

    
    loadEmployeeOffice() {
        return this.employeeService.getEmployeeOffice(this.uuid).subscribe(data => {
            if (data['office'] != undefined) {
                this.offices = data['office'];
            }
            this.loadOfficeList();
        })
    }

    loadOfficeList() {
        return this.officeService.getOfficeList(new OfficeRequest).subscribe(data => {
            this.sourceOffices = this.createSourceOffices(data['office'], this.offices);
        });
    }

    assignEmployeeRole() {
        let oldRoles: Role[] = [];
        const reqBody = new EmployeeRoleRequestParent;
        let employeeRoleRequest = new EmployeeRoleRequest;
        const employeeRoleRequests = [];
        this.employeeService.getEmployeeRole(this.uuid).subscribe(data => {
            if (data['role'] != undefined) {
                oldRoles = data['role'];
            }
            for (const roleAdd of this.roles.filter(a => !oldRoles.some(b => a.roleId === b.roleId))) {
                employeeRoleRequest = new EmployeeRoleRequest;
                employeeRoleRequest.roleName = roleAdd.roleName;
                employeeRoleRequest.status = 'ADD';
                employeeRoleRequests.push(employeeRoleRequest);
            }
            for (const roleRemove of oldRoles.filter(a => !this.roles.some(b => a.roleId === b.roleId))) {
                employeeRoleRequest = new EmployeeRoleRequest;
                employeeRoleRequest.roleName = roleRemove.roleName;
                employeeRoleRequest.status = 'REMOVE';
                employeeRoleRequests.push(employeeRoleRequest);
            }
            reqBody.role = employeeRoleRequests;
            this.employeeService.assignEmployeeRole(this.uuid, reqBody).subscribe();
        });
    }

    createSourceRoles(roles: Role[], selectedRoles: Role[]) {
        if (selectedRoles === undefined) {
            return roles;
        } else if (selectedRoles.length === roles.length) {
            return [];
        } else {
            return roles.filter(a => !selectedRoles.some(b => a.roleId === b.roleId));
        }
    }

    rolesToString(roles: Role[]) {
        let res = '';
        for (const role of roles) {
            res = res.concat(role['roleName']);
            res = res.concat(', ');
        }
        return res.substr(0, res.length - 2);
    }

    assignEmployeeOffice() {
        let oldOffice: Office[] = [];
        const reqBody = new EmployeeOfficeRequestParent;
        let employeeOfficeRequest = new EmployeeOfficeRequest;
        const employeeOfficeRequests = [];
        this.employeeService.getEmployeeOffice(this.uuid).subscribe(data => {
            if (data['office'] != undefined) {
                oldOffice = data['office'];
            }
            for (const offcAdd of this.offices.filter(a => !oldOffice.some(b => a.officeId === b.officeId))) {
                employeeOfficeRequest = new EmployeeOfficeRequest;
                employeeOfficeRequest.officeName = offcAdd.name;
                employeeOfficeRequest.officeId = offcAdd.officeId;
                employeeOfficeRequest.status = 'ADD';
                employeeOfficeRequests.push(employeeOfficeRequest);
            }
            for (const offcRemove of oldOffice.filter(a => !this.offices.some(b => a.officeId === b.officeId))) {
                employeeOfficeRequest = new EmployeeOfficeRequest;
                employeeOfficeRequest.officeName = offcRemove.name;
                employeeOfficeRequest.officeId = offcRemove.officeId;
                employeeOfficeRequest.status = 'REMOVE';
                employeeOfficeRequests.push(employeeOfficeRequest);
            }
            reqBody.office = employeeOfficeRequests;
            this.employeeService.assignEmployeeOffice(this.uuid, reqBody).subscribe();
        });
    }

    createSourceOffices(offices: Office[], selectedOffices: Office[]) {
        if (selectedOffices === undefined) {
            return offices;
        } else if (selectedOffices.length === offices.length) {
            return [];
        } else {
            return offices.filter(a => !selectedOffices.some(b => a.officeId === b.officeId));
        }
    }

    updateEmployee() {
        this.emplForm.patchValue({
            'location': null,
            'employeeType': this.emplForm.get('employeeType').value['value'],
            'employmentStatus': this.emplForm.get('employmentStatus').value['value'],
            'directSupervisor': this.emplForm.get('directSupervisor').value['value'],
            'birthDate': formatDate(this.emplForm.get('birthDate').value, 'dd-MMM-yyyy', 'en-US'),
        })
        this.employeeService.updateEmployee(this.uuid, this.emplForm.value).subscribe(
            data => {
                this.handleSuccess(data.response);
                this.loadData();
            },
            err => {
                this.handleError(err.error.errorMessage);
            }
        );
    }

    updateIsEnabled() {
        this.employeeService.updateIsEnabled(
            this.uuid, 
            this.emplForm.get('isEnabled').value, 
            this.emplForm.get('updatedBy').value
            ).subscribe();
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
            if(selectedEmployeeType.label.toLowerCase().indexOf(query.toLowerCase()) == 0) {
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
            if(selectedEmployeeStatus.label.toLowerCase().indexOf(query.toLowerCase()) == 0) {
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
            if(location.location.toLowerCase().indexOf(query.toLocaleLowerCase()) > -1) {
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

    toggleDisabled() {
        this.disabled = !this.disabled;
        this.updateForm(this.employee, this.disabled);
    }

    handleSuccess(response: string) {
        this.userService.changeMessageInUser('success', response);
    }

    handleError(response: string) {
        this.userService.changeMessageInUser('error', response);
    }
}
