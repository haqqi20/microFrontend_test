import { InputBase } from "./input-base";

export class DropdownInput extends InputBase<string> {
  controlType = 'dropdown';
  options: { lookupKey: string, lookupValue: string }[] = [];
  filteredOptions = [];

  constructor(options: {} = {}) {
    super(options);
    this.options = options['options'] || [];
  }

  filterOptions(event) {
    let query = event.query;
    this.filteredOptions = this.filterOption(query, this.options);
  }

  filterOption(query: string, options: { lookupKey: string, lookupValue: string }[]): any[] {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtered: any[] = [];
    for (let i = 0; i < options.length; i++) {
      let selectedOption = options[i];
      if (selectedOption.lookupValue.toLowerCase().indexOf(query.toLowerCase()) > -1) {
        filtered.push(selectedOption);
      }
    }
    return filtered;
  }

}