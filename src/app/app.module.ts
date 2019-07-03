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
import { DashboardComponent } from './dashboard/dashboard.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { LogoutComponent } from './logout/logout.component';
import { ErrorComponent } from './error/error.component';
import {DataService} from './services/data.service';
import {RouteGuardService} from './services/route-guard.service';
import {HttpClientModule} from '@angular/common/http';
import { WelcomeComponent } from './welcome/welcome.component';

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
    DashboardComponent,
    LogoutComponent,
    ErrorComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [DataService, RouteGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
