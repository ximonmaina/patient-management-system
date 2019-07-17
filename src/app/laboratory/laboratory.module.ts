import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CKEditorModule} from 'ngx-ckeditor';
import {NgSelectModule} from '@ng-select/ng-select';
import {RouterModule} from '@angular/router';
import { LaboratoryRequestsComponent } from './laboratory-requests/laboratory-requests.component';

@NgModule({
  declarations: [LaboratoryRequestsComponent],
  imports: [
    CommonModule,
    FormsModule,
    CKEditorModule,
    NgSelectModule,
    RouterModule,
    ReactiveFormsModule
  ]
})
export class LaboratoryModule { }
