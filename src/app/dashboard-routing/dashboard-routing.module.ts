import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainDashboardComponent} from '../admin-dashboard/main-dashboard/main-dashboard.component';
import {WelcomeComponent} from '../admin-dashboard/welcome/welcome.component';
import {RouteGuardService} from '../services/route-guard.service';
import {PatientListComponent} from '../admin-dashboard/patient-list/patient-list.component';
import {AddPatientComponent} from '../admin-dashboard/add-patient/add-patient.component';

const routes: Routes = [
  {path: 'main-dashboard', component: MainDashboardComponent,
  children: [
    {path: 'welcome', component: WelcomeComponent, canActivate: [RouteGuardService]},
    {path: 'patient-list', component: PatientListComponent, canActivate: [RouteGuardService]},
    {path: 'add-patient', component: AddPatientComponent, canActivate: [RouteGuardService]}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
