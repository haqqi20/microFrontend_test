import { Surveyor } from "./surveyor";

export class Supervisor {
    officeName: string;
    officeCode: string;
    fullName: string;
    npk: string;
    emailAddress: string;
    phoneNumber: string;
    startDate: string;
    endDate: string;
    jobPosition: string;
    directSupervisor: string;
    productType: string;
    remark: string;
    assignedSurveyor: Surveyor[];
    isActive: boolean;
    isUnlock: boolean;
    ResetPassword: boolean;
}