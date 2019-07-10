import { Component, OnInit } from '@angular/core';
import { Message, SelectItem } from 'primeng/api';
import { ProfileService } from 'src/app/services/global_set/profile/profile.service';
import { Employee } from 'src/app/models/global_set/employee/employee';
import { Company } from 'src/app/models/global_set/company/company';
import { Office } from 'src/app/models/global_set/office/office';
import { Role } from 'src/app/models/global_set/role/role';
import { EmployeeService } from 'src/app/services/global_set/employee/employee.service';
import { ZipCodeService } from 'src/app/services/global_set/zipcode/zip-code.service';
import { formatDate } from '@angular/common';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: [`./profile.component.css`],
})
export class ProfileComponent implements OnInit {

    constructor(
        private profileService: ProfileService,
        private employeeService: EmployeeService,
        private zipcodeService: ZipCodeService
    ) { }

    messages: Message[] = [];
    // disabled input
    show = false;
    disabled = true;

    uuid = 'e25f66d9-16e2-4b1a-bff4-68fe5e93f4f9';

    birthDate = new Date;
    userStatus: string;

    employee = new Employee;
    company = new Company;
    roles: Role[] = [];
    offices: Office[];
    
    rolesString: string;

    imageUrl: string;

    fileToUpload: File = null;

    selectedLocation: SelectItem;
    filteredLocations = [];

    toggleDisabled() {
        this.disabled = !this.disabled;
    }

    ngOnInit() {
        this.loadEmployeeById();
        this.loadEmployeeRole();
        this.loadEmployeeCompany();
        this.loadEmployeeOffice();
    }

    loadEmployeeById() {
        return this.employeeService.getEmployeeById(this.uuid).subscribe((data: Employee) => {
            this.employee = data;
            this.birthDate = new Date(this.employee.birthDate);
            if (this.employee.image != undefined) {
                this.imageUrl = 'http://localhost:8092/files/' + this.employee.image;
                this.profileService.changeAvatarTopBar(this.imageUrl);
            }
            this.getUserStatus(this.employee)
        });
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

    loadEmployeeRole() {
        return this.employeeService.getEmployeeRole(this.uuid).subscribe(data => {
            if (data['role'] !== undefined) {
                this.roles = data['role'];
                this.rolesString = this.rolesToString(this.roles);
            }
        })
    }
  
    loadEmployeeCompany() {
        return this.employeeService.getEmployeeCompany(this.uuid).subscribe((data: Company) => {
            this.company = data;
        })
    }

    loadEmployeeOffice() {
        return this.employeeService.getEmployeeOffice(this.uuid).subscribe(data => {
            if (data['office'] !== undefined) {
                this.offices = data['office'];
            }
        })
    }

    updateProfile() {
        this.employee.updatedBy = 111;
        this.employee.birthDate = formatDate(this.birthDate, 'dd-MMM-yyyy', 'en-US');
        this.profileService.updateProfile(this.uuid, this.employee).subscribe(
            data => {
                this.handleSuccess(data.response);
            },
            err => {
                this.handleError(err.error.errorMessage);
            }
        );
    }

    handleFileInput(file: FileList) {
        this.fileToUpload = file.item(0);
    
        this.profileService.uploadAvatar(this.uuid, '111', this.fileToUpload).subscribe(
            data => {
                this.imageUrl = 'http://localhost:8092/files/' + data.imageName;
                this.profileService.changeAvatarTopBar(this.imageUrl);
                this.handleSuccess(data.response);
            },
            err => {
                this.handleError("Failed change photo");
            }
        );
    }
    
    deleteAvatar() {
        this.profileService.deleteAvatar(this.uuid, 111).subscribe(
            data => {
                this.imageUrl = this.employee.fullName;
                this.profileService.changeAvatarTopBar(this.employee.fullName);
                this.handleSuccess(data.response);
            },
            err => {
                this.handleError(err.error.errorMessage);
            }
        );
    }

    rolesToString(roles: Role[]) {
        let res = '';
        for (const role of roles) {
            res = res.concat(role['roleName']);
            res = res.concat(', ');
        }
        return res.substr(0, res.length-2);
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
        let sLoc = this.selectedLocation['location'].split(' , ');
        this.employee.village = sLoc[0];
        this.employee.district = sLoc[1];
        this.employee.city = sLoc[2];
        this.employee.state = sLoc[3];
        this.employee.zipcode = sLoc[4];
    }

    handleSuccess(response: string) {
        this.messages = [];
        this.messages.push({ severity: 'success', summary: 'Success', detail: response });
    }

    handleError(response: string) {
        this.messages = [];
        this.messages.push({ severity: 'error', summary: 'Error', detail: response });
    }

}

