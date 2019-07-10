import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DocumentComponent } from './document/document.component'
import { CreateDocumentComponent } from './create-document/create-document.component';
import { DocumentDetailsComponent } from './document-details/document-details.component';
import { DocumentTypeComponent } from './document-type/document-type.component';
import { DocumentEditComponent } from './document-edit/document-edit.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'document' },
  {
    path: 'document', component: DocumentComponent, data: { breadcrumb: 'Document' },
    children: [
      { path: 'create', component: CreateDocumentComponent, data: { breadcrumb: 'Create' } },
      {
        path: 'details/:docuId', component: DocumentDetailsComponent, data: { breadcrumb: 'Detail' },
        children: [
          { path: 'criteria/:docuCritId', component: DocumentEditComponent, data: { breadcrumb: 'Criteria' } }
        ]
      },
      { path: 'type', component: DocumentTypeComponent, data: { breadcrumb: 'Document Parameter Setting' } }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AcquisitionModuleRoutingModule { }
