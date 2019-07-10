import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { DisbursementService } from '@app/services/acquisition/disbursement/disbursement.service';
import { routerNgProbeToken } from '@angular/router/src/router_module';

@Component({
  selector: 'app-disbursement-detail',
  templateUrl: './disbursement-detail.component.html',
  styleUrls: ['./disbursement-detail.component.css']
})
export class DisbursementDetailComponent implements OnInit {

  dataAvailable = false;

  dealerId = this.actRoute.snapshot.params['dealerId'];
  dealer: {};
  dealers = [];

  amountOpt = {
    prefix: 'Rp',
    thousands: '.',
    decimal: ',',
    allowNegative: false,
    nullable: true
  };

  constructor(
    private location: Location,
    private router: Router,
    private actRoute: ActivatedRoute,
    private disbService: DisbursementService
  ) { }

  ngOnInit() {
    this.disbService.currentApps4.subscribe(dealers => {
      for (const dealer of dealers) {
        if (dealer['dealerId'] === this.dealerId) {
          this.dealer = dealer;
          this.dataAvailable = true;
          break;
        }
      }
    });

    this.disbService
  }

  viewAR(appId: string) {
    this.router.navigateByUrl('acquisition/disbursement/ar/' + appId);
  }

  previous() {
    this.disbService.changeIndexTab(3);
    this.location.back();
  }

}
