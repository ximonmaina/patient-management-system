import { Component, OnInit } from '@angular/core';
import {GetUserData} from '../domainobjects/get-user-data';
import {UserDataService} from '../services/data/user-data.service';
import {ActivatedRoute, Router} from '@angular/router';
import {UpdateUser} from '../domainobjects/update.user';

@Component({
  selector: 'app-manageuser',
  templateUrl: './manageuser.component.html',
  styleUrls: ['./manageuser.component.css']
})
export class ManageuserComponent implements OnInit {

  id: number;
  getUser: GetUserData;
  getSpecificUserData: UpdateUser;

  constructor(private retrieveUser: UserDataService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.getSpecificUserData = new UpdateUser(0, '', '', '',
      '', '', '', '', '', '', 0,
      '', '');

    this.retrieveUser.getUser(this.id).subscribe(
      response => {
        this.getUser = response;
        this.getSpecificUserData = response;
        console.log(this.getUser);
        console.log(this.getSpecificUserData);
      },
      error => {
        console.log(error);
      }
    );


  }

}
