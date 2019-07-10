import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { Role } from 'src/app/models/global_set/role/role';
import { ActivatedRoute, Router } from '@angular/router';
import { RoleService } from 'src/app/services/global_set/role/role.service';
import { RoleMenu } from 'src/app/models/global_set/role/role-menu';
import { Message } from 'primeng/components/common/api';
import { MenuService } from 'src/app/services/global_set/menu/menu.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-details-role',
  templateUrl: './details-role.component.html',
  styleUrls: ['./details-role.component.css']
})
export class DetailsRoleComponent implements OnInit {

    roleForm: FormGroup;
    show: boolean;
    disabled = true;
    roleInformation: any = {};
    menu = new RoleMenu;

  toggleDisabled() {
    this.disabled = !this.disabled;    
    this.updateForm(this.roleInformation, this.disabled);
  }

  uuid = this.actRoute.snapshot.params['uuid'];
  role = new Role;
  roleData: Role = new Role;
  msgs: Message[] = [];
  menus = [];
  selected: any[][] = [[0,0,0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0,0]];

  array = [
    { label: 'None', value: '0' },
    { label: 'Create', value: '1' },
    { label: 'Read', value: '2' },
    { label: 'Update', value: '3' },
    { label: 'Delete', value: '4' },
  ]

  constructor(
    private actRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private roleService: RoleService,
    private menuService: MenuService,

    ) { this.createform(); }
    ngOnInit() {
        this.loadRole();
    }

    loadRole() {
        this.roleService.getRoleById(this.uuid).subscribe(data => {
            this.roleInformation = data;
            this.roleInformation.updatedBy = 100;
            this.updateForm(this.roleInformation, this.disabled);
            this.loadMenu();
        });
    }

    loadMenu() {
        this.menuService.getMenu()
            .subscribe(data => {
                this.menus = data['menus'];
                let i = 0;
                let j = 0;
                for (let menu of this.menus) {
                    j = 0;
                    menu['scope'] = this.array;
                    for (const child of menu['children']) {
                        child['scope'] = this.array;
                        for (const menuByRole of this.roleInformation['menu']) {
                            if (menuByRole['nameMenu'] === child['menu']) {
                                this.selected[i][j] = menuByRole['scope'];
                                break;
                            }
                        }
                        j++;
                    }
                    i++;
                }
            });
    }

    createform(){
        this.roleForm = this.fb.group({
            'roleName': new FormControl({value: '', disabled: this.disabled}, Validators.required),
            'description': new FormControl({value: '', disabled: this.disabled}, Validators.required),
            'menu': new FormControl(''),
            'updatedBy': new FormControl(100),
        });
    }

    updateForm(role: Role, dis: boolean){
        this.roleForm.reset({
            'roleName': {value: role.roleName, disabled: dis},
            'description': {value: role.description, disabled: dis},
            'menu': '',
            'updatedBy': 100,
        });
    }
    updateRole() {
        let menu = new RoleMenu;
        let menus = [];
        let i = 0;
        let j = 0;
        for (let menu of this.menus) {
          j = 0;
          menu['scope'] = this.array;
          for (const child of menu['children']) {
            child['scope'] = this.array;
            for (const menuByRole of this.roleInformation['menu']) {
              if (menuByRole['nameMenu'] === child['menu']) {
                this.selected[i][j] = menuByRole['scope'];
                break;
              }
            }
            j++;
          }
          i++;
        }
        this.roleForm.patchValue({'menu': menus});
        this.roleService.updateRole(this.uuid, this.roleForm.value).subscribe(data => {
                this.handleSuccess(data['response']);
                this.loadRole();
            },
            err => {
                this.handleError(err.error.errorMessage);
            })
    }

    handleSuccess(response: string) {
        this.msgs.push({ severity: 'success', summary: 'Success', detail: response });
    }

  handleError(response: string) {
    this.msgs = [];
    this.msgs.push({ severity: 'error', summary: 'Error', detail: response });
  }

}
