import { Question } from "./template-question";

export class Template {
    templateId: string;
    templeteName: string;
    description: string;
    productType: string;
    surveyType: string;
    isActive: boolean;
    surveyQuestion: Question[];
}