export class EmployeeOfficeRequest {
    officeName: string;
    officeId: string;
    status: string;
}

export class EmployeeOfficeRequestParent {
    office: EmployeeOfficeRequest[];
    updatedBy: number = 100;
}