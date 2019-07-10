import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { AuthGuard } from './_guards';

import { DashboardDemoComponent } from './dashboard/dashboarddemo.component';
import { AplicationComponent } from './acquisition/aplication/aplication.component';
import { SurveyComponent } from './acquisition/survey/survey.component';
import { PoComponent } from './acquisition/po/po.component';
import { DisbursementComponent } from './acquisition/disbursement/disbursement.component';
import { DisbursementDetailComponent } from './acquisition/disbursement/disbursement-detail/disbursement-detail.component';
import { GeneratePOComponent } from './acquisition/disbursement/generate-po/generate-po.component';
import { PoDetailComponent } from './acquisition/disbursement/po-detail/po-detail.component';
import { InvoiceDetailComponent } from './acquisition/disbursement/invoice-detail/invoice-detail.component';
import { ARCardComponent } from './acquisition/disbursement/arcard/arcard.component';
import { ProductsComponent } from './acquisition/products/products.component';
import { ProductsAddComponent } from './acquisition/products/products-add/products-add.component';
import { CustomerComponent } from './acquisition/customer/customer.component';
import { DealerComponent } from './acquisition/dealer/dealer.component';
import { InsuranceComponent } from './acquisition/insurance/insurance.component';
import { AcquisitionComponent } from './acquisition/acquisition.component';
import { PasswordComponent } from './auth/password/password.component';
import { AppComponent } from './app.component';
import { OfficeComponent } from './global_set/office/office.component';
import { GlobalSetComponent } from './global_set/global-set.component';
import { AccountManagementComponent } from './account-management/account-management.component';
import { CollectionComponent } from './collection/collection.component';
import { AddOfficeComponent } from './global_set/office/add-office/add-office.component';
import { UpdateOfficeComponent } from './global_set/office/update-office/update-office.component';
import { OrgOfficeComponent } from './global_set/office/org-office/org-office.component';
import { ProfileComponent } from './global_set/profile/profile.component';
import { UserManagementComponent } from './global_set/user-management/user-management.component';
import { AddUserComponent } from './global_set/user-management/add-user/add-user.component';
import { UserDetailsComponent } from './global_set/user-management/user-details/user-details.component';
import { DetailsOfficeComponent } from './global_set/office/details-office/details-office.component';
import { CompanyEditComponent } from './global_set/company-edit/company-edit.component';
import { UserInvitationComponent } from './global_set/user-management/user-invitation/user-invitation.component';
import { AddRolesComponent } from './global_set/roles/add-roles/add-roles.component';
import { RolesComponent } from './global_set/roles/roles.component';
import { BusinessUnitComponent } from './global_set/business-unit/business-unit.component';
import { BusinessUnitAddComponent } from './global_set/business-unit/business-unit-add/business-unit-add.component';
import { ResetPasswordComponent } from './global_set/user-management/reset-password/reset-password.component';
import { BusinessUnitDetailsComponent } from './global_set/business-unit/business-unit-details/business-unit-details.component';
import { BusinessUnitUpdateComponent } from './global_set/business-unit/business-unit-update/business-unit-update.component';
import { DataMasterComponent } from './global_set/data-master/data-master.component';
import { AddMasterComponent } from './global_set/data-master/add-master/add-master.component';
import { EditMasterComponent } from './global_set/data-master/edit-master/edit-master.component';
import { AddLookupComponent } from './global_set/data-master/add-lookup/add-lookup.component';
import { AddLookupDetailComponent } from './global_set/data-master/add-lookup-detail/add-lookup-detail.component';
import { EditLookupDetailComponent } from './global_set/data-master/edit-lookup-detail/edit-lookup-detail.component';
import { DetailsRoleComponent } from './global_set/roles/details-role/details-role.component';
import { RouteGuardService } from './services/auth/route-guard.service';
import { FeeComponent } from './acquisition/fee/fee.component';
import { FeeAddComponent } from './acquisition/fee/fee-add/fee-add.component';
import { FeeDetailsComponent } from './acquisition/fee/fee-details/fee-details.component';
import { PropertyDetailComponent } from './acquisition/fee/fee-details/property-detail/property-detail.component';
import { FeeNameLookupComponent } from './acquisition/fee/fee-name-lookup/fee-name-lookup.component';
import { ChargingBasisLookupComponent } from './acquisition/fee/charging-basis-lookup/charging-basis-lookup.component';
import { FeeTypeLookupComponent } from './acquisition/fee/fee-type-lookup/fee-type-lookup.component';

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
import { AddKnockoutComponent } from './acquisition/knockout/add-knockout/add-knockout.component';
import { KnockoutDetailsComponent } from './acquisition/knockout/knockout-details/knockout-details.component';
import { KnockoutParameterComponent } from './acquisition/knockout/knockout-parameter/knockout-parameter.component';
import { KnockoutCriteriaComponent } from './acquisition/knockout/knockout-criteria/knockout-criteria.component';
import { MytaskComponent } from './mytask/mytask.component';
import { ProductsViewComponent } from './acquisition/products/products-view/products-view.component';
import {DetailComponent} from '@app/acquisition/aplication/detail/detail.component';

import { NgModule } from '@angular/core';
import { EmptyRouteComponent } from './empty-route/empty-route.component'

const routes: Routes = [
    { path: '**', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },

    // otherwise redirect to home
    // { path: '**', redirectTo: '' },

    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'app', component: AppComponent },
    {
        path: 'acquisition-doc', loadChildren: './acquisition-module/acquisition-module.module#AcquisitionModuleModule',
        data: { breadcrumb: 'Acquisition' }
    },
    { path: 'dashboard', component: DashboardDemoComponent, data: { breadcrumb: 'Home' } },
    { path: 'my-task', component: MytaskComponent, data: { breadcrumb: 'My Task'}},
    // { path: 'aplication', component: AplicationComponent, },
    { path: 'po', component: PoComponent },
    { path: 'customer', component: CustomerComponent },
    { path: 'dealer', component: DealerComponent },
    { path: 'insurance', component: InsuranceComponent },
    {
        path: 'acquisition', component: AcquisitionComponent, data: { breadcrumb: 'Acquisition' },
        children: [
          {
            path: 'aplication', component: AplicationComponent, data: { breadcrumb: 'Aplication' },
            children: [
              { path: 'createAplication', component: AplicationAddComponent, data: { breadcrumb: 'Create' } },
              { path: 'detail/:appId', component: DetailComponent, data: { breadcrumb: 'Detail' } }
            ]
          },
            {
                path: 'fee-management', component: FeeComponent, data: { breadcrumb: 'Fee Management' },
                children: [
                    { path: 'create', component: FeeAddComponent, data: { breadcrumb: 'Create' } },
                    {
                        path: 'details/:feeId', component: FeeDetailsComponent, data: { breadcrumb: 'Detail' },
                        children: [
                            { path: 'type/:feePropId', component: PropertyDetailComponent, data: { breadcrumb: 'Type' } },
                        ]
                    },
                ]
            },
            {
                path: 'fee', component: FeeComponent, data: { breadcrumb: 'Fee' },
                children: [
                    { path: 'fee-name-parameter', component: FeeNameLookupComponent, data: { breadcrumb: 'Fee Name Parameter' } },
                    {
                        path: 'charging-basis-parameter', component: ChargingBasisLookupComponent,
                        data: { breadcrumb: 'Charging Basis Parameter' }
                    },
                    { path: 'fee-type-parameter', component: FeeTypeLookupComponent, data: { breadcrumb: 'Fee Type Parameter' } }
                ]
            },
            {
                path: 'knockout', component: KnockoutComponent, data: { breadcrumb: 'Knockout' },
                children: [
                    { path: 'create', component: AddKnockoutComponent, data: { breadcrumb: 'Create' } },
                    { path: 'details/:uuid', component: KnockoutDetailsComponent, data: { breadcrumb: 'Details' } },
                    { path: 'operator', component: KnockoutParameterComponent, data: { breadcrumb: 'Operator Parameter' } },
                    { path: 'criteria', component: KnockoutCriteriaComponent, data: {breadcrumb: 'Criteria Parameter'}}
                ]
            },
            {
                path: 'product-management', component: ProductsComponent, data: { breadcrumb: 'Product Management' },
                children: [
                    { path: 'create', component: ProductsAddComponent, data: { breadcrumb: 'Create' } },
                    { path: 'details/:prodId', component: ProductsViewComponent, data: { breadcrumb: 'Detail' } },
                ]
            },
            {
                path: 'survey', component: SurveyComponent, data: { breadcrumb: 'Survey' },
                children: [
                    { path: 'detail/:uuid', component: SurveyDetailComponent, data: { breadcrumb: 'Detail' } },
                    {
                        path: 'surveyor', component: SurveySurveyorComponent, data: { breadcrumb: 'Surveyor' },
                        children: [
                            { path: 'create', component: SurveySurveyorCreateComponent, data: { breadcrumb: 'Create' } },
                            { path: 'detail/:uuid', component: SurveySurveyorDetailComponent, data: { breadcrumb: 'Detail' } }
                        ]
                    },
                    {
                        path: 'supervisor', component: SurveySupervisorComponent, data: { breadcrumb: 'Supervisor' },
                        children: [
                            { path: 'create', component: SurveySupervisorCreateComponent, data: { breadcrumb: 'Create' } },
                            { path: 'detail/:uuid', component: SurveySupervisorDetailComponent, data: { breadcrumb: 'Detail' } }
                        ]
                    },
                    { path: 'setting', component: SurveySettingComponent, data: { breadcrumb: 'Setting' } },
                    {
                        path: 'template', component: SurveyTemplateComponent, data: { breadcrumb: 'Template' },
                        children: [
                            { path: 'create', component: SurveyTemplateCreateComponent, data: { breadcrumb: 'Create' } },
                            { path: 'detail/:uuid', component: SurveyTemplateDetailComponent, data: { breadcrumb: 'Detail' } }
                        ]
                    },
                ]
            },
            {
                path: 'scoring', component: ScoringComponent, data: { breadcrumb: 'Scoring' },
                children: [
                    { path: 'detail/:uuid', component: ScoringDetailComponent, data: { breadcrumb: 'Detail' } }
                ]
            },
            {
                path: 'approval', component: ApprovalListComponent, data: { breadcrumb: 'Approval Management' },
                children: [
                    { path: 'detail/:appId', component: ApprovalDetailComponent, data: { breadcrumb: 'Detail' } }
                ]
            },
            {
                path: 'disbursement', component: DisbursementComponent, data: { breadcrumb: 'Disbursement' },
                children: [
                    { path: 'generate-po/:dealerId', component: GeneratePOComponent, data: { breadcrumb: 'Generate PO' } },
                    { path: 'po-detail/:dealerId', component: PoDetailComponent, data: { breadcrumb: 'PO Detail' } },
                    { path: 'invoice-detail/:dealerId', component: InvoiceDetailComponent, data: { breadcrumb: 'Invoice Detail' } },
                    { path: 'detail/:dealerId', component: DisbursementDetailComponent, data: { breadcrumb: 'Detail' } },
                    { path: 'ar/:appId', component: ARCardComponent, data: { breadcrumb: 'AR Card' } }
                ]
            },
        ]
    },
    { path: 'login', component: LoginComponent },
    { path: 'change/password', component: PasswordComponent },
    {
        path: 'globalsetting', component: GlobalSetComponent, data: { breadcrumb: 'Global Setting' },
        children: [
            {
                path: 'office', component: OfficeComponent, data: { breadcrumb: 'Office' },
                children: [
                    // {path: '', component: OfficeComponent },
                    { path: 'add', component: AddOfficeComponent, data: { breadcrumb: 'Add Office' } },
                    { path: 'update/:uuid', component: UpdateOfficeComponent, data: { breadcrumb: 'Update Office' } },
                    { path: 'chart', component: OrgOfficeComponent, data: { breadcrumb: 'Chart Office' } },
                    { path: 'details/:uuid', component: DetailsOfficeComponent, data: { breadcrumb: 'Office Details' } },
                ]
            },
            {
                path: 'business-unit', component: BusinessUnitComponent, data: { breadcrumb: 'Business Unit' },
                children: [
                    { path: 'add', component: BusinessUnitAddComponent, data: { breadcrumb: 'Add Business Unit' } },
                    { path: 'details/:uuid', component: BusinessUnitDetailsComponent, data: { breadcrumb: 'Business Unit Details' } },
                    { path: 'update/:uuid', component: BusinessUnitUpdateComponent, data: { breadcrumb: 'Update Business Unit' } },
                ]
            },
            {
                path: 'user-management', component: UserManagementComponent, data: { breadcrumb: 'User' },
                children: [
                    { path: 'add', component: AddUserComponent, data: { breadcrumb: 'Add User' } },
                    { path: 'details/:uuid', component: UserDetailsComponent, data: { breadcrumb: 'User Details' } },
                ]
            },
            {
                path: 'lookup', component: DataMasterComponent, data: { breadcrumb: 'Lookup Master' },
                children: [
                    // { path: 'add/group', component: AddMasterComponent, data: { breadcrumb: 'Add Group' } },
                    // { path: 'edit/group/:uuid', component: EditMasterComponent, data: { breadcrumb: 'Edit Lookup Group' } },
                    { path: 'detail/:uuid', component: EditLookupDetailComponent, data: { breadcrumb: 'Detail' } },
                    // { path: 'detail/:uuid/add', component: AddLookupDetailComponent, data: { breadcrumb: 'Add Lookup Detail' } },
                    // { path: 'value/:uuid/add', component: AddLookupComponent, data: { breadcrumb: 'Add Lookup' } },
                ]
            },
            {
                path: 'company', component: CompanyEditComponent, data: { breadcrumb: 'Company' },
            },
            {
                path: 'roles', component: RolesComponent, data: { breadcrumb: 'Roles' },
                children: [
                    { path: 'add', component: AddRolesComponent, data: { breadcrumb: 'Add Role' } },
                    { path: 'details/:uuid', component: DetailsRoleComponent, data: { breadcrumb: 'Role Details' } },
                ]
            },
        ]
    },
    { path: 'account/management', component: AccountManagementComponent },
    { path: 'collection', component: CollectionComponent },
    { path: 'addlookup', component: AddLookupComponent },
    { path: 'profile', component: ProfileComponent, data: { breadcrumb: 'My Profile' } },
    { path: 'invitation/:uuid', component: UserInvitationComponent, data: { breadcrumb: 'User Invitation' } },
    { path: 'globalsetting/roles', component: RolesComponent, data: { breadcrumb: 'Global Setting / Roles' } },
    { path: 'roles/add', component: AddRolesComponent, data: { breadcrumb: 'Roles / Add' } },
    { path: 'reset-pass/:uuid', component: ResetPasswordComponent, data: { breadcrumb: 'Reset Password' } },
];

// export const routing = RouterModule.forRoot(appRoutes);
export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' });
