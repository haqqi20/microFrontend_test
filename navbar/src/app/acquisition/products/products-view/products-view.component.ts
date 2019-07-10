import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Product } from '@app/models/acquisition/product/product';
import { ProductService } from '@app/services/acquisition/product/product.service';
import { formatDate } from '@angular/common';
import json from 'src/assets/demo/data/product-data.json';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products-view',
  templateUrl: './products-view.component.html',
  styleUrls: ['./products-view.component.css']
})
export class ProductsViewComponent implements OnInit {

  show = false;
  disabled = true;
  dataAvailable = false;

  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;
  fifthFormGroup: FormGroup;

  private targetInput = 'input0';

  rowsOptions = [10, 25, 50];
  rows = 10;

  newDraft = true;

  showFeeProperty = false;
  showKnockoutProperty = false;
  showDocumentProperty = false;

  prodId = this.actRoute.snapshot.params['prodId'];
  product: any;
  products = [];

  searchQueryParameter = '';
  searchQueryFee = '';
  searchQueryKnockout = '';
  searchQueryDocument = '';

  parameter = {};

  fee = {};
  tableFees = [];

  knockout = {};
  tableKnockouts = [];

  document = {};
  tableDocuments = [];

  newDate = new Date();
  startDate: string;
  endDate: string;

  filteredPrdType = [];
  prdTypes = [];

  filteredFee = [];
  prdFees = [];

  filteredKnockout = [];
  prdKnockouts = [];

  filteredDocument = [];
  prdDocuments = [];

  isFormAvailable = false;

  colParameters = [];
  tableParameters = [];

  minAmount: string;
  maxAmount: string;
  minTenor: string;
  maxTenor: string;
  interestRate: string;
  parameterActive = true;

  summaryAvailable = false;

  amountOpt = {
    prefix: 'Rp',
    thousands: '.',
    decimal: ',',
    allowNegative: false,
    nullable: true
  };

  amountPercent = {
    prefix: '',
    suffix: '%',
    thousands: '.',
    decimal: ',',
    allowNegative: false,
    nullable: true
  };

  constructor(
    private actRoute: ActivatedRoute,
    private fb: FormBuilder,
    private productService: ProductService,
  ) { }

  ngOnInit() {
    this.firstFormGroup = this.fb.group({
      productName: new FormControl('', Validators.required),
      productType: new FormControl('', Validators.required),
      description: new FormControl(''),
      startDate: new FormControl(this.newDate, Validators.required),
      endDate: new FormControl(this.newDate, Validators.required),
      isActive: new FormControl(true),
      priority: new FormControl(''),
    });
    this.secondFormGroup = this.fb.group({});
    this.thirdFormGroup = this.fb.group({
      feeCategoryName: new FormControl(''),
    });
    this.fourthFormGroup = this.fb.group({
      knockCategoryName: new FormControl(''),
    });
    this.fifthFormGroup = this.fb.group({
      documentCategoryName: new FormControl(''),
    });

    this.loadData();
  }

  onEdit() {
    this.show = true;
    this.disabled = false;
    this.updateForm(this.product, this.disabled);
  }

  cancel() {
    this.show = false;
    this.disabled = true;
    this.updateForm(this.product, this.disabled);
  }

  updateForm(product: any, dis: boolean) {
    this.firstFormGroup.reset({
      'productName': { value: product.productName, disabled: true },
      'productType': { value: product.productType, disabled: true },
      'description': { value: product.description, disabled: true },
      'startDate': { value: product.startDate, disabled: dis },
      'endDate': { value: product.endDate, disabled: dis },
      'priority': { value: product.priority, disabled: dis },
      'isActive': { value: product.isActive, disabled: dis },
    });

    this.tableParameters = [];
    this.tableFees = [];
    this.tableKnockouts = [];
    this.tableDocuments = [];

    this.tableParameters = product.parameter;
    let fee = {
      feeCategoryName: product.feeCategoryName,
      fee: product.fee
    };
    this.tableFees[0] = fee;

    let knockout = {
      knockCategoryName: product.knockCategoryName,
      knock: product.knock
    };
    this.tableKnockouts[0] = knockout;

    let document = {
      documentCategoryName: product.documentCategoryName,
      document: product.document
    };
    this.tableDocuments[0] = document;
  }

  loadFieldParameter() {
    this.colParameters = [
      { header: 'Amount', field: 'Amount' },
      { header: 'Tenor', field: 'Tenor' },
      { header: 'Interest Rate', field: 'interestRate' }
    ];
  }

  async save() {
    await this.addProduct();
    await this.addProductParameter();
    await this.addProductFee();
    await this.addProductKnockout();
    await this.addProductDocument();

    this.products.push(this.product);
    this.productService.changeProductDemo(this.products)
    this.handleSuccess('Product registered');
  }

  addProduct() {

  }

  addProductParameter() {
    this.product.parameter = this.tableParameters;
  }

  addProductFee() {
    this.product.feeCategoryName = this.thirdFormGroup.get('feeCategoryName').value;
    this.product.fee = this.tableFees[0].fee;
  }

  addProductKnockout() {
    this.product.knockCategoryName = this.fourthFormGroup.get('knockCategoryName').value;
    this.product.knock = this.tableKnockouts[0].knock;
  }

  addProductDocument() {
    this.product.documentCategoryName = this.fifthFormGroup.get('documentCategoryName').value;
    this.product.document = this.tableDocuments[0].document;
  }

  addParam() {
    let parameter = {
      'id': this.tableParameters.length,
      'minAmount': this.minAmount,
      'maxAmount': this.maxAmount,
      'minTenor': this.minTenor,
      'maxTenor': this.maxTenor,
      'interestRate': this.interestRate,
      'isActive': this.parameterActive
    }
    this.tableParameters.push(parameter);
    this.discardParameter();
  }

  discardParameter() {
    this.minAmount = null;
    this.maxAmount = null;
    this.minTenor = null;
    this.maxTenor = null;
    this.interestRate = null;
    this.parameterActive = true;
  }

  addFee() {
    this.tableFees.push(this.fee);
    this.showFeeProperty = false;
  }

  addKnockout() {
    this.tableKnockouts.push(this.knockout);
    this.showKnockoutProperty = false;
  }

  addDocument() {
    this.tableDocuments.push(this.document);
    this.showDocumentProperty = false;
  }

  deleteParameter(id: number) {
    this.tableParameters = this.tableParameters.filter(param => param.id !== id);
  }

  deleteFee(feeCategoryName: string) {
    this.tableFees = this.tableFees.filter(fee => fee.feeCategoryName !== feeCategoryName);
  }

  deleteKnockout(knockoutCategoryName: string) {
    this.tableKnockouts = this.tableKnockouts.filter(knockout => knockout.knockCategoryName !== knockoutCategoryName);
  }

  deleteDocument(documentCategoryName: string) {
    this.tableDocuments = this.tableDocuments.filter(document => document.documentCategoryName !== documentCategoryName);
  }

  loadData() {
    this.getPrdTypes();
    this.loadFieldParameter();
    this.getFees();
    this.getKnockouts();
    this.getDocuments();

    this.productService.currentProduct.subscribe(data => {
      this.products = data;
      for (const product of data) {
        if (product.productCode === this.prodId) {
          this.product = product;
          this.updateForm(this.product, this.disabled);
          this.dataAvailable = true;
          break;
        }
      }
    });

  }

  getFee() {
    for (const fee of json.dataFee) {
      if (fee.feeCategoryName.toLowerCase() === this.thirdFormGroup.get('feeCategoryName').value.toLowerCase()) {
        this.fee = fee;
        this.showFeeProperty = true;
        break;
      }
    }
  }

  getKnockout() {
    for (const knockout of json.dataKnockout) {
      if (knockout.knockCategoryName.toLowerCase() === this.fourthFormGroup.get('knockCategoryName').value.toLowerCase()) {
        this.knockout = knockout;
        this.showKnockoutProperty = true;
        break;
      }
    }
  }

  getDocument() {
    for (const document of json.dataDocument) {
      if (document.documentCategoryName.toLowerCase() === this.fifthFormGroup.get('documentCategoryName').value.toLowerCase()) {
        this.document = document;
        this.showDocumentProperty = true;
        break;
      }
    }
  }

  getPrdTypes() {
    this.prdTypes = ['Kredit Mobil Baru'];
  }

  getFees() {
    this.prdFees = ['Fee Basic Kredit Mobil Baru'];
  }

  getKnockouts() {
    this.prdKnockouts = ['Knockout Kredit Mobil Baru', 'Knockout Basic Kredit Mobil Baru'];
  }

  getDocuments() {
    this.prdDocuments = ['Document Basic Kredit Mobil Baru'];
  }

  handleSuccess(response: string) {
    this.productService.changeMessageInProduct('success', response);
  }

  handleError(response: string) {
    this.productService.changeMessageInProduct('error', response);
  }

  ngAfterViewInit() {
    this.setFocus();
  }

  private setFocus() {
    const targetElem = document.getElementById(this.targetInput);
    setTimeout(function waitTargetElem() {
      if (document.body.contains(targetElem)) {
        targetElem.focus();
      } else {
        setTimeout(waitTargetElem, 100);
      }
    }, 100);
  }

  onChange(event: any) {
    const index = String(event.selectedIndex);
    this.targetInput = 'input' + index;
    this.setFocus();
  }

  onNextStep1() {
    this.firstFormGroup.controls['productName'].markAsTouched();
    this.firstFormGroup.controls['productType'].markAsTouched();
    this.firstFormGroup.controls['description'].markAsTouched();
    this.firstFormGroup.controls['startDate'].markAsTouched();
    this.firstFormGroup.controls['endDate'].markAsTouched();

    this.startDate = formatDate(this.firstFormGroup.get('startDate').value, 'dd-MMM-yyyy', 'id-ID');
    this.endDate = formatDate(this.firstFormGroup.get('endDate').value, 'dd-MMM-yyyy', 'id-ID'),
      this.product = this.firstFormGroup.value;
    this.product.startDate = this.startDate;
    this.product.endDate = this.endDate;
    this.summaryAvailable = true;
  }
  onNextStep2() {
    // this.loadFieldParameter();
    // this.secondFormGroup.controls['value'].markAsTouched();
    // this.secondFormGroup.controls['paramName'].markAsTouched();
  }
  onNextStep3() {
    this.thirdFormGroup.controls['feeCategoryName'].markAsTouched();
  }
  onNextStep4() {
    this.fourthFormGroup.controls['knockCategoryName'].markAsTouched();
  }
  onNextStep5() {
    this.fifthFormGroup.controls['documentCategoryName'].markAsTouched();
  }

  filterProductTypes(event) {
    const query = event.query;
    this.filteredPrdType = this.filterComboBox(query, this.prdTypes);
  }

  filterFees(event) {
    const query = event.query;
    this.filteredFee = this.filterComboBox(query, this.prdFees);
  }

  filterKnockouts(event) {
    const query = event.query;
    this.filteredKnockout = this.filterComboBox(query, this.prdKnockouts);
  }

  filterDocuments(event) {
    const query = event.query;
    this.filteredDocument = this.filterComboBox(query, this.prdDocuments);
  }

  filterComboBox(query: string, arrayData: any[]): any[] {
    const filtered: any[] = [];
    for (let i = 0; i < arrayData.length; i++) {
      const selectedData = arrayData[i];
      if (selectedData.toLowerCase().indexOf(query.toLowerCase()) > -1) {
        filtered.push(selectedData);
      }
    }
    return filtered;
  }

}
