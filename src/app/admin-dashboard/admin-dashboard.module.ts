import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainDashboardComponent } from './main-dashboard/main-dashboard.component';
import { WelcomeComponent } from './welcome/welcome.component';
import {RouterModule} from '@angular/router';
import { DashboardRoutingModule } from '../dashboard-routing/dashboard-routing.module';

@NgModule({
  declarations: [MainDashboardComponent, WelcomeComponent],
  imports: [
    CommonModule,
    RouterModule,
    DashboardRoutingModule
  ]
})
export class AdminDashboardModule { }
