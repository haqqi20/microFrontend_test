import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DisbursementService } from '@app/services/acquisition/disbursement/disbursement.service';
import { formatDate, Location } from '@angular/common';

@Component({
  selector: 'app-generate-po',
  templateUrl: './generate-po.component.html',
  styleUrls: ['./generate-po.component.css']
})
export class GeneratePOComponent implements OnInit {

  dataAvailable = false;

  dealerId = this.actRoute.snapshot.params['dealerId'];
  dealer: {};
  dealer2: {};
  dealers = [];
  dealers2 = [];
  // dealers3 = [];

  cols = [];
  selectedApps = [];

  constructor(
    private location: Location,
    private actRoute: ActivatedRoute,
    private disbService: DisbursementService
  ) { }

  ngOnInit() {
    this.cols = [
      { header: 'Application Number', field: 'applicationNumber' },
      { header: 'Approval Date', field: 'approvalDate' },
      { header: 'Product', field: 'product' },
      { header: 'Unit', field: 'unit' },
      { header: 'Price', field: 'totalProductPrice' },
    ];

    this.disbService.currentApps1.subscribe(dealers => {
      this.dealers = dealers;
      for (const dealer of dealers) {
        if (dealer['dealerId'] === this.dealerId) {
          this.dealers = this.dealers.filter(a => dealer !== a);

          this.dealer = {
            dealerId: dealer.dealerId,
            dealerName: dealer.dealerName,
            dealerAddress: dealer.dealerAddress,
            poNumber: dealer.poNumber,
            poDate: dealer.poDate,
            applicationList: dealer.applicationList
          }

          this.dealer2 = {
            dealerId: dealer.dealerId,
            dealerName: dealer.dealerName,
            dealerAddress: dealer.dealerAddress,
            poNumber: dealer.poNumber,
            poDate: dealer.poDate,
          }
          this.dataAvailable = true;
          break;
        }
      }
    });

    this.disbService.currentApps2.subscribe(dealers => this.dealers2 = dealers);
    // this.disbService.currentApps3.subscribe(dealers => this.dealers3 = dealers);
  }

  generatePO() {
    let apps1 = this.dealer['applicationList'].filter(app => !this.selectedApps.includes(app.applicationNumber));
    let apps2 = this.dealer['applicationList'].filter(app => this.selectedApps.includes(app.applicationNumber));

    let totalPrice = 0;
    for (const app of apps2) {
      totalPrice = totalPrice + (+app.price);
    }

    this.dealer['applicationList'] = apps1;
    this.dealers.push(this.dealer);

    this.dealer2['applicationList'] = apps2;
    this.dealer2['poDate'] = formatDate(new Date, 'dd-MMM-yyyy', 'en-US');
    this.dealer2['totalPrice'] = totalPrice;
    this.dealers2.push(this.dealer2);

    this.disbService.changeApps1(this.dealers);
    this.disbService.changeApps2(this.dealers2);

    this.disbService.changeIndexTab(0);

    this.location.back();
  }

  cancel() {
    this.dealers.push(this.dealer);
    this.disbService.changeApps1(this.dealers);

    this.disbService.changeIndexTab(0);
    
    this.location.back();
  }
}
