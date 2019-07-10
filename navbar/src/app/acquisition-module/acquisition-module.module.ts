import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AcquisitionModuleRoutingModule } from './acquisition-module-routing.module';
import { DocumentComponent } from './document/document.component';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { UiSwitchModule } from 'ngx-ui-switch';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import {KeyFilterModule} from 'primeng/keyfilter';

import { CreateDocumentComponent } from './create-document/create-document.component';
import { DocumentDetailsComponent } from './document-details/document-details.component';
import { DocumentTypeComponent } from './document-type/document-type.component';
import { DocumentEditComponent } from './document-edit/document-edit.component';

@NgModule({
  declarations: [
    DocumentComponent,
    CreateDocumentComponent,
    DocumentDetailsComponent,
    DocumentTypeComponent,
    DocumentEditComponent,
  ],
  imports: [
    KeyFilterModule,
    MessagesModule,
    MessageModule,
    FormsModule,
    ReactiveFormsModule,
    ConfirmDialogModule,
    AutoCompleteModule,
    UiSwitchModule,
    InputTextModule,
    InputTextareaModule,
    ButtonModule,
    PaginatorModule,
    TableModule,
    CommonModule,
    AcquisitionModuleRoutingModule
  ]
})
export class AcquisitionModuleModule { }
