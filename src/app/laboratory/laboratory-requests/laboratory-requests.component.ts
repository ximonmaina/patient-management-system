import { Component, OnInit } from '@angular/core';
import {LabRequestData} from '../../domainobjects/lab-request.data';
import {UserDataService} from '../../services/data/user-data.service';

@Component({
  selector: 'app-laboratory-requests',
  templateUrl: './laboratory-requests.component.html',
  styleUrls: ['./laboratory-requests.component.css']
})
export class LaboratoryRequestsComponent implements OnInit {

  labRequests: LabRequestData[];

  constructor(private getLabReqs: UserDataService) { }

  ngOnInit() {
    this.getLabRequests();
  }

  getLabRequests() {
    return this.getLabReqs.getLabData().subscribe(
      data => {
        console.log(data);
        this.labRequests = data;
      },
      error => {
        console.log(error);
      }
    );
  }

}
