import { AfterViewInit, Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { ProductService } from 'src/app/services/acquisition/product/product.service';
import { ModelAplication } from 'src/app/models/acquisition/aplication/model-aplication';
import { ParamService } from 'src/app/services/acquisition/param/param.service';
import { InputControlService } from 'src/app/services/input-control.service';
import { InputBase } from 'src/app/models/global_set/input-base';
import { EmployeeService } from '@app/services/global_set/employee/employee.service';
import { ZipCodeService } from '@app/services/global_set/zipcode/zip-code.service';
import { AplicationService } from '@app/services/acquisition/aplication/aplication.service';
import { Router } from '@angular/router';
import { ConfirmationService, Message, MessageService } from 'primeng/api';
import { Location } from '@angular/common';

@Component({
  selector: 'app-aplication-add',
  templateUrl: './aplication-add.component.html',
  styleUrls: ['./aplication-add.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class AplicationAddComponent implements AfterViewInit {

  isLinear = false;
  step1: FormGroup;
  cloneAddDinamic: FormGroup;
  step2: FormGroup;
  step3: FormGroup;
  step4: FormGroup;
  fifthFormGroup: FormGroup;

  private targetInput = 'input0';

  rowsOptions = [];
  rows = 10;

  @Input()
  inputs: InputBase<any>[] = [];
  modelAplication = new ModelAplication;
  modelAplicationArray: ModelAplication[];

  document = {};

  // hardcode
  salutation: string[] = ['Mr', 'Mrs'];
  filteredSalutation: any[];

  gender: string[] = ['Male', 'Female'];
  filteredGender: any[];

  productName: string[] = ['Kredit Sahabat Muda', 'Kredit Spesial Kartini', 'Kredit Maju Bersama'];
  filteredProductName: any[];

  objectCategory: string[] = ['C-Passanger', 'M-Passanger'];
  filteredObjectCategory: any[];

  prdbrand: string[] = ['Toyota', 'Honda', 'Suzuki'];
  filteredBrand: any[];

  prdColour: string[] = ['White', 'Blue', 'Gray', 'Red', 'Black'];
  filteredColour: any[];

  prdDealer: string[] = ['PT. Suzuki Indomobil Motor', ' Dealer Motor Suzuki Bekasi', 'PT Astra Honda Motor Sunter'];
  filteredDealer: any[];

  insuranceType: string[] = ['All Risk', 'Total Lost Ony'];
  filteredInsurancee: any[];

  prdModel: string[] = ['suv', 'wave'];
  filteredModel: any[];

  occupationOp: string[] = ['Karyawan', 'Wiraswasta', 'Profesional'];
  filteredOccu: any[];

  religionSt1: string[] = ['Muslim', 'Catholic', 'Buddha', 'Christian'];
  filteredReligion: any[];

  maritalSt1: string[] = ['Married', 'Single'];
  filteredMarital: any[];

  incomeInf: string[] = ['Individual Income', 'Spouse Income', 'Other Income'];
  filteredIncome: any[];

  educationInf: string[] = ['Diploma', 'Bachelor', 'Master Degree', 'PHD'];
  filteredEdu: any[];

  collateralinf: string[] = ['Automotive'];
  filteredCollateral: any[];

  addressType: string[] = ['Identity Address', 'Domicile Address', 'Collect Address', 'Reference Address'];
  filteredAddressType: any[];

  name: string;
  showHide: boolean;
  msgs: Message[] = [];

  constructor(private fb: FormBuilder,
    private productService: ProductService,
    private paramService: ParamService,
    private ics: InputControlService,
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private zipcodeService: ZipCodeService,
    private appService: AplicationService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private location: Location,
  ) {
    this.showHide = true;
  }
  filteredLocations = [];

  ngOnInit() {
    this.modelAplication.applicationNumber = (Math.floor(Math.random() * 8999) + 100) + '-' +
      (Math.floor(Math.random() * 8999) + 100) + '-' + (Math.floor(Math.random() * 8999) + 100);

    this.cloneAddDinamic = this.formBuilder.group({
      units: this.formBuilder.array([
        this.getUnit()
      ]),
      incomes: this.formBuilder.array([
        this.getIncpome()
      ]),
      edus: this.formBuilder.array([
        this.getEdu()
      ]),
      addresStep1: this.formBuilder.array([
        this.getAddres1()
      ])
    });

    this.step1 = this.fb.group({
      applicationNumber: new FormControl(this.modelAplication.applicationNumber),
      salutation: new FormControl(this.modelAplication.salutation, Validators.required),
      fullName: new FormControl(this.modelAplication.fullName, Validators.required),
      aliasName: new FormControl(this.modelAplication.aliasName, Validators.required),
      identityNumber: new FormControl(this.modelAplication.identityNumber, Validators.required),
      birthPlace: new FormControl(this.modelAplication.birthPlace, Validators.required),
      birthDate: new FormControl(this.modelAplication.birthDate, Validators.required),
      motherName: new FormControl(this.modelAplication.motherName, Validators.required),
      phoneNumber: new FormControl(this.modelAplication.phoneNumber, Validators.required),
      email: new FormControl(this.modelAplication.email, Validators.required),
      gender: new FormControl(this.modelAplication.gender, Validators.required),
      religion: new FormControl(this.modelAplication.religion, Validators.required),
      maritialStatus: new FormControl(this.modelAplication.maritialStatus, Validators.required),
      occupation: new FormControl(this.modelAplication.occupation, Validators.required),
      companyName: new FormControl(this.modelAplication.companyName, Validators.required),
      lenghtOfWork: new FormControl(this.modelAplication.lenghtOfWork),
      employmentStatus: new FormControl(this.modelAplication.employmentStatus, Validators.required),
      startDate: new FormControl(this.modelAplication.startDate, Validators.required),
      endDate: new FormControl(this.modelAplication.endDate),
      stillWork: new FormControl(this.modelAplication.stillWork, Validators.required),
      address: new FormControl(this.modelAplication.address),


    });
    this.step2 = this.fb.group({
      businessUnit: new FormControl(this.modelAplication.businessUnit, Validators.required),
      productName: new FormControl(this.modelAplication.productName, Validators.required),
      dealer: new FormControl(this.modelAplication.dealer),
      brand: new FormControl(this.modelAplication.brand),
      model: new FormControl(this.modelAplication.model),
      objectCategory: new FormControl(this.modelAplication.objectCategory, Validators.required),
      manufacturingDate: new FormControl(this.modelAplication.manufacturingDate),
      chassisNumber: new FormControl(this.modelAplication.chassisNumber),
      engineNumber: new FormControl(this.modelAplication.engineNumber),
      colour: new FormControl(this.modelAplication.colour),
      CeritifcateNumber: new FormControl(this.modelAplication.CeritifcateNumber),
      price: new FormControl(this.modelAplication.price, Validators.required),
      insuranceType: new FormControl(this.modelAplication.insuranceType),
      imbNumber: new FormControl(this.modelAplication.imbNumber, Validators.required),
      priceProperty: new FormControl(this.modelAplication.priceProperty, Validators.required),
      insuranceTypeProperty: new FormControl(this.modelAplication.insuranceTypeProperty, Validators.required),
      type: new FormControl(this.modelAplication.type),

      addressProperty: new FormControl(this.modelAplication.addressProperty, Validators.required),
      vilageProperty: new FormControl(this.modelAplication.vilageProperty, Validators.required),
      districtProperty: new FormControl(this.modelAplication.districtProperty, Validators.required),
      cityProperty: new FormControl(this.modelAplication.cityProperty, Validators.required),
      provinceProperty: new FormControl(this.modelAplication.provinceProperty, Validators.required),
      zipCodeProperty: new FormControl(this.modelAplication.zipCodeProperty, Validators.required),

      ceritifcateOwnerName: new FormControl(this.modelAplication.ceritifcateOwnerName, Validators.required),
      buildingSize: new FormControl(this.modelAplication.buildingSize, Validators.required),
      ownershipCeritifcateNumber: new FormControl(this.modelAplication.ownershipCeritifcateNumber),
    });
    this.step3 = this.fb.group({
      collateralType: new FormControl(this.modelAplication.collateralType, Validators.required),
      brandCollateral: new FormControl(this.modelAplication.brandCollateral),
      typeCollateral: new FormControl(this.modelAplication.typeCollateral),
      modelCollateral: new FormControl(this.modelAplication.modelCollateral),
      manufacturingDateCollateral: new FormControl(this.modelAplication.manufacturingDateCollateral),
      chassisNumberCollateral: new FormControl(this.modelAplication.chassisNumberCollateral),
      machineNumber: new FormControl(this.modelAplication.machineNumber),
      colourCollateral: new FormControl(this.modelAplication.colourCollateral),
      propertyType: new FormControl(this.modelAplication.propertyType),
      addressCollateral: new FormControl(this.modelAplication.addressCollateral),
      vilageCollateral: new FormControl(this.modelAplication.vilageCollateral),
      districtCollateral: new FormControl(this.modelAplication.districtCollateral),
      cityCollateral: new FormControl(this.modelAplication.cityCollateral),
      provinceCollateral: new FormControl(this.modelAplication.provinceCollateral),
      zipCodeCollateral: new FormControl(this.modelAplication.zipCodeCollateral),
      ceritifcateNumberCollateral: new FormControl(this.modelAplication.ceritifcateNumberCollateral),
      addressCollateralType: new FormControl(this.modelAplication.addressCollateralType),
      ceritifcateName: new FormControl(this.modelAplication.ceritifcateName),
      imbNumberCollateral: new FormControl(this.modelAplication.imbNumberCollateral),
      buildingSizeCollateral: new FormControl(this.modelAplication.buildingSizeCollateral),
      priceCollateral: new FormControl(this.modelAplication.priceCollateral),
    });
    this.step4 = this.fb.group({
      identityDocument: new FormControl(this.modelAplication.identityDocument, Validators.required),
      familyCardDocument: new FormControl(this.modelAplication.familyCardDocument, Validators.required),
      backStateBook: new FormControl(this.modelAplication.backStateBook),
      creditCardBill: new FormControl(this.modelAplication.creditCardBill),
    });
    this.fifthFormGroup = this.fb.group({
      documentName: new FormControl(''),
    });
  }
  // add dinamic field
  private getUnit() {
    const numberPatern = '^[0-9.,]+$';
    return this.formBuilder.group({
      // unitName: ['', Validators.required],
      // qty: ['', [Validators.required, Validators.pattern(numberPatern)]],
      // unitPrice: ['', [Validators.required, Validators.pattern(numberPatern)]],
      // unitTotalPrice: [{value: '', disabled: true}],
      salutationFamily: new FormControl(this.modelAplication.salutationFamily, Validators.required),
      fullNameFamily: new FormControl(this.modelAplication.fullNameFamily, Validators.required),
      aliasNameFamily: new FormControl(this.modelAplication.aliasNameFamily, Validators.required),
      identityNumberFamily: new FormControl(this.modelAplication.identityNumberFamily, Validators.required),
      birthPlaceFamily: new FormControl(this.modelAplication.birthPlaceFamily, Validators.required),
      motherNameFamily: new FormControl(this.modelAplication.motherNameFamily, Validators.required),
      phoneNumberFamily: new FormControl(this.modelAplication.phoneNumberFamily, Validators.required),
      emailFamily: new FormControl(this.modelAplication.emailFamily, Validators.required),
      genderFamily: new FormControl(this.modelAplication.genderFamily, Validators.required),
      birthDateFamily: new FormControl(this.modelAplication.birthDateFamily, Validators.required),
    });
  }
  private getIncpome() {
    return this.formBuilder.group({
      incomeType: new FormControl(this.modelAplication.incomeType, Validators.required),
      monthlyIncome: new FormControl(this.modelAplication.monthlyIncome, Validators.required),
    });
  }
  private getEdu() {
    return this.formBuilder.group({
      educationType: new FormControl(this.modelAplication.educationType, Validators.required),
      instituteName: new FormControl(this.modelAplication.instituteName, Validators.required),
      major: new FormControl(this.modelAplication.major, Validators.required),
      startDateEducation: new FormControl(this.modelAplication.startDateEducation, Validators.required),
      endDateEducation: new FormControl(this.modelAplication.endDateEducation, Validators.required),
    });
  }
  private getAddres1() {
    return this.formBuilder.group({
      // Address step1
      addressType: new FormControl(this.modelAplication.addressType),
      location: new FormControl(this.modelAplication.location),
      address: new FormControl(this.modelAplication.address),
      village: new FormControl(this.modelAplication.village),
      district: new FormControl(this.modelAplication.district),
      city: new FormControl(this.modelAplication.city),
      state: new FormControl(this.modelAplication.state),
      zipcode: new FormControl(this.modelAplication.zipcode),
      province: new FormControl(this.modelAplication.province),
    });
  }

  /**
   * Add new unit row into form
   */
  private addUnit() {
    const control = <FormArray>this.cloneAddDinamic.controls['units'];
    control.push(this.getUnit());
  }
  private addIncomes() {
    const control = <FormArray>this.cloneAddDinamic.controls['incomes'];
    control.push(this.getIncpome());
  }
  private addEdu() {
    const control = <FormArray>this.cloneAddDinamic.controls['edus'];
    control.push(this.getEdu());
  }
  private addAddres1() {
    const control = <FormArray>this.cloneAddDinamic.controls['addresStep1'];
    control.push(this.getAddres1());
  }

  /**
   * Remove unit row from form on click delete button
   */
  private removeUnit(i: number) {
    const control = <FormArray>this.cloneAddDinamic.controls['units'];
    control.removeAt(i);
  }
  private removeIncomes(i: number) {
    const control = <FormArray>this.cloneAddDinamic.controls['incomes'];
    control.removeAt(i);
  }
  private removeEdu(i: number) {
    const control = <FormArray>this.cloneAddDinamic.controls['edus'];
    control.removeAt(i);
  }
  private removeAddress1(i: number) {
    const control = <FormArray>this.cloneAddDinamic.controls['addresStep1'];
    control.removeAt(i);
  }
  // location
  filterLocations(event) {
    const query = event.query;
    this.zipcodeService.getLocation(query).subscribe(data => {
      this.filteredLocations = this.filterLocation(query, data['zipcode']);
    });
  }

  filterLocation(query: string, locations: any[]): any[] {
    const filtered: any[] = [];
    for (let i = 0; i < locations.length; i++) {
      const addressType = locations[i];
      if (addressType.location.toLowerCase().indexOf(query.toLowerCase()) > -1) {
        filtered.push(addressType);
      }
    }
    return filtered;
  }

  onSelectLocation(index: number) {
    const loc: string = this.cloneAddDinamic.get('addresStep1').value[index]['location']['location'];
    const sLoc = loc.split(' , ');

    (this.cloneAddDinamic.get('addresStep1') as FormArray).controls[index].patchValue({
      'village': sLoc[0],
      'district': sLoc[1],
      'city': sLoc[2],
      'state': sLoc[3],
      'zipcode': sLoc[4],
    });
  }

  // location properti
  filterLocationsProperty(event) {
    const query = event.query;
    this.zipcodeService.getLocation(query).subscribe(data => {
      this.filteredLocations = this.filterLocationProperty(query, data['zipcode']);
    });
  }

  filterLocationProperty(query: string, locations: any[]): any[] {
    const filtered: any[] = [];
    for (let i = 0; i < locations.length; i++) {
      const addressProperty = locations[i];
      if (addressProperty.location.toLowerCase().indexOf(query.toLowerCase()) > -1) {
        filtered.push(addressProperty);
      }
    }
    return filtered;
  }

  onSelectLocationProperty() {
    const loc: string = this.step2.get('addressProperty').value['location'];
    const sLoc = loc.split(' , ');
    this.step2.patchValue({
      // provinceProperty
      'vilageProperty': sLoc[0],
      'districtProperty': sLoc[1],
      'cityProperty': sLoc[2],
      'provinceProperty': sLoc[3],
      'zipCodeProperty': sLoc[4],
    });
  }

  // hardcode
  filterSalutation(event) {
    this.filteredSalutation = [];
    for (let i = 0; i < this.salutation.length; i++) {
      const modelAplication = this.salutation[i];
      if (modelAplication.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
        this.filteredSalutation.push(modelAplication);
      }
    }
  }

  filterGender(event) {
    this.filteredGender = [];
    for (let i = 0; i < this.gender.length; i++) {
      const modelAplication = this.gender[i];
      if (modelAplication.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
        this.filteredGender.push(modelAplication);
      }
    }
  }
  filtereProductName(event) {
    this.filteredProductName = [];
    for (let i = 0; i < this.productName.length; i++) {
      const modelAplication = this.productName[i];
      if (modelAplication.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
        this.filteredProductName.push(modelAplication);
      }
    }
  }

  filterObjectCategory(event) {
    this.filteredObjectCategory = [];
    for (let i = 0; i < this.objectCategory.length; i++) {
      const modelAplication = this.objectCategory[i];
      if (modelAplication.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
        this.filteredObjectCategory.push(modelAplication);
      }
    }
  }
  filterBrand(event) {
    this.filteredBrand = [];
    for (let i = 0; i < this.prdbrand.length; i++) {
      const modelAplication = this.prdbrand[i];
      if (modelAplication.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
        this.filteredBrand.push(modelAplication);
      }
    }
  }
  filterColour(event) {
    this.filteredColour = [];
    for (let i = 0; i < this.prdColour.length; i++) {
      const modelAplication = this.prdColour[i];
      if (modelAplication.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
        this.filteredColour.push(modelAplication);
      }
    }
  }
  filterDealer(event) {
    this.filteredDealer = [];
    for (let i = 0; i < this.prdDealer.length; i++) {
      const modelAplication = this.prdDealer[i];
      if (modelAplication.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
        this.filteredDealer.push(modelAplication);
      }
    }
  }
  filterInsurance(event) {
    this.filteredInsurancee = [];
    for (let i = 0; i < this.insuranceType.length; i++) {
      const modelAplication = this.insuranceType[i];
      if (modelAplication.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
        this.filteredInsurancee.push(modelAplication);
      }
    }
  }
  filterModel(event) {
    this.filteredModel = [];
    for (let i = 0; i < this.prdModel.length; i++) {
      const modelAplication = this.prdModel[i];
      if (modelAplication.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
        this.filteredModel.push(modelAplication);
      }
    }
  }
  filterOccupation(event) {
    this.filteredOccu = [];
    for (let i = 0; i < this.occupationOp.length; i++) {
      const modelAplication = this.occupationOp[i];
      if (modelAplication.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
        this.filteredOccu.push(modelAplication);
      }
    }
  }
  filterReligion(event) {
    this.filteredReligion = [];
    for (let i = 0; i < this.religionSt1.length; i++) {
      const modelAplication = this.religionSt1[i];
      if (modelAplication.toLowerCase().indexOf(event.query.toLowerCase()) === 0) {
        this.filteredReligion.push(modelAplication);
      }
    }
  }
  filterMaritalSt1(event) {
    this.filteredMarital = [];
    for (let i = 0; i < this.maritalSt1.length; i++) {
      const modelAplication = this.maritalSt1[i];
      if (modelAplication.toLowerCase().indexOf(event.query.toLowerCase()) === 0) {
        this.filteredMarital.push(modelAplication);
      }
    }
  }
  filterIncome(event) {
    this.filteredIncome = [];
    for (let i = 0; i < this.incomeInf.length; i++) {
      const modelAplication = this.incomeInf[i];
      if (modelAplication.toLowerCase().indexOf(event.query.toLowerCase()) === 0) {
        this.filteredIncome.push(modelAplication);
      }
    }
  }
  filterEdu(event) {
    this.filteredEdu = [];
    for (let i = 0; i < this.educationInf.length; i++) {
      const modelAplication = this.educationInf[i];
      if (modelAplication.toLowerCase().indexOf(event.query.toLowerCase()) === 0) {
        this.filteredEdu.push(modelAplication);
      }
    }
  }
  filterCollateral(event) {
    this.filteredCollateral = [];
    for (let i = 0; i < this.collateralinf.length; i++) {
      const modelAplication = this.collateralinf[i];
      if (modelAplication.toLowerCase().indexOf(event.query.toLowerCase()) === 0) {
        this.filteredCollateral.push(modelAplication);
      }
    }
  }
  filterAddressType(event) {
    this.filteredAddressType = [];
    for (let i = 0; i < this.addressType.length; i++) {
      const modelAplication = this.addressType[i];
      if (modelAplication.toLowerCase().indexOf(event.query.toLowerCase()) === 0) {
        this.filteredAddressType.push(modelAplication);
      }
    }
  }
  // -----------------------------Hardcode END------------------------------------------

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
    this.step1.controls['salutation'].markAsTouched();
    this.step1.controls['fullName'].markAsTouched();
    this.step1.controls['aliasName'].markAsTouched();
    this.step1.controls['identityNumber'].markAsTouched();
    this.step1.controls['birthPlace'].markAsTouched();
    this.step1.controls['birthDate'].markAsTouched();
    this.step1.controls['motherName'].markAsTouched();
    this.step1.controls['phoneNumber'].markAsTouched();
    this.step1.controls['email'].markAsTouched();
    this.step1.controls['gender'].markAsTouched();
    this.step1.controls['religion'].markAsTouched();
    this.step1.controls['maritialStatus'].markAsTouched();
    this.step1.controls['occupation'].markAsTouched();
    this.step1.controls['companyName'].markAsTouched();
    this.step1.controls['lenghtOfWork'].markAsTouched();
    this.step1.controls['employmentStatus'].markAsTouched();
    this.step1.controls['startDate'].markAsTouched();
    this.step1.controls['endDate'].markAsTouched();
    this.step1.controls['stillWork'].markAsTouched();

    this.cloneAddDinamic.controls['salutationFamily'].markAsTouched();
    this.cloneAddDinamic.controls['fullNameFamily'].markAsTouched();
    this.cloneAddDinamic.controls['aliasNameFamily'].markAsTouched();
    this.cloneAddDinamic.controls['identityNumberFamily'].markAsTouched();
    this.cloneAddDinamic.controls['birthPlaceFamily'].markAsTouched();
    this.cloneAddDinamic.controls['motherNameFamily'].markAsTouched();
    this.cloneAddDinamic.controls['phoneNumberFamily'].markAsTouched();
    this.cloneAddDinamic.controls['emailFamily'].markAsTouched();
    this.cloneAddDinamic.controls['genderFamily'].markAsTouched();
  }
  onNextStep2() {
    this.step2.controls['businessUnit'].markAsTouched();
    this.step2.controls['objectCategory'].markAsTouched();
    this.step2.controls['productName'].markAsTouched();
    this.step2.controls['dealer'].markAsTouched();
    this.step2.controls['brand'].markAsTouched();
    this.step2.controls['type'].markAsTouched();
    this.step2.controls['model'].markAsTouched();
    this.step2.controls['manufacturingDate'].markAsTouched();
    this.step2.controls['chassisNumber'].markAsTouched();
    this.step2.controls['colour'].markAsTouched();
    this.step2.controls['CeritifcateNumber'].markAsTouched();
    this.step2.controls['price'].markAsTouched();
    this.step2.controls['insuranceType'].markAsTouched();
    this.step2.controls['insuranceTypeProperty'].markAsTouched();
  }
  onNextStep3() {
    this.step3.controls['collateralType'].markAsTouched();
    this.step3.controls['brandCollateral'].markAsTouched();
    this.step3.controls['typeCollateral'].markAsTouched();
    this.step3.controls['modelCollateral'].markAsTouched();
    this.step3.controls['manufacturingDateCollateral'].markAsTouched();
    this.step3.controls['chassisNumberCollateral'].markAsTouched();
    this.step3.controls['machineNumber'].markAsTouched();
    this.step3.controls['colourCollateral'].markAsTouched();
    this.step3.controls['propertyType'].markAsTouched();
    this.step3.controls['addressCollateral'].markAsTouched();
    this.step3.controls['vilageCollateral'].markAsTouched();
    this.step3.controls['districtCollateral'].markAsTouched();
    this.step3.controls['cityCollateral'].markAsTouched();
    this.step3.controls['provinceCollateral'].markAsTouched();
    this.step3.controls['zipCodeCollateral'].markAsTouched();
    this.step3.controls['ceritifcateNumberCollateral'].markAsTouched();
    this.step3.controls['ceritifcateName'].markAsTouched();
    this.step3.controls['imbNumberCollateral'].markAsTouched();
    this.step3.controls['buildingSizeCollateral'].markAsTouched();
    this.step3.controls['priceCollateral'].markAsTouched();
    this.step3.controls['addressCollateralType'].markAsTouched();
    this.step3.controls['imbNumberCollateral'].markAsTouched();
    this.step3.controls['buildingSizeCollateral'].markAsTouched();
    this.step3.controls['priceCollateral'].markAsTouched();
  }
  onNextStep4() {
    this.step4.controls['identityDocument'].markAsTouched();
    this.step4.controls['familyCardDocument'].markAsTouched();
  }
  onNextStep5() {
    this.fifthFormGroup.controls['documentName'].markAsTouched();
  }

  addApp(payload: any, sudah?: boolean) {
    this.step1.patchValue({
      'address': this.cloneAddDinamic.get('addresStep1').value[0]['address'],
    });

    this.appService.isiTemplate(this.step1.value);
    this.modelAplication = new ModelAplication;
    if (sudah) {
      this.router.navigateByUrl('acquisition/aplication');
    }
  }

  confirm() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to cancel?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.location.back();
      },
      reject: () => {
        this.msgs = [{ severity: 'info', summary: 'Rejected', detail: 'You have rejected' }];
      }
    });
  }

  changeShowStatus() {
    this.showHide = !this.showHide;
  }

}
