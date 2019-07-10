import { Attribute } from "./attribute";

export class DocumentModel{
    docuCateId : string;
    docuCateName : string;
    description : string;
    isActive : boolean;
    documentAttribute : Attribute[];
    updatedBy: number = 100;
}