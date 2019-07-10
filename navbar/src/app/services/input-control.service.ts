import { Injectable } from '@angular/core';
import { InputBase } from '../models/global_set/input-base';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InputControlService {
  private formSource = new BehaviorSubject(null);
  currentForm = this.formSource.asObservable();

  constructor() { }

  changeForm(form: FormGroup) {
    this.formSource.next(form);
  }

  toFormGroup(inputs: InputBase<any>[]) {
    let group: any = {};

    inputs.forEach(input => {
      group[input.key] = input.required ? new FormControl(input.value || '', Validators.required)
        : new FormControl(input.value || '');
    });
    return new FormGroup(group);
  }
}
