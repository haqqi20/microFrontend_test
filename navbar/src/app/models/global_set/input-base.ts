export class InputBase<T> {
    id: number;
    value: T;
    key: string;
    label: string;
    required: boolean;
    order: number;
    controlType: string;
    valueType: string;

    constructor(options: {
        id?: number,
        value?: T,
        key?: string,
        label?: string,
        required?: boolean,
        order?: number,
        controlType?: string
        valueType?: string;
    } = {}) {
        this.id = options.id
        this.value = options.value;
        this.key = options.key || '';
        this.label = options.label || '';
        this.required = !!options.required;
        this.order = options.order === undefined ? 1 : options.order;
        this.controlType = options.controlType || '';
        this.valueType = options.valueType === undefined ? 'static' : options.valueType;
    }
}