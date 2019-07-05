import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainDashboardComponent} from '../admin-dashboard/main-dashboard/main-dashboard.component';
import {WelcomeComponent} from '../admin-dashboard/welcome/welcome.component';

const routes: Routes = [
  {path: 'main-dashboard', component: MainDashboardComponent,
  children: [
    {path: 'welcome', component: WelcomeComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
