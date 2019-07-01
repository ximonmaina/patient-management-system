import { Component, OnInit } from '@angular/core';
import {GetUserData} from '../domainobjects/get-user-data';
import {UserDataService} from '../services/data/user-data.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-registeredusers',
  templateUrl: './registeredusers.component.html',
  styleUrls: ['./registeredusers.component.css']
})
export class RegisteredusersComponent implements OnInit {

  users: GetUserData[];
  message: string;
  constructor(private user: UserDataService,
              private route: Router) { }

  ngOnInit() {
    this.retrieveUsers();
  }

  retrieveUsers() {
    this.user.retrieveUsers().subscribe(
      response => {
        console.log(response);
        this.users = response;
      },
      error => {
        console.log(error);
      }
    );
  }

  updateUser(id) {
    this.route.navigate(['/edit-user', id]);
  }

  deleteUser(id) {
    this.user.deleteUser(id).subscribe(
      response => {
        console.log(response);
        this.message = `Delete of ${id} Successful`;
        this.retrieveUsers();
      },
      error => {
        console.log(error);
      }
    );
  }

}
