import { Component, OnInit, Input } from '@angular/core';
import { InputBase } from 'src/app/models/global_set/input-base';
import { FormGroup } from '@angular/forms';
import { InputControlService } from 'src/app/services/input-control.service';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css']
})
export class DynamicFormComponent implements OnInit {

  @Input() inputs: InputBase<any>[] = [];
  form: FormGroup;

  constructor(private ics: InputControlService) { }

  ngOnInit() {
    this.form = this.ics.toFormGroup(this.inputs);
    this.ics.changeForm(this.form);
  }

}
