import { Component, OnInit } from '@angular/core';
import { EditCompanyService } from 'src/app/services/global_set/edit-company/edit-company.service';
import { Company } from 'src/app/models/global_set/company/company';
import { Message } from 'primeng/api';
import {Validators, FormControl, FormGroup, FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.css'],
})
export class CompanyEditComponent implements OnInit {

  cmpyId = '36f260ae-f649-461a-bc96-c36e15e85ff5';
  company: Company = new Company;

  show = false;
  disabled = true;

  messages: Message[] = [];

  imageUrl: string;

  fileToUpload: File = null;

  companyForm: FormGroup;

  constructor(
    private apiService:  EditCompanyService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.loadCompany();
    this.createForm();
  }

  loadCompany() {
    this.apiService.getCompany(this.cmpyId).subscribe(data => {
      this.company = data;
      if (data.companyLogo != undefined) {
        this.imageUrl = this.apiService.apiURL + 'files/' + data.companyLogo;
        this.apiService.changeLogoTopBar(this.imageUrl);
      }
      this.updateForm(this.company, this.disabled);
    });
  }

  createForm() {
    this.companyForm = this.fb.group({
      'companyName': new FormControl({value: '', disabled: this.disabled}, Validators.required),
      'companyType': new FormControl({value: '', disabled: this.disabled}, Validators.required),
      'companyGroup': new FormControl({value: '', disabled: this.disabled}, Validators.required),
      'industryType': new FormControl({value: '', disabled: this.disabled}, Validators.required),
      'subindustryType': new FormControl({value: '', disabled: this.disabled}, Validators.required),
      'establishSince': new FormControl({value: '', disabled: this.disabled}, Validators.required),
      'address': new FormControl({value: '', disabled: this.disabled}, Validators.required),
      'village': new FormControl({value: '', disabled: this.disabled}, Validators.required),
      'district': new FormControl({value: '', disabled: this.disabled}, Validators.required),
      'city': new FormControl({value: '', disabled: this.disabled}, Validators.required),
      'state': new FormControl({value: '', disabled: this.disabled}, Validators.required),
      'zipcode': new FormControl({value: '', disabled: this.disabled}, 
        Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(5)])),
      'updatedBy': new FormControl(111, Validators.required),
    });
  }

  updateForm(data: Company, dis: boolean) {
    this.companyForm.reset({
      'companyName': {value: data.companyName, disabled: dis},
      'companyType': {value: data.companyType, disabled: dis},
      'companyGroup': {value: data.companyGroup, disabled: dis},
      'industryType': {value: data.industryType, disabled: dis},
      'subindustryType': {value: data.subindustryType, disabled: dis},
      'establishSince': {value: data.establishSince, disabled: dis},
      'address': {value: data.address, disabled: dis},
      'village': {value: data.village, disabled: dis},
      'district': {value: data.district, disabled: dis},
      'city': {value: data.city, disabled: dis},
      'state': {value: data.state, disabled: dis},
      'zipcode': {value: data.zipcode, disabled: dis},
      'updatedBy': 111,
    });
  }

  updateCompany() {
    return this.apiService.editCompany(this.cmpyId, this.companyForm.value).subscribe(
      data => {
        this.handleSuccess(data['response']);
        this.loadCompany()
      },
      err => {
        this.handleError(err.error.errorMessage)
      }
    );
  }

  toggleDisabled() {
    this.disabled = !this.disabled;
    this.updateForm(this.company, this.disabled);
  }

  handleFileInput(file: FileList) {
    this.fileToUpload = file.item(0);

    this.apiService.uploadLogo(this.cmpyId, '111', this.fileToUpload).subscribe(
      data => {
        this.imageUrl = this.apiService.apiURL + 'files/' + data.imageName;
        this.apiService.changeLogoTopBar(this.imageUrl);
        this.handleSuccess(data['response']);
      },
      err => {
        this.handleError("Failed to change logo")
      });
  }

  deleteLogo() {
    this.apiService.deleteCompanyLogo(this.cmpyId, 111).subscribe(
      data => {
          this.imageUrl = this.company.companyName;
          this.apiService.changeLogoTopBar(this.company.companyName);
          this.handleSuccess(data['response']);
      },
      err => {
          this.handleError(err.error.errorMessage);
      })
  }

  handleSuccess(response: string) {
    this.messages = [];
    this.messages.push({ severity: 'success', summary: 'Success', detail: response });
  }

  handleError(response: string) {
    this.messages = [];
    this.messages.push({ severity: 'error', summary: 'Error', detail: response });
  }

}
