import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DrugPrescriptionListComponent } from './drug-prescription-list/drug-prescription-list.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CKEditorModule} from 'ngx-ckeditor';
import {NgSelectModule} from '@ng-select/ng-select';
import {RouterModule} from '@angular/router';
import { PharmacyComponent } from './pharmacy/pharmacy.component';

@NgModule({
  declarations: [DrugPrescriptionListComponent, PharmacyComponent],
  imports: [
    CommonModule,
    FormsModule,
    CKEditorModule,
    NgSelectModule,
    RouterModule,
    ReactiveFormsModule
  ]
})
export class PharmacyModule { }
