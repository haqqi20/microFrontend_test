import { FeeParameter } from "./fee-parameter";

export class FeeProperty {
    paymentTermType: string;
    amountOfYear: number;
    feePropertyId: string;
    feeType: string;
    status = false;
    parameter: FeeParameter[];
    updatedBy = 111;
}
