import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { DisbursementService } from '@app/services/acquisition/disbursement/disbursement.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-arcard',
  templateUrl: './arcard.component.html',
  styleUrls: ['./arcard.component.css']
})
export class ARCardComponent implements OnInit {

  dataAvailable = false;

  cols = [];

  appId = this.actRoute.snapshot.params['appId'];
  app: {};

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
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.http.get<any>('assets/demo/data/disbursement-data.json')
      .toPromise()
      .then(res => res.ar)
      .then(data => {
        for (const ar of data) {
          if (ar.noKontrak === this.appId) {
            this.app = ar;
            this.dataAvailable = true;
            break;
          }
        }
      });

    this.cols = [
      { header: 'Installment', field: 'angsuranKe' },
      { header: 'Due Date', field: 'tanggalJatuhTempo' },
      { header: 'Principal Balance', field: 'saldoPKK' },
      { header: 'Interest Balance', field: 'saldoBunga' }
    ]
  }

  previous() {
    this.location.back();
  }

}
