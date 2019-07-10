export class EmployeeRoleRequest {
    roleName: string;
    status: string;
}

export class EmployeeRoleRequestParent {
    role: EmployeeRoleRequest[];
    updatedBy: number = 111;
}