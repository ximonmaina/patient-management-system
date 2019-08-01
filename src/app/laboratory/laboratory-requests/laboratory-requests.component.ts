import { Component, OnInit } from '@angular/core';
import {LabRequestData} from '../../domainobjects/lab-request.data';
import {UserDataService} from '../../services/data/user-data.service';
import {Router} from '@angular/router';
import {PatientData} from '../../domainobjects/patient.data';
import {LabRequest} from '../../domainobjects/lab-request';

@Component({
  selector: 'app-laboratory-requests',
  templateUrl: './laboratory-requests.component.html',
  styleUrls: ['./laboratory-requests.component.css']
})
export class LaboratoryRequestsComponent implements OnInit {

  labRequests: LabRequestData[];
  updateLabReq: LabRequest;
  labRequestData: LabRequestData;
  id: number;
  testName: string;
  dateOfRequest: string;
  doctorName: string;
  status: boolean;
  patient: number;


  constructor(private getLabReqs: UserDataService,
              private updateLabReqsData: UserDataService,
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

  goToLab(id: number) {
    this.id = id;
    console.log(this.id);
    this.getLabReqs.getLabRequestById(this.id).subscribe(
      data => {
        this.labRequestData = data;
        for (const patient of this.labRequestData.patient) {
          this.patient = patient.id;
        }
        this.testName = this.labRequestData.testName;
        this.dateOfRequest = this.labRequestData.dateOfRequest;
        this.doctorName = this.labRequestData.doctorName;
        this.status = true;
        this.updateLabReq = new LabRequest(
          this.id, this.testName, this.dateOfRequest, this.doctorName, this.status, this.patient
        );
        this.updateOneLabRequest(this.id, this.updateLabReq);
      }
    );
    this.getLabRequests();
  }

  updateOneLabRequest(id: number, labReq: LabRequest) {
    this.updateLabReqsData.updateLabReqData(labReq).subscribe(
       response => {
         this.route.navigate(['/main-dashboard/lab-results', id]);
       },
      error => {
         console.log(error);
      }
    );
  }

  refresh() {
    this.getLabRequests();
  }
}
