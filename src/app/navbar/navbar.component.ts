import { Component, OnInit } from '@angular/core';
import {DataService} from '../services/data.service';
import {HardcodedAuthenticationService} from '../services/hardcoded-authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  // isUserLoggedIn = false;
  message: string;

  constructor(private data: DataService,
              private hardCodedAuthentication: HardcodedAuthenticationService) { }

  ngOnInit() {
    this.data.currentMessage.subscribe(message => this.message = message);
   // this.isUserLoggedIn =  this.hardCodedAuthentication.isUserLoggedIn();
  }

}
