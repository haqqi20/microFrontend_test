import { RoleMenu } from "./role-menu";

export class Role {
    roleId: string;
    roleName: string;    
    description: string;
    menu: RoleMenu[];
    updatedBy: number = 100;
    compId: number = 100;
}
