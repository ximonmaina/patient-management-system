import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainDashboardComponent } from './main-dashboard/main-dashboard.component';
import { WelcomeComponent } from './welcome/welcome.component';
import {RouterModule} from '@angular/router';
import { DashboardRoutingModule } from '../dashboard-routing/dashboard-routing.module';
import { PatientListComponent } from './patient-list/patient-list.component';
import { AddPatientComponent } from './add-patient/add-patient.component';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [MainDashboardComponent, WelcomeComponent, PatientListComponent, AddPatientComponent],
  imports: [
    CommonModule,
    RouterModule,
    DashboardRoutingModule,
    ReactiveFormsModule
  ]
})
export class AdminDashboardModule { }
