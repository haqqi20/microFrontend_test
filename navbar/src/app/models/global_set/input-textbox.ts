import { InputBase } from "./input-base";

export class TextboxInput extends InputBase<string> {
  controlType = 'textbox';
  
  currencyOptions = {
    prefix: '',
    thousands: '.',
    decimal: ',',
    allowNegative: false,
    nullable: true
  };

  type: string;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
  }

}