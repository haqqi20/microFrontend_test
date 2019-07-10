import { Component, OnInit } from '@angular/core';
import { AddKnockoutService } from 'src/app/services/acquisition/knockout/add-knockout.service';
import { KnockoutList } from '@app/models/acquisition/knock-out/knockoutList';
import { Knockout } from '@app/models/acquisition/knock-out/knockout';

@Component({
  selector: 'app-knockout',
  templateUrl: './knockout.component.html',
  styleUrls: ['./knockout.component.css']
})
export class KnockoutComponent implements OnInit {

  cols: any[];
  knockoutList = [];
  knockList: KnockoutList = new KnockoutList;
  knocks: Knockout[] = [];

  constructor(
    private knockoutService: AddKnockoutService,
  ) { }

  ngOnInit() {
    this.cols = [
      { field: 'knockoutName', header: 'Knockout Name', width: '23%' },
      { field: 'description', header: 'Description', width: '28%' },
      { field: 'status', header: 'Is Active', width: '12%' },
    ];
    this.knockoutService.refreshNeeded$.subscribe(() => {
      this.getKnockList();
    });

    this.getKnockList();
  }

  private getKnockList() {
    this.knockoutService.getKnockoutList().subscribe((data) => {
      this.knocks = data['knockout'];
    });
  }
}
