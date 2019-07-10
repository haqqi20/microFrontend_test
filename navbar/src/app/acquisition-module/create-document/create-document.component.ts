import { Component, OnInit } from '@angular/core';
import { Message, MessageService, SelectItem, ConfirmationService, SelectItemGroup } from 'primeng/components/common/api';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { DocumentModel } from 'src/app/models/document/document';
import { Attribute } from 'src/app/models/document/attribute';
import { DocumentLookup } from 'src/app/models/document/document-lookup';
import { DocumentService } from 'src/app/services/acquisition/document/document.service';

@Component({
  selector: 'app-create-document',
  templateUrl: './create-document.component.html',
  providers: [MessageService, ConfirmationService],
})
export class CreateDocumentComponent implements OnInit {
  checked: boolean = true;
  cols: any[];
  msgs: Message[] = [];
  projectForm: FormGroup;
  knockForm: FormGroup;
  knockForm1: FormGroup;
  selectedAtt: Attribute;
  attribute: Attribute[] = [];
  docLookup: DocumentLookup[];
  selectedLookup: DocumentLookup;
  filteredLookup: DocumentLookup[];

  constructor(
    private docService: DocumentService,
    private confirmationService: ConfirmationService,
    private router: Router,
    private fb: FormBuilder,
    private fb1: FormBuilder
  ) {
    this.createForm();
    this.createForm1();
  }

  ngOnInit() {
    this.cols = [
      { field: 'docAttrName', header: 'Type', width: '23%' },
      { field: 'description', header: 'Description', width: '28%' },
      { field: 'isActive', header: 'Active', width: '12%' },
      { field: 'isMandatory', header: 'Mandatory', width: '12%' },
    ];

    this.docService.getTypeName()
      .subscribe((data: []) => {
        this.docLookup = data['lookup'];
      });
  }

  confirm1() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to cancel?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.router.navigate(['/acquisition-doc/document'])
      },
      reject: () => {
        this.msgs = [{ severity: 'info', summary: 'Rejected', detail: 'You have rejected' }];
      }
    });
  }

  //form Attribute
  createForm() {
    this.knockForm = this.fb.group({
      'docAttrName': new FormControl('', Validators.required),
      'description': new FormControl(''),
      'isActive': new FormControl(true),
      'isMandatory': new FormControl(false)
    });
  }

  //form Document
  createForm1() {
    this.knockForm1 = this.fb1.group({
      'docuCateName': new FormControl('', Validators.required),
      'description': new FormControl('', Validators.required),
      'isActive': new FormControl(true),
      'documentAttribute': new FormControl(''),
      'updatedBy': new FormControl(111)
    });
  }

  filterParents(event) {
    const query = event.query;
    this.filteredLookup = this.filterParent(query, this.docLookup);
  }

  filterParent(query, docLookup: any[]): any[] {
    const filtered: any[] = [];
    for (let i = 0; i < docLookup.length; i++) {
      const selectedLookup = docLookup[i];
      if (selectedLookup.value.toLowerCase().indexOf(query.toLowerCase()) === 0) {
        filtered.push(selectedLookup);
      }
    }
    return filtered;
  }

  //add Attribute
  addCriteria() {
      var exist = true;
      for (const att of this.attribute) {
        if (this.knockForm.get('docAttrName').value['value'] === att['docAttrName']) {
          this.msgs.push({ severity: 'error', summary: 'Error', detail: 'Type is already exist' });
          exist = false;
          break;
        };
      }
      if (exist) {
        // this.knockForm.get('docAttrName').setValue(this.knockForm.get('docAttrName').value['label']);
        this.attribute.push(this.knockForm.value);
        this.knockForm.reset({
          'isActive': true,
          'isMandatory': false,
          'updatedBy': 111
        })
      }
    return this.attribute;
  }

  //  <<<<<< add Document >>>>>>>
  addDocument() {
    for (const att of this.attribute) {
      att['docAttrName'] = att['docAttrName']['label'];
    }
    this.knockForm1.patchValue({
      'documentAttribute': this.attribute
    });
    this.docService.addDocument(this.knockForm1.value).subscribe(data => {
      this.attribute = [];
      this.handleSuccess(data['response']);
      this.knockForm1.reset({
        'isActive': true,
        'updatedBy': 111
      });
      this.knockForm.reset({
        'isActive': true,
        'updatedBy': 111
      });
      this.router.navigate(['/acquisition-doc/document']);
    },
      err => {
        this.handleError(err.error.errorMessage);
        this.knockForm1.controls['documentAttribute'].reset();
      })
  }

  addNewDocument() {
    this.knockForm1.patchValue({
      'documentAttribute': this.attribute
    });
    this.docService.addDocument(this.knockForm1.value).subscribe(data => {
      this.attribute = [];
      this.handleSuccess(data['response']);
      this.knockForm1.reset({
        'isActive': true,
        'updatedBy': 111
      });
      this.knockForm.reset({
        'isActive': true,
        'updatedBy': 111
      });
    },
      err => {
        this.handleError(err.error.errorMessage);
        this.knockForm1.controls['documentAttribute'].reset();
      })
  }

  handleSuccess(response: string) {
    this.msgs = [];
    this.msgs.push({ severity: 'success', summary: 'Success', detail: response });
  }

  handleError(response: string) {
    this.msgs = [];
    this.msgs.push({ severity: 'error', summary: response });
  }

  delete(i: number) {
    this.attribute.splice(i, 1);
  }

  discard() {
    this.knockForm.reset({
      'isActive': true,
      'isMandatory': false,
      'updatedBy': 111
    });
  }
}
