import { Component, OnInit } from '@angular/core';
import { DocumentService } from 'src/app/services/acquisition/document/document.service';
import { DocumentModel } from 'src/app/models/document/document';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
})
export class DocumentComponent implements OnInit {

  cols: any[];
  docs: DocumentModel[] = [];

  constructor(
    private docService: DocumentService,
  ) { }

  ngOnInit() {
    this.cols = [
      { field: 'docuCateName', header: 'Document Name', width: '23%' },
      { field: 'description', header: 'Description', width: '28%' },
      { field: 'isActive', header: 'Active', width: '12%' }
    ];

    this.docService.refreshNeeded$.subscribe(() => {
      this.getDocList();
    });

    this.getDocList();
  }


  private getDocList() {
    this.docService.getDocList().subscribe((data) => {
      this.docs = data['documentCategory'];
    });
  }
}