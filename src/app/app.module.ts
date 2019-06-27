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
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
