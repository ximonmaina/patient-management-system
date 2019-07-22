import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserDataService} from '../../services/data/user-data.service';
import {UsernameService} from '../../services/username.service';
import {Router} from '@angular/router';
import {DatePipe} from '@angular/common';
import {LabRequestData} from '../../domainobjects/lab-request.data';
import {PatientData} from '../../domainobjects/patient.data';
import {delay, filter, flatMap, map, tap} from 'rxjs/operators';
import {TreatmentPatients} from '../../domainobjects/treatment-patients';
import {PatientTreatmentIdService} from '../../services/patient-treatment-id.service';

@Component({
  selector: 'app-lab-test-request',
  templateUrl: './lab-test-request.component.html',
  styleUrls: ['./lab-test-request.component.css']
})
export class LabTestRequestComponent implements OnInit {

  testRequestDate =  Date.now();
  staffName: string;
  labRequestData: LabRequestData;
  labRequest: FormGroup;
  patients: PatientData[];
  allPatients: PatientData[];
  getLabData: LabRequestData[];
  patientName: string;
  message: string;

  // patients in queue
  patientTreatmentId: number;
  patientTreatments: TreatmentPatients;
  public getPatientIdFromTreatment: PatientData[];
  idForPatientInQueue: number;

  constructor(private saveLabReqData: UserDataService,
              private treatmentPatientId: PatientTreatmentIdService,
              private getPatientTreatments: UserDataService,
              private  getAllLabData: UserDataService,
                private deleteSelectedLabReq: UserDataService,
                private getPatients: UserDataService,
                private getNameOfUser: UsernameService,
                private getUserDataByUsername: UserDataService,
                private router: Router,
                private formBuilder: FormBuilder,
                private datePipe: DatePipe) { }

  ngOnInit() {
    this.getLabRequests();
    this.treatmentPatientId.currentIdValue.subscribe(
      data => {
        this.patientTreatmentId = data;
        // console.log('Patient id');
        // console.log(this.patientTreatmentId);
      }
    );
    this.getPatientIdFromQueue();
    this.getAllPatients();
    this.getStaffName();


    this.labRequest = this.formBuilder.group({
        testName: ['', [Validators.required, Validators.minLength(5)]],
      // dateOfRequest: [],
      // doctorName: [{value: this.staffName, disable: true}],
      patient: ['', [Validators.required]]
    });
  }

  // Patient Treatments
  getPatientIdFromQueue() {
    this.getPatientTreatments.getOneTreatmentPatient(this.patientTreatmentId).subscribe(
      data => {
        this.patientTreatments = data;
        this.getPatientIdFromTreatment = this.patientTreatments.patient;
        for (const patient of this.getPatientIdFromTreatment) {
          this.idForPatientInQueue = patient.id;
        }
        this.labRequest.patchValue({patient: this.idForPatientInQueue});
        // console.log(this.idForPatientInQueue);
      }
    );
  }
  getLabRequests() {
    return this.getAllLabData.getLabData()
      .pipe(
        tap(n => console.log(n)),
        map(result => result.filter(one => one.doctorName === this.staffName))
      )
      .subscribe(
      data => {
        this.getLabData = data;
        // console.log(data);
        this.message = '';

        // this.getLabData['patientFullName'] = this.getLabData['patient'] + ' ' + this.getLabData['patient']['patientLastName'];
      },
      error => {
        console.log(error);
      }
    );
  }

  deleteLabRequest(id) {
  this.deleteSelectedLabReq.deleteLabRequest(id).subscribe(
    response => {
      console.log(response);
      this.message = `Delete of ${id} Successful`;
      this.getLabRequests();
    },
     error => {
      console.log(error);
     }
  );
  }

  getStaffName() {
    this.getUserDataByUsername.getUserByUserName(this.getNameOfUser.getUsername()).subscribe(
      data => {
        this.staffName = data['firstName'] + ' ' + data['lastName'];
        // console.log('staff name ' +  this.staffName);
      },
      error => {
        console.log(error);
      }
    );
    return this.staffName;
  }

  getAllPatients() {
    return this.getPatients.getPatients().pipe(delay(500)).subscribe(
      data => {
        this.allPatients = data;
        this.patients = [...this.allPatients];
        // console.log(this.patients);
      },
      error => {
        console.log(error);
      }
    );
  }

  saveLabRequest({value, valid}: {value: LabRequestData, valid: boolean}) {
    value.dateOfRequest = this.datePipe.transform(this.testRequestDate, 'yyyy-MM-dd');
    value.doctorName = this.staffName;
    console.log(value);
    this.labRequestData = value;
    console.log(this.labRequestData);
    this.saveLabReqData.addLabReqData(this.labRequestData).subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.log(error);
      }
    );
  }

}
