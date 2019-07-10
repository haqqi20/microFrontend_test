import { Component, OnInit } from '@angular/core';
import { DisbursementService } from '@app/services/acquisition/disbursement/disbursement.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-po-detail',
  templateUrl: './po-detail.component.html',
  styleUrls: ['./po-detail.component.css']
})
export class PoDetailComponent implements OnInit {

  dataAvailable = false;

  dealerId = this.actRoute.snapshot.params['dealerId'];
  dealer: {};
  
  amountOpt = {
    prefix: 'Rp',
    thousands: '.',
    decimal: ',',
    allowNegative: false,
    nullable: true
  };

  constructor(
    private location: Location,
    private actRoute: ActivatedRoute,
    private disbService: DisbursementService
  ) { }

  ngOnInit() {
    this.disbService.currentApps2.subscribe(dealers => {
      for (const dealer of dealers) {
        if (dealer['dealerId'] === this.dealerId) {
          this.dealer = dealer;
          this.dataAvailable = true;
          break;
        }
      }
    });
  }

  previous() {
    this.disbService.changeIndexTab(1);
    this.location.back();
  }
}
