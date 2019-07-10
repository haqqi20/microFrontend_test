import { FeeProperty } from "./fee-property";

export class Fee {
    feeName: string;
    description: string;
    status = false;
    properties: FeeProperty[];
    updatedBy = 111;
}
