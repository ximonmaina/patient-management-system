import { Component, OnInit } from '@angular/core';
import {LabRequestData} from '../../domainobjects/lab-request.data';
import {UserDataService} from '../../services/data/user-data.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-laboratory-requests',
  templateUrl: './laboratory-requests.component.html',
  styleUrls: ['./laboratory-requests.component.css']
})
export class LaboratoryRequestsComponent implements OnInit {

  labRequests: LabRequestData[];
  status = false;
  id: number;
  isId: boolean;
  disablebutton = [false, false];

  constructor(private getLabReqs: UserDataService,
              private route: Router) { }

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

  goToLab(index, id) {
    this.id = id;
    this.disablebutton[index] = true;
    console.log(this.id);
    if (this.id === id) {
      this.isId = true;
    } else {
      this.isId = false;
    }
    this.status = true;
    this.route.navigate(['/main-dashboard/lab-results', id]);
    this.getLabRequests();
  }

}
