import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainDashboardComponent} from '../admin-dashboard/main-dashboard/main-dashboard.component';
import {WelcomeComponent} from '../admin-dashboard/welcome/welcome.component';
import {RouteGuardService} from '../services/route-guard.service';
import {PatientListComponent} from '../admin-dashboard/patient-list/patient-list.component';
import {AddPatientComponent} from '../admin-dashboard/add-patient/add-patient.component';
import {AddPatientTriageComponent} from '../admin-dashboard/add-patient-triage/add-patient-triage.component';
import {MainTreatmentComponent} from '../patient-treatment/main-treatment/main-treatment.component';
import {TreatmentComponent} from '../patient-treatment/treatment/treatment.component';
import {LabTestRequestComponent} from '../patient-treatment/lab-test-request/lab-test-request.component';
import {LabTestResultComponent} from '../patient-treatment/lab-test-result/lab-test-result.component';
import {LaboratoryRequestsComponent} from '../laboratory/laboratory-requests/laboratory-requests.component';
import {LaboratoryResultsComponent} from '../laboratory/laboratory-results/laboratory-results.component';
import {DrugPrescriptionListComponent} from '../pharmacy/drug-prescription-list/drug-prescription-list.component';
import {PharmacyComponent} from '../pharmacy/pharmacy/pharmacy.component';

const routes: Routes = [
  {path: 'main-dashboard', component: MainDashboardComponent,
  children: [
    {path: 'welcome', component: WelcomeComponent, canActivate: [RouteGuardService]},
    {path: 'patient-list', component: PatientListComponent, canActivate: [RouteGuardService]},
    {path: 'add-patient', component: AddPatientComponent, canActivate: [RouteGuardService]},
    {path: 'add-triage/:id', component: AddPatientTriageComponent, canActivate: [RouteGuardService]},
    {path: 'main-treatment', component: MainTreatmentComponent, canActivate: [RouteGuardService],
      children: [
        {path: 'treatment', component: TreatmentComponent, canActivate: [RouteGuardService]},
        {path: 'lab-request', component: LabTestRequestComponent, canActivate: [RouteGuardService]},
        {path: 'lab-req-results', component: LabTestResultComponent, canActivate: [RouteGuardService]}
      ]
    },
    {path: 'laboratory-requests', component: LaboratoryRequestsComponent, canActivate: [RouteGuardService]},
    {path: 'lab-results/:id', component: LaboratoryResultsComponent, canActivate: [RouteGuardService]},
    {path: 'drug-list', component: DrugPrescriptionListComponent, canActivate: [RouteGuardService]},
    {path: 'pharmacy/:id', component: PharmacyComponent, canActivate: [RouteGuardService]}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
