import { Component, OnInit } from '@angular/core';
import { Scoring } from '@app/models/acquisition/scoring/Scoring';
import { ScoringService } from '@app/services/acquisition/scoring/scoring.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-scoring-detail',
  templateUrl: './scoring-detail.component.html',
  styleUrls: ['./scoring-detail.component.css']
})
export class ScoringDetailComponent implements OnInit {

  show: boolean;
  disabled = true;

  Model = new Scoring;
  uuid = this.actRoute.snapshot.params['uuid'];

  cols: any[];
  cols2: any[];
  cols3: any[];

  constructor(
    private location: Location,
    private scoringService: ScoringService,
    private actRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.scoringService.getScoringList().then(datas => {
      for (const data of datas) {
        if (data['customerId'] === this.uuid) {
          this.Model = data;
          console.log(this.Model);
          break;
        }
      }
    })

    this.cols = [
      { field: 'parameter', header: 'Parameter' },
      { field: 'requested', header: 'Requested' },
      { field: 'approved', header: 'Approved' }
    ]

    this.cols2 = [      
      { field: 'documentType', header: 'Document Type' },
      { field: 'description', header: 'Description' },
      { field: 'status', header: 'Status' },
      { field: 'detail', header: 'Detail' }    
    ]

    this.cols3 = [      
      { field: 'documentType2', header: 'Document Type' },
      { field: 'description2', header: 'Description' },
      { field: 'status2', header: 'Status' },
      { field: 'detail2', header: 'Detail' }    
    ]
  }

  toggleDisabled() {
    this.disabled = !this.disabled;
  }

  back() {
    this.location.back();
  }
}
