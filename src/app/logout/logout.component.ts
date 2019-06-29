import { Component, OnInit } from '@angular/core';
import {DataService} from '../services/data.service';
import {HardcodedAuthenticationService} from '../services/hardcoded-authentication.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  resetUserName = 'user';
  constructor(private data: DataService,
              private hardCodedAuthenticationService: HardcodedAuthenticationService) { }

  ngOnInit() {
    this.resetUsername();
    this.hardCodedAuthenticationService.logout();
  }

  resetUsername() {
    this.data.changeMessage(this.resetUserName);
  }

}
