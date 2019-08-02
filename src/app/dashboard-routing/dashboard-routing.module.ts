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
import {DrugInventoryListComponent} from '../pharmacy/drug-inventory-list/drug-inventory-list.component';
import {AddNewDrugToInventoryComponent} from '../pharmacy/add-new-drug-to-inventory/add-new-drug-to-inventory.component';
import {UpdateDrugComponent} from '../pharmacy/update-drug/update-drug.component';
import {UpdatePatientComponent} from '../admin-dashboard/update-patient/update-patient.component';
import {TreatmentPatientsComponent} from '../admin-dashboard/treatment-patients/treatment-patients.component';
import {PatientsLabResultsComponent} from '../admin-dashboard/patients-lab-results/patients-lab-results.component';
import {MedicalHistoryComponent} from '../admin-dashboard/medical-history/medical-history.component';
import {AuthorizationErrorComponent} from '../admin-dashboard/authorization-error/authorization-error.component';
import {NurseGuard} from '../services/rolebasedguards/nurse.guard';
import {DoctorGuard} from '../services/rolebasedguards/doctor.guard';
import {LabtechGuard} from '../services/rolebasedguards/labtech.guard';
import {PharmacistGuard} from '../services/rolebasedguards/pharmacist.guard';

const routes: Routes = [
  {path: 'main-dashboard', component: MainDashboardComponent,
  children: [
    {path: 'welcome', component: WelcomeComponent, canActivate: [RouteGuardService]},
    {path: 'patient-list', component: PatientListComponent, canActivate: [ RouteGuardService]},
    {path: 'add-patient', component: AddPatientComponent, canActivate: [ RouteGuardService]},
    {path: 'add-triage/:id', component: AddPatientTriageComponent, canActivate: [ RouteGuardService]},
    {path: 'update-patient/:id', component: UpdatePatientComponent, canActivate: [ RouteGuardService]},
    {path: 'treatment-patients', component: TreatmentPatientsComponent, canActivate: [RouteGuardService] },
    {path: 'patient-lab-results', component: PatientsLabResultsComponent, canActivate: [RouteGuardService]},
    {path: 'medical-history', component: MedicalHistoryComponent, canActivate: [RouteGuardService]},
    {path: 'authorization-error', component: AuthorizationErrorComponent},
    {path: 'main-treatment', component: MainTreatmentComponent, canActivate: [RouteGuardService],
      children: [
        {path: 'treatment', component: TreatmentComponent, canActivate: [RouteGuardService]},
        {path: 'lab-request', component: LabTestRequestComponent, canActivate: [RouteGuardService]},
        {path: 'lab-req-results', component: LabTestResultComponent, canActivate: [RouteGuardService]}
      ]
    },
    {path: 'laboratory-requests', component: LaboratoryRequestsComponent, canActivate: [ RouteGuardService]},
    {path: 'lab-results/:id', component: LaboratoryResultsComponent, canActivate: [ RouteGuardService]},
    {path: 'drug-list', component: DrugPrescriptionListComponent, canActivate: [ RouteGuardService]},
    {path: 'pharmacy/:id', component: PharmacyComponent, canActivate: [ RouteGuardService]},
    {path: 'drug-inv-list', component: DrugInventoryListComponent, canActivate: [ RouteGuardService]},
    {path: 'add-drug', component: AddNewDrugToInventoryComponent, canActivate: [ RouteGuardService]},
    {path: 'update-drug/:id' , component: UpdateDrugComponent, canActivate: [ RouteGuardService]}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
