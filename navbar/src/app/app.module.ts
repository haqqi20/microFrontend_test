// import { AppComponent } from './app.component';
import { EmptyRouteComponent } from './empty-route/empty-route.component';

import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {LocationStrategy, HashLocationStrategy, registerLocaleData, APP_BASE_HREF} from '@angular/common';
import { AppRoutes } from './app.routes';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// used to create fake backend
import { fakeBackendProvider } from './_helpers';

import { AlertComponent } from './_components';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
// import { RegisterComponent } from './register';


import { AccordionModule } from 'primeng/accordion';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { BreadcrumbModule as PrimeNGBreadcrumbModule } from 'primeng/breadcrumb';
import { BreadcrumbModule } from 'angular-crumbs';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { CarouselModule } from 'primeng/carousel';
import { ChartModule } from 'primeng/chart';
import { CheckboxModule } from 'primeng/checkbox';
import { ChipsModule } from 'primeng/chips';
import { CodeHighlighterModule } from 'primeng/codehighlighter';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ColorPickerModule } from 'primeng/colorpicker';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DataViewModule } from 'primeng/dataview';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { EditorModule } from 'primeng/editor';
import { FieldsetModule } from 'primeng/fieldset';
import { FileUploadModule } from 'primeng/fileupload';
import { FullCalendarModule } from 'primeng/fullcalendar';
import { GalleriaModule } from 'primeng/galleria';
import { GrowlModule } from 'primeng/growl';
import { InplaceModule } from 'primeng/inplace';
import { InputMaskModule } from 'primeng/inputmask';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { LightboxModule } from 'primeng/lightbox';
import { ListboxModule } from 'primeng/listbox';
import { MegaMenuModule } from 'primeng/megamenu';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { MultiSelectModule } from 'primeng/multiselect';
import { OrderListModule } from 'primeng/orderlist';
import { OrganizationChartModule } from 'primeng/organizationchart';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { PaginatorModule } from 'primeng/paginator';
import { PanelModule } from 'primeng/panel';
import { PanelMenuModule } from 'primeng/panelmenu';
import { PasswordModule } from 'primeng/password';
import { PickListModule } from 'primeng/picklist';
import { ProgressBarModule } from 'primeng/progressbar';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SlideMenuModule } from 'primeng/slidemenu';
import { SliderModule } from 'primeng/slider';
import { SpinnerModule } from 'primeng/spinner';
import { SplitButtonModule } from 'primeng/splitbutton';
import { StepsModule } from 'primeng/steps';
import { TabMenuModule } from 'primeng/tabmenu';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { TerminalModule } from 'primeng/terminal';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { ToastModule } from 'primeng/toast';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ToolbarModule } from 'primeng/toolbar';
import { TooltipModule } from 'primeng/tooltip';
import { TreeModule } from 'primeng/tree';
import { TreeTableModule } from 'primeng/treetable';
import { VirtualScrollerModule } from 'primeng/virtualscroller';
import { AvatarModule } from 'ngx-avatar';
import { NgxCurrencyModule } from 'ngx-currency';
// import {WizardModule} from 'primeng-extensions-wizard/components/wizard.module';
import { A11yModule } from '@angular/cdk/a11y';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { PortalModule } from '@angular/cdk/portal';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { CdkTableModule } from '@angular/cdk/table';
import { CdkTreeModule } from '@angular/cdk/tree';
import {
  MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule,
} from '@angular/material';


import { AppComponent } from './app.component';
import { AppMenuComponent, AppSubMenuComponent } from './app.menu.component';
import { AppTopBarComponent } from './app.topbar.component';
import { AppFooterComponent } from './app.footer.component';
import { AppProfileComponent } from './app.profile.component';
import { DashboardDemoComponent } from './dashboard/dashboarddemo.component';

import { CstService } from './services/cstService';
import { SurveyService } from './services/surveyService';
import { AppService } from './services/appService';
import { CarService } from './dashboard/service/carservice';
import { CountryService } from './dashboard/service/countryservice';
import { EventService } from './dashboard/service/eventservice';
import { NodeService } from './dashboard/service/nodeservice';
import { OfficeService } from './services/global_set/office/office.service';
import { LookupMasterService } from './services/global_set/lookupMaster/lookupMaster.service';
import { AplicationService } from './services/acquisition/aplication/aplication.service';
import { AplicationComponent } from './acquisition/aplication/aplication.component';
import { SurveyComponent } from './acquisition/survey/survey.component';
import { PoComponent } from './acquisition/po/po.component';
import { DisbursementComponent } from './acquisition/disbursement/disbursement.component';
import { ProductsComponent } from './acquisition/products/products.component';
import { ProductsAddComponent } from './acquisition/products/products-add/products-add.component';
import { ProductsViewComponent } from './acquisition/products/products-view/products-view.component';
import { ProductsMessageComponent } from './acquisition/products/products-message/products-message.component';
import { CustomerComponent } from './acquisition/customer/customer.component';
import { DealerComponent } from './acquisition/dealer/dealer.component';
import { InsuranceComponent } from './acquisition/insurance/insurance.component';
import { AcquisitionComponent } from './acquisition/acquisition.component';
// import { LoginComponent } from './auth/login/login.component';
import { PasswordComponent } from './auth/password/password.component';
import { OfficeComponent } from './global_set/office/office.component';
import { GlobalSetComponent } from './global_set/global-set.component';
import { AccountManagementComponent } from './account-management/account-management.component';
import { CollectionComponent } from './collection/collection.component';
import { AddOfficeComponent } from './global_set/office/add-office/add-office.component';
import { UpdateOfficeComponent } from './global_set/office/update-office/update-office.component';
import { OfficeMessageComponent } from './global_set/office/office-message/office-message.component';
import { ProfileComponent } from './global_set/profile/profile.component';
import { AddUserComponent } from './global_set/user-management/add-user/add-user.component';
import { UserListComponent } from './global_set/user-management/user-list/user-list.component';
import { OrgOfficeComponent } from './global_set/office/org-office/org-office.component';
import { UserDetailsComponent } from './global_set/user-management/user-details/user-details.component';
import { DetailsOfficeComponent } from './global_set/office/details-office/details-office.component';
import { CompanyEditComponent } from './global_set/company-edit/company-edit.component';
import { UserInvitationComponent } from './global_set/user-management/user-invitation/user-invitation.component';
import { RolesComponent } from './global_set/roles/roles.component';
import { AddRolesComponent } from './global_set/roles/add-roles/add-roles.component';
import { BusinessUnitComponent } from './global_set/business-unit/business-unit.component';
import { BusinessUnitAddComponent } from './global_set/business-unit/business-unit-add/business-unit-add.component';
import { BusinessUnitDetailsComponent } from './global_set/business-unit/business-unit-details/business-unit-details.component';
import { BusinessUnitUpdateComponent } from './global_set/business-unit/business-unit-update/business-unit-update.component';
import { ResetPasswordComponent } from './global_set/user-management/reset-password/reset-password.component';
import { DataMasterComponent } from './global_set/data-master/data-master.component';
import { AddMasterComponent } from './global_set/data-master/add-master/add-master.component';
import { EditMasterComponent } from './global_set/data-master/edit-master/edit-master.component';
import { AddLookupComponent } from './global_set/data-master/add-lookup/add-lookup.component';
import { EditLookupDetailComponent } from './global_set/data-master/edit-lookup-detail/edit-lookup-detail.component';
import { AddLookupDetailComponent } from './global_set/data-master/add-lookup-detail/add-lookup-detail.component';
import { KeyFilterModule } from 'primeng/primeng';
import { JwtModule } from '@auth0/angular-jwt';
import { NgxSpinnerModule } from 'ngx-spinner';
import { UiSwitchModule } from 'ngx-ui-switch';
import { DetailsRoleComponent } from './global_set/roles/details-role/details-role.component';
import { UserManagementComponent } from './global_set/user-management/user-management.component';
import { UserMessageComponent } from './global_set/user-management/user-message/user-message.component';
import { FeeComponent } from './acquisition/fee/fee.component';
import { FeeAddComponent } from './acquisition/fee/fee-add/fee-add.component';
import { FeeDetailsComponent } from './acquisition/fee/fee-details/fee-details.component';
import { FeeMessageComponent } from './acquisition/fee/fee-message/fee-message.component';
import { DynamicFormComponent } from './global_set/dynamic-form/dynamic-form.component';
import { FeeListComponent } from './acquisition/fee/fee-list/fee-list.component';
import { PropertyDetailComponent } from './acquisition/fee/fee-details/property-detail/property-detail.component';
import { FeeLookupComponent } from './acquisition/fee/fee-lookup/fee-lookup.component';
import { FeeTypeLookupComponent } from './acquisition/fee/fee-type-lookup/fee-type-lookup.component';
import { FeeNameLookupComponent } from './acquisition/fee/fee-name-lookup/fee-name-lookup.component';
import { ChargingBasisLookupComponent } from './acquisition/fee/charging-basis-lookup/charging-basis-lookup.component';
import { SurveySurveyorComponent } from './acquisition/survey/survey-surveyor/survey-surveyor.component';
import { SurveySupervisorComponent } from './acquisition/survey/survey-supervisor/survey-supervisor.component';
import { SurveySettingComponent } from './acquisition/survey/survey-setting/survey-setting.component';
import { SurveyTemplateComponent } from './acquisition/survey/survey-template/survey-template.component';
import { SurveySurveyorCreateComponent } from './acquisition/survey/survey-surveyor/survey-surveyor-create/survey-surveyor-create.component';
import { SurveySurveyorDetailComponent } from './acquisition/survey/survey-surveyor/survey-surveyor-detail/survey-surveyor-detail.component';
import { SurveySupervisorCreateComponent } from './acquisition/survey/survey-supervisor/survey-supervisor-create/survey-supervisor-create.component';
import { SurveySupervisorDetailComponent } from './acquisition/survey/survey-supervisor/survey-supervisor-detail/survey-supervisor-detail.component';
import { SurveyTemplateCreateComponent } from './acquisition/survey/survey-template/survey-template-create/survey-template-create.component';
import { SurveyTemplateDetailComponent } from './acquisition/survey/survey-template/survey-template-detail/survey-template-detail.component';
import { SurveyDetailComponent } from './acquisition/survey/survey-detail/survey-detail.component';
import { ScoringComponent } from './acquisition/scoring/scoring.component';
import { ScoringDetailComponent } from './acquisition/scoring/scoring-detail/scoring-detail.component';
import { ApprovalListComponent } from './acquisition/approval/approval-list/approval-list.component';
import { ApprovalDetailComponent } from './acquisition/approval/approval-detail/approval-detail.component';
import { AplicationAddComponent } from './acquisition/aplication/aplication-add/aplication-add.component';
import { KnockoutComponent } from './acquisition/knockout/knockout.component';
import { KnockoutCriteriaComponent } from './acquisition/knockout/knockout-criteria/knockout-criteria.component';
import { KnockoutDetailsComponent } from './acquisition/knockout/knockout-details/knockout-details.component';
import { KnockoutMessageComponent } from './acquisition/knockout/knockout-message/knockout-message.component';
import { KnockoutParameterComponent } from './acquisition/knockout/knockout-parameter/knockout-parameter.component';
import { AddKnockoutComponent } from './acquisition/knockout/add-knockout/add-knockout.component';
import { GeneratePOComponent } from './acquisition/disbursement/generate-po/generate-po.component';
import { PoDetailComponent } from './acquisition/disbursement/po-detail/po-detail.component';
import { InvoiceDetailComponent } from './acquisition/disbursement/invoice-detail/invoice-detail.component';
import { DisbursementDetailComponent } from './acquisition/disbursement/disbursement-detail/disbursement-detail.component';
import localeId from '@angular/common/locales/id';
import localeIdExtra from '@angular/common/locales/extra/id';
import { DetailComponent } from './acquisition/aplication/detail/detail.component';
import { MytaskComponent } from './mytask/mytask.component';
import { ProductListComponent } from './acquisition/products/product-list/product-list.component';
import { ARCardComponent } from './acquisition/disbursement/arcard/arcard.component';
import { ValidationComponent } from './shared/validation/validation.component';

const STORAGE_TOKEN = 'token';

export function tokenGetter() {
  return localStorage.getItem(STORAGE_TOKEN);
}

registerLocaleData(localeId, 'id-ID', localeIdExtra);

@NgModule({
  declarations: [
    EmptyRouteComponent,
    AppComponent,
    AppMenuComponent,
    AppSubMenuComponent,
    AppTopBarComponent,
    AppFooterComponent,
    AppProfileComponent,
    DashboardDemoComponent,
    AplicationComponent,
    SurveyComponent,
    PoComponent,
    DisbursementComponent,
    ProductsComponent,
    ProductsAddComponent,
    ProductsViewComponent,
    ProductsMessageComponent,
    CustomerComponent,
    DealerComponent,
    InsuranceComponent,
    KnockoutComponent,
    KnockoutCriteriaComponent,
    KnockoutDetailsComponent,
    KnockoutMessageComponent,
    KnockoutParameterComponent,
    AddKnockoutComponent,
    AcquisitionComponent,
    LoginComponent,
    PasswordComponent,
    OfficeComponent,
    GlobalSetComponent,
    AccountManagementComponent,
    CollectionComponent,
    AddOfficeComponent,
    UpdateOfficeComponent,
    OfficeMessageComponent,
    ProfileComponent,
    AddUserComponent,
    UserListComponent,
    OrgOfficeComponent,
    UserDetailsComponent,
    DetailsOfficeComponent,
    CompanyEditComponent,
    UserInvitationComponent,
    AddRolesComponent,
    RolesComponent,
    BusinessUnitComponent,
    BusinessUnitAddComponent,
    BusinessUnitDetailsComponent,
    BusinessUnitUpdateComponent,
    ResetPasswordComponent,
    DataMasterComponent,
    AddMasterComponent,
    EditMasterComponent,
    AddLookupComponent,
    EditLookupDetailComponent,
    AddLookupDetailComponent,
    DetailsRoleComponent,
    UserManagementComponent,
    UserMessageComponent,
    ProductsAddComponent,
    ProductsMessageComponent,
    FeeComponent,
    FeeAddComponent,
    FeeDetailsComponent,
    FeeMessageComponent,
    DynamicFormComponent,
    FeeListComponent,
    PropertyDetailComponent,
    FeeLookupComponent,
    FeeTypeLookupComponent,
    FeeNameLookupComponent,
    ChargingBasisLookupComponent,
    AlertComponent,
    HomeComponent,
    RegisterComponent,
    SurveySurveyorComponent,
    SurveySupervisorComponent,
    SurveySettingComponent,
    SurveyTemplateComponent,
    SurveySurveyorCreateComponent,
    SurveySurveyorDetailComponent,
    SurveySupervisorCreateComponent,
    SurveySupervisorDetailComponent,
    SurveyTemplateCreateComponent,
    SurveyTemplateDetailComponent,
    SurveyDetailComponent,
    ScoringComponent,
    ScoringDetailComponent,
    ApprovalListComponent,
    ApprovalDetailComponent,
    AplicationAddComponent,
    GeneratePOComponent,
    PoDetailComponent,
    InvoiceDetailComponent,
    DisbursementDetailComponent,
    DetailComponent,
    MytaskComponent,
    ProductListComponent,
    ARCardComponent,
    ValidationComponent
  ],
  imports: [
    UiSwitchModule,
    AvatarModule,
    BrowserModule,
    FormsModule,
    AppRoutes,
    HttpClientModule,
    BrowserAnimationsModule,
    AccordionModule,
    AutoCompleteModule,
    PrimeNGBreadcrumbModule,
    BreadcrumbModule,
    ButtonModule,
    CalendarModule,
    CardModule,
    CarouselModule,
    ChartModule,
    CheckboxModule,
    ChipsModule,
    CodeHighlighterModule,
    ConfirmDialogModule,
    ColorPickerModule,
    ContextMenuModule,
    DataViewModule,
    DialogModule,
    DropdownModule,
    EditorModule,
    FieldsetModule,
    FileUploadModule,
    FullCalendarModule,
    GalleriaModule,
    GrowlModule,
    InplaceModule,
    InputMaskModule,
    InputSwitchModule,
    InputTextModule,
    InputTextareaModule,
    LightboxModule,
    ListboxModule,
    MegaMenuModule,
    MenuModule,
    MenubarModule,
    MessageModule,
    MessagesModule,
    MultiSelectModule,
    OrderListModule,
    OrganizationChartModule,
    OverlayPanelModule,
    PaginatorModule,
    PanelModule,
    PanelMenuModule,
    PasswordModule,
    PickListModule,
    ProgressBarModule,
    RadioButtonModule,
    RatingModule,
    ReactiveFormsModule,
    ScrollPanelModule,
    SelectButtonModule,
    SlideMenuModule,
    SliderModule,
    SpinnerModule,
    SplitButtonModule,
    StepsModule,
    TableModule,
    TabMenuModule,
    TabViewModule,
    TerminalModule,
    TieredMenuModule,
    ToastModule,
    ToggleButtonModule,
    ToolbarModule,
    TooltipModule,
    TreeModule,
    TreeTableModule,
    VirtualScrollerModule,
    ReactiveFormsModule,
    KeyFilterModule,
    NgxSpinnerModule,
    // WizardModule,
    A11yModule,
    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
    DragDropModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    PortalModule,
    ScrollingModule,
    NgxCurrencyModule,

    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:8762']
      }
    })
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: APP_BASE_HREF, useValue: '/' },

    // provider used to create fake backend
    fakeBackendProvider,
    CarService, CountryService, EventService, NodeService, AppService, CstService, SurveyService, OfficeService,
    LookupMasterService, AplicationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
