import { Component, OnInit } from '@angular/core';
import {GetUserData} from '../domainobjects/get-user-data';
import {UserDataService} from '../services/data/user-data.service';
import {ActivatedRoute, Router} from '@angular/router';
import {UpdateUser} from '../domainobjects/update.user';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MustMatch} from '../validators/custom.validators';

@Component({
  selector: 'app-manageuser',
  templateUrl: './manageuser.component.html',
  styleUrls: ['./manageuser.component.css']
})
export class ManageuserComponent implements OnInit {

  id: number;
  getSpecificUserData: UpdateUser;
  tempData: string;
  user: FormGroup;

  constructor(private userService: UserDataService,
              private route: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.getSpecificUserData = new UpdateUser(0, '', '', '',
      '', '', '', '', '', '', 0,
      '', '');

    this.user =  this.formBuilder.group({
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

      }
    );

    this.userService.getUser(this.id).subscribe(
      response => {
        this.getSpecificUserData = response;
        this.tempData = this.getSpecificUserData.password;
        console.log(this.getSpecificUserData);
        delete this.getSpecificUserData['id'];
        delete this.getSpecificUserData['displayName'];
        delete this.getSpecificUserData['joinDate'];
        delete this.getSpecificUserData['password'];

        this.user.setValue(this.getSpecificUserData);
      },
      error => {
        console.log(error);
      }
    );
  }

  get f() { return this.user.controls; }

  saveUser({value, valid}: {value: UpdateUser, valid: boolean}) {
    this.getSpecificUserData = value;
    this.getSpecificUserData.id = this.id;
    this.getSpecificUserData.password = this.tempData;
    console.log(this.getSpecificUserData);
    this.userService.updateUser(this.getSpecificUserData).subscribe(
      response => {
        this.router.navigate(['/registered-users']);
      },
      error => {
        console.log(error);
      }
    );
  }

}
