import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DisbursementService } from '@app/services/acquisition/disbursement/disbursement.service';
import { Location, formatDate } from '@angular/common';

@Component({
  selector: 'app-invoice-detail',
  templateUrl: './invoice-detail.component.html',
  styleUrls: ['./invoice-detail.component.css']
})
export class InvoiceDetailComponent implements OnInit {

  dataAvailable = false;

  dealerId = this.actRoute.snapshot.params['dealerId'];
  dealer: {};
  dealers = [];
  
  invoiceDate = new Date;

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
      this.dealers = dealers;
      for (const dealer of dealers) {
        if (dealer['dealerId'] === this.dealerId) {
          this.dealers = this.dealers.filter(a => dealer !== a);
          this.dealer = dealer;
          this.dataAvailable = true;
          break;
        }
      }
    });
  }

  submitInvoice() {
    this.dealer['invoiceDate'] = formatDate(this.invoiceDate, 'dd-MMM-yyy', 'en-US');
    this.dealers.push(this.dealer);
    let dealers = this.dealers;

    this.disbService.changeApps2(this.dealers);
    this.disbService.changeApps4(dealers);

    this.disbService.changeIndexTab(2);
    this.location.back();
  }

  cancel() {
    this.dealer['invoiceNumber'] = '';
    this.dealer['invoiceDate'] = '';
    this.dealer['invoiceAmount'] = '';
    this.dealers.push(this.dealer);

    this.disbService.changeIndexTab(2);
    this.location.back();
  }
}
