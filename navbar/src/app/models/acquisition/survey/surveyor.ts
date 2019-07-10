import { SurveyorPlace } from "./surveyor-place";

export class Surveyor {
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
        limitSurveyPerDay: string;
        limitSurveyPerMonth: string;
        productType: string;
        remark: string;
        location: SurveyorPlace[];
        isActive: boolean;
        isUnlock: boolean;
        ResetPassword: boolean;
}