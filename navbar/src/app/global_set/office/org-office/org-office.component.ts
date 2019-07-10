import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import { OfficeService } from 'src/app/services/global_set/office/office.service';
import {MessageService, TreeNode} from 'primeng/api';

@Component({
  selector: 'app-org-office',
  templateUrl: './org-office.component.html',
  styleUrls: ['./org-office.component.css'],
  providers: [MessageService],
  encapsulation: ViewEncapsulation.None
})
export class OrgOfficeComponent implements OnInit {

  data: TreeNode[];

  selectedNode: TreeNode;

  name: string;

  constructor(private officeService: OfficeService, private messageService: MessageService) { }

  ngOnInit() {
    this.officeService.getOfficeChart().subscribe(data => {
      this.data = data['office'];
    });
  }
    onNodeSelect(event) {
        this.messageService.add({severity: 'success', summary: 'Node Selected', detail: event.node.label});
    }

}
