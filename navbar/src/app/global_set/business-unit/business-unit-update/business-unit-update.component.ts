import { Component, OnInit } from '@angular/core';
import { Message } from 'primeng/api';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-business-unit-update',
  templateUrl: './business-unit-update.component.html',
  styleUrls: ['./business-unit-update.component.css']
})
export class BusinessUnitUpdateComponent implements OnInit {
  show: boolean;
  disabled = true;

  buType: SelectItem[];
  buStatus: SelectItem[];

  msgs: Message[] = [];

  constructor() {
    this.buType = [
      { label: '2R', value: { id: 1, name: '2R', code: '2R' } },
      { label: '4R', value: { id: 2, name: '4R', code: '4R' } },
    ];

    this.buStatus = [
      { label: 'New', value: { id: 1, name: 'New', code: 'New' } },
      { label: 'Old', value: { id: 2, name: 'Old', code: 'Old' } },
    ];
  }

  toggleDisabled() {
    this.disabled = !this.disabled;
  }

  ngOnInit() {
  }

  showSuccess() {
    this.msgs = [];
    this.msgs.push({ severity: 'success', summary: 'Cendol gan!', detail: 'Data berhasil diperbaharui' });
  }
}
