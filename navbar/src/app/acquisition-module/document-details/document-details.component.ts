import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { DocumentModel } from 'src/app/models/document/document';
import { Attribute } from 'src/app/models/document/attribute';
import { DocumentLookup } from 'src/app/models/document/document-lookup';
import { DocumentService } from 'src/app/services/acquisition/document/document.service';
import { Message } from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-document-details',
  templateUrl: './document-details.component.html',
})
export class DocumentDetailsComponent implements OnInit {

  show: boolean;
  disabled = true;

  docForm: FormGroup;
  docForm1: FormGroup;

  cols: any[];
  msgs: Message[] = [];
  docLookup: DocumentLookup[];
  selectedLookup: DocumentLookup;
  filteredLookup: DocumentLookup[];
  attList2: Attribute[];
  atts: Attribute[] = [];

  uuid = this.actRoute.snapshot.params['docuId'];
  doc = new DocumentModel;
  docInformation: any = {};
  attribute = new Attribute;

  knockForm: any;
  knockForm1: FormGroup;

  constructor(
    private docService: DocumentService,
    private router: Router,
    private fb: FormBuilder,
    private actRoute: ActivatedRoute,
  ) {
    this.createKnock();
    this.createForm();
  }

  ngOnInit() {

    this.cols = [
      { field: 'docAttrName', header: 'Type', width: '23%' },
      { field: 'description', header: 'Description', width: '28%' },
      { field: 'isActive', header: 'Is Active', width: '12%' },
      { field: 'isMandatory', header: 'Mandatory', width: '12%' },
    ];

    this.docService.getTypeName()
      .subscribe((data: []) => {
        this.docLookup = data['lookup'];
      });

    this.docService.refreshNeeded$.subscribe(() => {
      this.loadKnock();
    });

    this.loadKnock();
  }

  createKnock() {
    this.docForm1 = this.fb.group({
      'docuCateName': new FormControl({ value: '', disabled: this.disabled }, Validators.required),
      'description': new FormControl({ value: '', disabled: this.disabled }, Validators.required),
      'isActive': new FormControl({ value: true, disabled: this.disabled }, Validators.required),
      'documentAttribute': new FormControl(''),
      'updatedBy': new FormControl(111)
    });
  }

  updateKnock(doc: DocumentModel, dis: boolean) {
    this.docForm1.reset({
      'docuCateName': { value: doc.docuCateName, disabled: dis },
      'description': { value: doc.description, disabled: dis },
      'isActive': { value: doc.isActive, disabled: dis },
      'updatedBy': 111
    });
  }

  createForm() {
    this.docForm = this.fb.group({
      'docAttrName': new FormControl({value: ''}, Validators.required),
      'description': new FormControl(''),
      'isActive': new FormControl(true),
      'isMandatory': new FormControl(false),
    });
  }


  // <<<<<<< load lookup >>>>>>>>>
  loadKnock() {
    this.docForm1.get('documentAttribute').setValue([this.docForm.value]);
    this.docService.getKnockoutById(this.uuid).subscribe(data => {
      this.docInformation = data;
      this.atts = data['documentAttribute'];
      this.updateKnock(this.docInformation, this.disabled);
      this.docInformation.updatedBy = 100;
    });
  }



  // <<<<<<< update >>>>>>>
  updateOffice() {
    this.docService.updateDoc(this.uuid, this.docForm1.value).subscribe(data => {
      this.handleSuccess(data['response']);
      this.loadKnock();
    },
      err => {
        this.handleError(err['response']);
        this.loadKnock();
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

  // <<<<<<<<<<< add >>>>>>>>>>>>>>
  addCriteria() {
    var notExist = true;
    for (const att of this.atts) {
      if (this.docForm.get('docAttrName').value['value'] === att['docAttrName']) {
        this.msgs.push({ severity: 'error', summary: 'Error', detail: 'Type is already exist' });
        notExist = false;
        break;
      };
    }
    if (notExist) {
      this.docForm.get('docAttrName').setValue(this.docForm.get('docAttrName').value['label']);
      this.doc.documentAttribute = [this.docForm.value];
      this.docService.addCriteria(this.uuid, this.doc).subscribe(data => {
        this.handleSuccess(data['response']);
      },
        err => {
          this.handleError(err['response']);
        });

      this.loadKnock();
    }
  }

  cancelAdd() {
    this.docForm.reset({
      'isActive': true,
      'updatedBy': 111
    });
  }

  // <<<<<<<<<<<< update attribute >>>>>>>>>>>
  toggleDisabled() {
    this.disabled = !this.disabled;
    this.updateKnock(this.docInformation, this.disabled);
  }

  onRowEditInit(docuCritId: string) {
    this.router.navigateByUrl('acquisition-doc/document/details/' + this.uuid + '/criteria/' + docuCritId)
  }

  handleSuccess(response: string) {
    this.msgs.push({ severity: 'success', summary: 'Success', detail: response });
  }

  handleError(response: string) {
    this.msgs.push({ severity: 'error', summary: 'Error', detail: response });
  }
}
