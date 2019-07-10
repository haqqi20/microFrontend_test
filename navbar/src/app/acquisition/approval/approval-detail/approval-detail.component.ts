import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApprovalService } from '@app/services/acquisition/approval/approval.service';

@Component({
  selector: 'app-approval-detail',
  templateUrl: './approval-detail.component.html',
  styleUrls: ['./approval-detail.component.css']
})
export class ApprovalDetailComponent implements OnInit {

  appId = this.actRoute.snapshot.params['appId'];
  app = {};
  apps = [];

  cols = [];
  colQuestions = [];
  colDocs = [];

  disabled = true;
  show = false;

  constructor(
    private actRoute: ActivatedRoute,
    private approvalService: ApprovalService
  ) { }

  ngOnInit() {
    this.approvalService.currentApps.subscribe(apps => {
      for (const app of apps) {
        if (app['applicationNumber'] === this.appId) {
          this.apps = apps.filter(a => app !== a);
          this.app = app;
          break;
        }
      }
    });

    this.cols = [
      { header: 'Parameter', field: 'parameter' },
      { header: 'Requested', field: 'requested' },
      { header: 'Approved', field: 'approved' },
    ];

    this.colQuestions = [
      { header: 'Question', field: 'question' },
      { header: 'Result', field: 'result' }
    ];

    this.colDocs = [
      { header: 'Document Type', field: 'documentType' },
      { header: 'Description', field: 'description' },
      { header: 'Status', field: 'status' },
      { header: 'Detail', field: 'detail' }
    ];
  }

  onSubmitLoanDecision() {
    this.apps.push(this.app);
    this.approvalService.changeApps(this.apps);
  }
}
