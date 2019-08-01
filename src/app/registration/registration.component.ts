import { Component, OnInit } from '@angular/core';
import {UserData} from '../domainobjects/user-data';
import {UserDataService} from '../services/data/user-data.service';
import {Router} from '@angular/router';
import {FormControl, FormGroup, FormBuilder , Validators} from '@angular/forms';
import {validate} from 'codelyzer/walkerFactory/walkerFn';
import {MustMatch} from '../validators/custom.validators';
import {Javamail} from '../domainobjects/javamail';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  userData: UserData;
  user: FormGroup;
  receivermail: Javamail;

  constructor(private saveUserService: UserDataService,
              private sendUserMail: UserDataService,
              private router: Router,
              private formBuidler: FormBuilder) { }


  ngOnInit() {
    this.user =  this.formBuidler.group({
        firstName: ['', [Validators.required, Validators.minLength(2)]],
        lastName: ['', [Validators.required, Validators.minLength(2)]],
        middleName: [' ', [Validators.required, Validators.minLength(2)]],
        country: [''],
        emailAddress: ['', [Validators.required, Validators.email]],
        poBoxAddress: [''],
        phoneNumber: ['', Validators.required],
        idNumber: ['', Validators.required],
        county: [''],
        roles: ['', Validators.required],
        userName: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', Validators.required]

      },
      {
        validator: MustMatch('password', 'confirmPassword')
      });
  }

   get f() { return this.user.controls; }

  saveUser({value, valid}: {value: UserData, valid: boolean}) {
    delete value['confirmPassword'];
    this.userData = value;
    // console.log(this.userData);
    this.receivermail = new Javamail(
      this.userData.userName, this.userData.password, this.userData.emailAddress
    );

    // console.log(this.receivermail);

    this.saveUserService.addUser(this.userData).subscribe(
      response => {
        console.log(response);
        this.router.navigate(['/registered-users']);
      },
      error => {
        console.log(error);
      }
    );
    this.getMailAndSend(this.receivermail);
  }

  getMailAndSend(mail: Javamail) {
    return this.sendUserMail.userMail(mail).subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }

}
