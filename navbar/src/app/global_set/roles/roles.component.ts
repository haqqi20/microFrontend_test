import { Component, OnInit } from '@angular/core';
import { RoleService } from 'src/app/services/global_set/role/role.service';
import { RoleRequest } from 'src/app/models/global_set/role/role-request';
import { EmployeeRequest } from 'src/app/models/global_set/employee/employee-request';
import { EmployeeService } from 'src/app/services/global_set/employee/employee.service';
import { RoleList } from 'src/app/models/global_set/role/role-list';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {

  roleRequest: RoleRequest = new RoleRequest;
  roles = [];
  cols: any[];
  roleList: RoleList = new RoleList;
  employeeRequest: EmployeeRequest = new EmployeeRequest;
  employees = [];
  constructor(
    private roleService: RoleService,
    private employeeService: EmployeeService,
  ) { }

  ngOnInit() {
        this.roleService.getRoleList(this.roleList).subscribe((data: []) => {
        this.roles = data['role'];
        });

        // this.employeeRequest.compId = 100;
        // this.employeeService.getEmployees().subscribe((data: []) => {
        //     this.employees = data;
        // });

        this.cols = [
          // { field: 'rowIndex', header: 'No.', width: '7%'},
          { field: 'roleName', header: 'Name'},
          { field: 'description', header: 'Description'},
          // { field: 'role', header: 'Role', width: '20%' },
          // { field: 'status', header: 'Status', width: '13%' },
      ];
  }

}
