import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {RegistrationchoiceComponent} from './registrationchoice/registrationchoice.component';
import {ErrorComponent} from './error/error.component';
import {NavbarComponent} from './navbar/navbar.component';
import {AppComponent} from './app.component';
import {LogoutComponent} from './logout/logout.component';
import {RegistrationComponent} from './registration/registration.component';
import {RegisteredusersComponent} from './registeredusers/registeredusers.component';
import {ManageuserComponent} from './manageuser/manageuser.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {RouteGuardService} from './services/route-guard.service';

const routes: Routes = [
  {path: '' , component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'registration-choice', component: RegistrationchoiceComponent, canActivate: [RouteGuardService]},
  {path: 'register-user', component: RegistrationComponent, canActivate: [RouteGuardService] },
  {path:  'registered-users', component: RegisteredusersComponent, canActivate: [RouteGuardService]},
  {path:  'edit-user', component: ManageuserComponent, canActivate: [RouteGuardService]},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'navbar', component: NavbarComponent},
  {path: 'logout', component: LogoutComponent, canActivate: [RouteGuardService]},
  {path: '**', component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
