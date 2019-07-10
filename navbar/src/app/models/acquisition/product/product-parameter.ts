export class Parameter {
    parmName: string;
    value: string;
}

export class GroupParameter {
    group: Parameter[];
}

export class ProductParameter {
    prodParm: GroupParameter[];
    updatedBy = 111;
}