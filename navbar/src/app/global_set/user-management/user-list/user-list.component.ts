import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/global_set/employee/employee.service';
import { GlobalSettingService } from 'src/app/services/global_set/global-setting.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

    employees = [];

    cols: any[];

    rowsOptions = [10, 50];

    rows = 10;

    constructor(
        private employeeService: EmployeeService,
        private globalService: GlobalSettingService,
        private router: Router
    ) { }

    ngOnInit() {
        this.employeeService.getEmployees().subscribe((data: []) => {
            this.employees = data;
        });

        this.globalService.getLookup('pagination.number').subscribe(data => {
            if (data !== undefined) {
                let paginations = [];
                for (const lookup of data) {
                    paginations.push(+lookup['lookupValue']);
                }
                this.rowsOptions = paginations.sort((a, b) => a-b);
                this.rows = this.rowsOptions[0];
            } else {
                this.rowsOptions.push(10);
            }
        })

        this.cols = [
            { field: 'fullName', header: 'Full Name', width: '23%' },
            { field: 'email', header: 'Email', width: '30%' },
            { field: 'role', header: 'Role', width: '20%' },
            { field: 'status', header: 'Status', width: '12%' },
        ];
    }

    getColor(): string {
        let rn = Math.floor((Math.random() * 5));
        let color = ['ui-button-success', 'ui-button-primary', 'ui-button-danger', 'ui-button-warning', 'ui-button-secondary'];

        return color[rn];
    }

    onItemClick(uuid: string) {
        this.router.navigateByUrl('globalsetting/user-management/details/' + uuid)
    }

    showAdd() {
        this.router.navigateByUrl('globalsetting/user-management/add')
    }

}
