export class Product {
    productCode: string;
    productName: string;
    productType: string;
    description: string;
    startDate: string;
    endDate: string;
    priority: number;
    isActive = true;
    parameter: Parameter[];
    feeCategoryName: string;
    feeDescription: string;
    isActiveFee: string;
    fee: Fee[];
    knockCategoryName: string;
    knockDescription: string;
    isActiveKnock: string;
    knock: Knockout[];
    documentCategoryName: string;
    documentDescription: string;
    isActiveDocument: string;
    document: Document[];
}

export class Parameter {
    minAmount: string;
    maxAmount: string;
    minTenor: string;
    maxTenor: string;
    interestRate: string;
}

export class Fee {
    typeName: string;
    chargingBasis: string;
    parameterType: string;
    value: string;
}

export class Knockout {
    attributeCriteria: string;
    oprator: string;
    value: string;
    nextStepTrue: number;
    nextStepFalse: number;
    priority: number;
}

export class Document {
    type: string;
    description: string;
    isMandatory: true
}