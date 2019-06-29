import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {DataService} from '../services/data.service';
import {HardcodedAuthenticationService} from '../services/hardcoded-authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = 'simon';

  password = '';

  errorMessage = 'Invalid Credentials';

  invalidLogin = false;

  constructor(private router: Router,
              private  data: DataService,
              private hardcodedAuthenticationService: HardcodedAuthenticationService) { }

  ngOnInit() {
  }

  newUsername() {
    this.data.changeMessage(this.username);
  }

  handleLogin() {
   if (this.hardcodedAuthenticationService.authenticate(this.username, this.password)) {

    this.newUsername();
     this.router.navigate(['/registration-choice']);
      this.invalidLogin = false;
   } else {
     this.invalidLogin = true;
   }
  }
}
