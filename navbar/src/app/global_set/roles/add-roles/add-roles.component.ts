import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { Role } from 'src/app/models/global_set/role/role';
import { ActivatedRoute, Router } from '@angular/router';
import { RoleService } from 'src/app/services/global_set/role/role.service';

import { RoleMenu } from 'src/app/models/global_set/role/role-menu';
import { Message, ConfirmationService } from 'primeng/components/common/api';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MenuService } from 'src/app/services/global_set/menu/menu.service';
import { OfficeLookup } from 'src/app/models/global_set/office/office-lookup';
import { OfficeService } from 'src/app/services/global_set/office/office.service';


@Component({
  selector: 'app-add-roles',
  templateUrl: './add-roles.component.html',
  styleUrls: ['./add-roles.component.css'],
  providers: [ConfirmationService]
})

export class AddRolesComponent implements OnInit {

  roleData: Role = new Role;
  msgs: Message[] = [];
  roleForm: FormGroup;
  menus = [];
  selected: any[][] = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];
  menus2: RoleMenu = new RoleMenu;
  menus3: RoleMenu;
  menuData: any = {};
  showInformation: boolean = false;
  roleInformation: any = {};

  array = [
    { label: 'None', value: '0' },
    { label: 'Create', value: '1' },
    { label: 'Read', value: '2' },
    { label: 'Update', value: '3' },
    { label: 'Delete', value: '4' },
  ]

  constructor(
    private router: Router,
    private roleService: RoleService,

    private fb: FormBuilder,
    private menuService: MenuService,
    private officeService: OfficeService,
    private confirmationService: ConfirmationService,
  ) {
    this.createForm();
   }

  ngOnInit() {
    this.menuService.getMenu()
      .subscribe(data => {
        this.menus = data['menus'];
        for (const menu of this.menus) {
          menu['scope'] = this.array;
          for (const child of menu['children']) {
            child['scope'] = this.array;
          }
        }
      });
  }

  createForm() {
    this.roleForm = this.fb.group({
      'roleName': new FormControl('', Validators.required),
      'description': new FormControl('', Validators.required),
    });
  }

  updateForm(role: Role) {
    this.roleForm.reset({
      'roleName': { value: role.roleName},
      'description': { value: role.description},
    });
  }
  cancelAdd() {
    this.updateForm(this.roleInformation);
  }

  addRole() {
    let menu = new RoleMenu;
    const menus = [];
    let i = 0;
    let j = 0;
    for (const menuNow of this.menus) {
      j = 0;
      for (const child of menuNow['children']) {
        if (this.selected[i][j] !== 0) {
          menu = new RoleMenu;
          menu.nameMenu = child['menu'];
          menu.scope = this.selected[i][j];
          menus.push(menu);
        }
        j++;
      }
      i++;
    }
    this.roleData.menu = menus;
    this.roleService.addRole(this.roleData).subscribe(data => {
      this.handleSuccess(data['response']);
      this.router.navigate(['globalsetting/roles'])
      console.log(data);
    },
      err => {
        this.handleError(err.error.errorMessage);
      });
  }

  addRoleNew() {
    let menu = new RoleMenu;
    const menus = [];
    let i = 0;
    let j = 0;
    for (const menuNow of this.menus) {
      j = 0;
      for (const child of menuNow['children']) {
        if (this.selected[i][j] !== 0) {
          menu = new RoleMenu;
          menu.nameMenu = child['menu'];
          menu.scope = this.selected[i][j];
          menus.push(menu);
        }
        j++;
      }
      i++;
    }
    this.roleData.menu = menus;
    this.roleService.addRole(this.roleData).subscribe(data => {
      this.handleSuccess(data['response']);
      console.log(data);
      this.router.navigate(['/office/add'])
    },
      err => {
        this.handleError(err.error.errorMessage);
      });
  }


  handleSuccess(response: string) {
    this.msgs.push({ severity: 'success', summary: 'Success', detail: response });
  }

  handleError(response: string) {
    this.msgs = [];
    this.msgs.push({ severity: 'error', summary: 'Error', detail: response });
  }

  reset() {
    this.roleForm.reset();
  }

  confirm1() {
    this.confirmationService.confirm({
        message: 'Are you sure that you want to proceed?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.router.navigate(['/globalsetting/roles']);
        },
        reject: () => {
            this.msgs = [{severity: 'info', summary: 'Rejected', detail: 'You have rejected'}];
        }
    });
}
}
