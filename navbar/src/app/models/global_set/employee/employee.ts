import { EmployeeOfficeRequest } from "./employee-office-request";
import { EmployeeRoleRequest } from "./employee-role-request";

export class Employee {
    employeeId: string;
    fullName: string;
    employeeUserLogin: string;
    workPosition: string;
    email: string;
    directSupervisor: string;
    employeeNo: string;
    employeeType: string;
    companyName: string;
    employmentStatus: string;
    department: string;
    division: string;
    workgroup: string;
    location: string;
    birthPlace: string;
    birthDate: string;
    phone: string;
    address: string;
    city: string;
    district: string;
    village: string;
    state: string;
    hamletNumber: string;
    neighbourhoodNumber: number;
    zipcode: string;
    image: string;
    isEnabled: boolean;
    compId: number = 100;
    office: EmployeeOfficeRequest[];
    role: EmployeeRoleRequest[];
    updatedBy: number = 100;
}
