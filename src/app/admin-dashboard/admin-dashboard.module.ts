import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainDashboardComponent } from './main-dashboard/main-dashboard.component';
import { WelcomeComponent } from './welcome/welcome.component';
import {RouterModule} from '@angular/router';
import { DashboardRoutingModule } from '../dashboard-routing/dashboard-routing.module';
import { PatientListComponent } from './patient-list/patient-list.component';
import { AddPatientComponent } from './add-patient/add-patient.component';
import {ReactiveFormsModule} from '@angular/forms';
import { AddPatientTriageComponent } from './add-patient-triage/add-patient-triage.component';
import { UpdatePatientComponent } from './update-patient/update-patient.component';
import { TreatmentPatientsComponent } from './treatment-patients/treatment-patients.component';
import { PatientsLabResultsComponent } from './patients-lab-results/patients-lab-results.component';
import { MedicalHistoryComponent } from './medical-history/medical-history.component';
import {NgSelectModule} from '@ng-select/ng-select';


@NgModule({
  declarations: [MainDashboardComponent, WelcomeComponent, PatientListComponent, AddPatientComponent, AddPatientTriageComponent, UpdatePatientComponent, TreatmentPatientsComponent, PatientsLabResultsComponent, MedicalHistoryComponent],
  imports: [
    CommonModule,
    RouterModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
    NgSelectModule
  ]
})
export class AdminDashboardModule { }
