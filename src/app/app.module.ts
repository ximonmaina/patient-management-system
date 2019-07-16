import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegistrationchoiceComponent } from './registrationchoice/registrationchoice.component';
import { RegistrationComponent } from './registration/registration.component';
import { RegisteredusersComponent } from './registeredusers/registeredusers.component';
import { ManageuserComponent } from './manageuser/manageuser.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { LogoutComponent } from './logout/logout.component';
import { ErrorComponent } from './error/error.component';
import {DataService} from './services/data.service';
import {RouteGuardService} from './services/route-guard.service';
import {HttpClientModule} from '@angular/common/http';
import {AdminDashboardModule} from './admin-dashboard/admin-dashboard.module';
import {DatePipe} from '@angular/common';
import {PatientTreatmentModule} from './patient-treatment/patient-treatment.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationchoiceComponent,
    RegistrationComponent,
    RegisteredusersComponent,
    ManageuserComponent,
    NavbarComponent,
    FooterComponent,
    LogoutComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    PatientTreatmentModule,
    AdminDashboardModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,

  ],
  providers: [DataService, RouteGuardService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
