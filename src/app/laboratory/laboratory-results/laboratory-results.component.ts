import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Laboratory} from '../../domainobjects/laboratory';
import {UserDataService} from '../../services/data/user-data.service';
import {ActivatedRoute, Router} from '@angular/router';
import {LabRequestData} from '../../domainobjects/lab-request.data';
import {UsernameService} from '../../services/username.service';
import {DatePipe} from '@angular/common';
import {LabRequest} from '../../domainobjects/lab-request';

@Component({
  selector: 'app-laboratory-results',
  templateUrl: './laboratory-results.component.html',
  styleUrls: ['./laboratory-results.component.css']
})
export class LaboratoryResultsComponent implements OnInit {

  labresults: FormGroup;
  laboratoryData: Laboratory;
  labRequestsId: number;
  labRequestsData: LabRequestData;
  testResultDate = Date.now();
  labTechName: string;
  patientName: string;
  testname: string;
  doctorname: string;
  patientId: number;

  // Lab Requests
  labReqid: number;
  testName: string;
  dateOfRequest: string;
  doctorName: string;
  status: boolean;
  patient: number;
  updateLabReq: LabRequest;
  labRequestData: LabRequestData;

  constructor(private saveLabResultsData: UserDataService,
             private updateLabRequest: UserDataService,
              private getLabReqs: UserDataService,
             private router: Router,
              private route: ActivatedRoute,
              private formBuidler: FormBuilder,
              private getLabReq: UserDataService,
              private getNameOfUser: UsernameService,
              private getUserDataByUsername: UserDataService,
              private datePipe: DatePipe) { }

  ngOnInit() {
    this.labRequestsId = this.route.snapshot.params['id'];
    console.log(this.labRequestsId);
    this.getLabRequest(this.labRequestsId);
    this.getStaffName();


    this.labresults = this.formBuidler.group({
      // testName: ['', [Validators.required, Validators.minLength(5)]],
      testResult: ['', [Validators.required, Validators.minLength(5)]],
      // testResultDate: [''],
      // staffName: [''],
      // nameOfDoctor: [''],
      // patient: ['']
    });
  }

  getLabRequest(id) {
  return this.getLabReq.getLabRequestById(id).subscribe(
    data => {
      this.labRequestsData = data;
      // console.log(this.labRequestsData);
      this.testname = this.labRequestsData.testName;
      for (const patient of this.labRequestsData.patient) {
        this.patientName = patient.patientMiddleName + ' ' + patient.patientFirstName + ' ' + patient.patientLastName;
        this.patientId = patient.id;
      }
      this.doctorname = this.labRequestsData.doctorName;
    },
    error => {
      console.log(error);
    }
  );
  }

  getStaffName() {
    this.getUserDataByUsername.getUserByUserName(this.getNameOfUser.getUsername()).subscribe(
      data => {
        this.labTechName = data['firstName'] + ' ' + data['lastName'];
        // console.log('staff name ' +  this.doctorName);
      },
      error => {
        console.log(error);
      }
    );

    return this.labTechName;

  }

  deleteLabResult(id) {
    this.getLabReq.deleteLabRequest(id).subscribe(
      response => {
        this.router.navigate(['/main-dashboard/laboratory-requests']);
      },
      error => {
        console.log(error);
      }
    );
  }

  saveLabResults({value, valid}: {value: Laboratory, valid: boolean}) {
    this.laboratoryData = value;
    this.laboratoryData.patient = this.patientId;
    this.laboratoryData.testName = this.testname;
    this.laboratoryData.testResultDate = this.datePipe.transform(this.testResultDate, 'yyyy-MM-dd');
    this.laboratoryData.staffName = this.labTechName;
    this.laboratoryData.nameOfDoctor = this.doctorname;
    console.log(this.laboratoryData);

    this.saveLabResultsData.addLabResultsData(this.laboratoryData).subscribe(
      data => {
        this.deleteLabResult(this.labRequestsId);
      },
      error => {
        console.log(error);
      }
    );
  }

  back() {
    this.labReqid = this.labRequestsId;
    console.log(this.labReqid);
    this.getLabReqs.getLabRequestById(this.labReqid).subscribe(
      data => {
        this.labRequestData = data;
        for (const patient of this.labRequestData.patient) {
          this.patient = patient.id;
        }
        this.testName = this.labRequestData.testName;
        this.dateOfRequest = this.labRequestData.dateOfRequest;
        this.doctorName = this.labRequestData.doctorName;
        this.status = false;
        this.updateLabReq = new LabRequest(
          this.labReqid, this.testName, this.dateOfRequest, this.doctorName, this.status, this.patient
        );
        this.updateOneLabRequest(this.updateLabReq);
      }
    );
  }

  updateOneLabRequest( labReq: LabRequest) {
    console.log(labReq);
    this.updateLabRequest.updateLabReqData(labReq).subscribe(
      response => {
        console.log(`updated successfully`);
        this.router.navigate(['/main-dashboard/laboratory-requests']);
      },
      error => {
        console.log(error);
      }
    );
  }
}
