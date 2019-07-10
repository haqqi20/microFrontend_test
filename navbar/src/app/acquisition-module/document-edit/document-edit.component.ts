import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Attribute } from 'src/app/models/document/attribute';
import { ActivatedRoute, Router } from '@angular/router';
import { DocumentService } from 'src/app/services/acquisition/document/document.service';
import { DocumentLookup } from 'src/app/models/document/document-lookup';
import { Message } from 'primeng/api';
import { DocumentModel } from 'src/app/models/document/document';

@Component({
  selector: 'app-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css']
})
export class DocumentEditComponent implements OnInit {

  docuCritForm: FormGroup;
  docuCritProp: Attribute;
  docu = new DocumentModel;

  show: boolean;
  msgs: Message[] = [];
  docuInfo: any = {};
  disabled = true;


  docLookup: DocumentLookup[];
  filteredLookup: DocumentLookup[];

  docuId = this.actRoute.parent.snapshot.params['docuId'];
  docuCritId = this.actRoute.snapshot.params['docuCritId'];

  constructor(
    private docService: DocumentService,
    private fb: FormBuilder,
    private actRoute: ActivatedRoute,
    private router: Router
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.docService.getTypeName()
      .subscribe((data: []) => {
        this.docLookup = data['lookup'];
      });

    this.loadForm();
  }

  loadForm() {
    this.docService.getKnockoutById(this.docuId).subscribe(data => {
      this.docu = data;
    });

    this.docService.getDocumentAttributeById(this.docuId, this.docuCritId).subscribe(data => {
      this.docuInfo = data;
      this.updateForm(this.docuInfo, this.disabled);
    });
  }

  createForm() {
    this.docuCritForm = this.fb.group({
      'docAttrName': new FormControl({ value: '', disabled: true }, Validators.required),
      'description': new FormControl({ value: '', disabled: true }),
      'isActive': new FormControl({ value: true, disabled: true }),
      'isMandatory': new FormControl({ value: false, disabled: true }),
      'updatedBy': new FormControl(100)
    })
  }

  updateForm(attribute: Attribute, dis: boolean) {
    this.docuCritForm.reset({
      'docAttrName': { value: { value: attribute.docAttrName }, disabled: dis },
      'description': { value: attribute.description, disabled: dis },
      'isActive': { value: attribute.isActive, disabled: dis },
      'isMandatory': { value: attribute.isMandatory, disabled: dis },
      'updatedBy': 100
    })
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

  back() {
    this.router.navigateByUrl('acquisition-doc/document/details/' + this.docuId)
  }

  toggleDisabled() {
    this.disabled = !this.disabled;
    this.updateForm(this.docuInfo, this.disabled);
  }

  handleSuccess(response: string) {
    this.msgs.push({ severity: 'success', summary: 'Success', detail: response });
  }

  handleError(response: string) {
    this.msgs.push({ severity: 'error', summary: 'Error', detail: response });
  }

  UpdateDocumentCriteria() {
    var notDuplicate = true;
    for (const att of this.docu.documentAttribute) {
      if (this.docuCritForm.get('docAttrName').value['value'] === this.docuInfo.docAttrName) {
        break;
      } else if (this.docuCritForm.get('docAttrName').value['value'] === att['docAttrName']) {
        this.msgs.push({ severity: 'error', summary: 'Error', detail: 'Type is already exist' });
        notDuplicate = false;
        break;
      };
    }
    if (notDuplicate) {
      this.docuCritForm.patchValue({
        'docAttrName': this.docuCritForm.get('docAttrName').value['label']
      });
      this.docService.updateCriteriaByUUID(this.docuId, this.docuCritId, this.docuCritForm.value).subscribe(data => {
        this.handleSuccess(data['response']);
        this.toggleDisabled();
        this.show = false;
        this.loadForm();
      },
        err => {
          this.handleError(err['response']);
          this.loadForm();
        });
    }
  }
}
