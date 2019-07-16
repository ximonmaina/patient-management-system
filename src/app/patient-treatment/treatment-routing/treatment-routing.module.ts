import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {MainTreatmentComponent} from '../main-treatment/main-treatment.component';
import {RouteGuardService} from '../../services/route-guard.service';
import {TreatmentComponent} from '../treatment/treatment.component';
const routes: Routes = [
  // {path: 'main-treatment', component: MainTreatmentComponent, canActivate: [RouteGuardService],
  // children: [
  //   {path: 'treatment', component: TreatmentComponent, canActivate: [RouteGuardService]}
  // ]}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TreatmentRoutingModule { }
