import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreatmentRoutingModule } from './treatment-routing/treatment-routing.module';
import { MainTreatmentComponent } from './main-treatment/main-treatment.component';
import {RouterModule} from '@angular/router';
import { TreatmentComponent } from './treatment/treatment.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxMatSelectSearchModule} from 'ngx-mat-select-search';
import {MatFormFieldModule, MatSelectModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgSelectModule} from '@ng-select/ng-select';
import { CKEditorModule } from 'ngx-ckeditor';
import { LabTestRequestComponent } from './lab-test-request/lab-test-request.component';



@NgModule({
  declarations: [MainTreatmentComponent, TreatmentComponent, LabTestRequestComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    TreatmentRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatFormFieldModule,
    NgxMatSelectSearchModule,
    FormsModule,
    CKEditorModule,
    NgSelectModule
  ]
})
export class PatientTreatmentModule { }
