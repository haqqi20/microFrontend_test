import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from 'primeng/api';
import { Router } from '@angular/router';
import { DisbursementService } from '@app/services/acquisition/disbursement/disbursement.service';

@Component({
  selector: 'app-disbursement',
  templateUrl: './disbursement.component.html',
  styleUrls: ['./disbursement.component.css']
})
export class DisbursementComponent implements OnInit {

  index = 0;

  messages: Message[];

  checkDisb = false;

  dealerId = '';
  dealerName = '';
  dealerAddress = '';

  cols1 = [];
  cols2 = [];
  cols3 = [];
  cols4 = [];

  apps1 = [];
  apps2 = [];
  apps3 = [];
  apps4 = [];

  constructor(
    private http: HttpClient,
    private router: Router,
    private disbService: DisbursementService
  ) { }

  ngOnInit() {
    this.cols1 = [
      { header: 'Dealer ID', field: 'dealerId' },
      { header: 'Dealer Name', field: 'dealerName' },
      { header: 'Dealer Address', field: 'dealerAddress' },
    ];

    this.cols2 = [
      { header: 'Dealer ID', field: 'dealerId' },
      { header: 'Dealer Name', field: 'dealerName' },
      { header: 'Dealer Address', field: 'dealerAddress' },
      { header: 'PO Number', field: 'poNumber' },
      { header: 'PO Date', field: 'poDate' },
    ];

    this.cols3 = [
      { header: 'PO Number', field: 'poNumber' },
      { header: 'PO Date', field: 'poDate' },
      { header: 'Total Price', field: 'totalPrice' },
      { header: 'Invoice Number', field: 'invoiceNumber' },
      { header: 'Invoice Date', field: 'invoiceDate' },
      { header: 'Invoice Amount', field: 'invoiceAmount' },
    ];

    this.cols4 = [
      { header: 'PO Number', field: 'poNumber' },
      { header: 'Price', field: 'totalPrice' },
      { header: 'Invoice Number', field: 'invoiceNumber' },
      { header: 'Invoice Amount', field: 'invoiceAmount' },
      { header: 'Dealer ID', field: 'dealerId' },
      { header: 'Dealer Name', field: 'dealerName' },
    ];

    this.disbService.currentIndexTab.subscribe(data => this.index = data);
    
    this.disbService.currentApps1.subscribe(data => {
      this.apps1 = data;
    });

    this.disbService.currentApps2.subscribe(data => {
      this.apps2 = data;
    });

    this.disbService.currentApps4.subscribe(data => {
      this.apps4 = data;
    });
  }

  onItem1(dealerId: string) {
    this.router.navigateByUrl('acquisition/disbursement/generate-po/' + dealerId);
  }

  onItem2(dealerId: string) {
    this.router.navigateByUrl('acquisition/disbursement/po-detail/' + dealerId);
  }

  onItem3(dealerId: string) {
    this.router.navigateByUrl('acquisition/disbursement/invoice-detail/' + dealerId);
  }

  onItem4(dealerId: string) {
    this.router.navigateByUrl('acquisition/disbursement/detail/' + dealerId);
  }

  onSearchPO() {
    if (!(this.dealerId.trim() === '' && this.dealerName.trim() === '' && this.dealerAddress.trim() === '')) {
      this.apps3 = this.apps2.filter(app => 
        (this.dealerId.trim() !== '' && app.dealerId.toLowerCase().indexOf(this.dealerId.toLowerCase()) > -1) || 
        (this.dealerName.trim() !== '' && app.dealerName.toLowerCase().indexOf(this.dealerName.toLowerCase()) > -1) || 
        (this.dealerAddress.trim() !== '' && app.dealerAddress.toLowerCase().indexOf(this.dealerAddress.toLowerCase()) > -1));
    }
  }
}
