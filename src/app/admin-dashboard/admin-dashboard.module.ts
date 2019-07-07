import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainDashboardComponent } from './main-dashboard/main-dashboard.component';
import { WelcomeComponent } from './welcome/welcome.component';
import {RouterModule} from '@angular/router';
import { DashboardRoutingModule } from '../dashboard-routing/dashboard-routing.module';
import { PatientListComponent } from './patient-list/patient-list.component';


@NgModule({
  declarations: [MainDashboardComponent, WelcomeComponent, PatientListComponent],
  imports: [
    CommonModule,
    RouterModule,
    DashboardRoutingModule
  ]
})
export class AdminDashboardModule { }
