import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DrugPrescriptionListComponent } from './drug-prescription-list/drug-prescription-list.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CKEditorModule} from 'ngx-ckeditor';
import {NgSelectModule} from '@ng-select/ng-select';
import {RouterModule} from '@angular/router';
import { PharmacyComponent } from './pharmacy/pharmacy.component';
import { DrugInventoryListComponent } from './drug-inventory-list/drug-inventory-list.component';
import { AddNewDrugToInventoryComponent } from './add-new-drug-to-inventory/add-new-drug-to-inventory.component';
import { UpdateDrugComponent } from './update-drug/update-drug.component';

@NgModule({
  declarations: [DrugPrescriptionListComponent, PharmacyComponent, DrugInventoryListComponent, AddNewDrugToInventoryComponent, UpdateDrugComponent],
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
