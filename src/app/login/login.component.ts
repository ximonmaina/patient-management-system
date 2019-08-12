import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {DataService} from '../services/data.service';
import {HardcodedAuthenticationService} from '../services/hardcoded-authentication.service';
import {JwtAuthenticationService} from '../services/jwt-authentication.service';
import {UserDataService} from '../services/data/user-data.service';
import {UsernameService} from '../services/username.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = '';

  password = '';

  role = '';

  show: boolean;

  errorMessage = 'Invalid Credentials';

  invalidLogin = false;

  constructor(private router: Router,
              private  data: DataService,
              private hardcodedAuthenticationService: HardcodedAuthenticationService,
              private jwtAuthentication: JwtAuthenticationService,
              private userRole: UserDataService,
              private getUsername: UsernameService) { }

  ngOnInit() {
  }

  newUsername() {
    this.data.changeMessage(this.username);
  }

  // handleLogin() {
  //  if (this.hardcodedAuthenticationService.authenticate(this.username, this.password)) {
  //
  //   this.newUsername();
  //    this.router.navigate(['/registration-choice']);
  //     this.invalidLogin = false;
  //  } else {
  //    this.invalidLogin = true;
  //  }
  // }

  getUserRole(username) {

    this.userRole.getUserRole(username).subscribe(
        data => {
          this.role = data['roles'];
        if (this.role === 'ADMIN') {
            this.router.navigate(['/registration-choice']);
          }  else {
            this.router.navigate(['/main-dashboard/welcome']);
          }
          // console.log('roles is', this.show);
        }
    );
  }

  handleJWTAuthLogin() {
    this.jwtAuthentication.executeJWTAuthenticationService(this.username, this.password)
      .subscribe(
        data => {
          console.log(data);
          this.newUsername();
          // this.getUsername.setUserName(this.username);
          this.getUserRole(this.username);
          this.invalidLogin = false;
        },
        error => {
          console.log(error);
          this.invalidLogin = true;
        }
      );
    }
  }


