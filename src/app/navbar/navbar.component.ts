import { Component, OnInit } from '@angular/core';
import {DataService} from '../services/data.service';
import {HardcodedAuthenticationService} from '../services/hardcoded-authentication.service';
import {UsernameService} from '../services/username.service';
import {JwtAuthenticationService} from '../services/jwt-authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  // isUserLoggedIn = false;
  message: string;

  constructor(private data: DataService,
              private hardCodedAuthentication: HardcodedAuthenticationService,
              private getNameOfUser: UsernameService,
              private jwtAuthentication: JwtAuthenticationService) { }

  ngOnInit() {
    this.message = this.getNameOfUser.getUsername();
    console.log(this.message);
   // this.isUserLoggedIn =  this.hardCodedAuthentication.isUserLoggedIn();
  }

  removeUserName() {
    this.jwtAuthentication.logout();
    // this.message = 'offline';
  }

}
