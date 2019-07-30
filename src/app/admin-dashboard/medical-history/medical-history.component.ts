import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PatientData} from '../../domainobjects/patient.data';
import {PatientId} from '../../domainobjects/patient-id';
import {LabResultTwoData} from '../../domainobjects/lab-result-two.data';
import {PatientHistory} from '../../domainobjects/patient-history';
import {UserDataService} from '../../services/data/user-data.service';
import {UsernameService} from '../../services/username.service';
import {Router} from '@angular/router';
import {delay} from 'rxjs/operators';

@Component({
  selector: 'app-medical-history',
  templateUrl: './medical-history.component.html',
  styleUrls: ['./medical-history.component.css']
})
export class MedicalHistoryComponent implements OnInit {
  patientHistory: FormGroup;
  patients: PatientData[];
  allPatients: PatientData[];
  patientName: string;
  patientId: PatientId;
  patientHistoryData: PatientHistory[];

  constructor( private getNameOfUser: UsernameService,
               private router: Router,
               private formBuidler: FormBuilder,
               private getPatients: UserDataService,
               private retrievePatientHistory: UserDataService
              ) { }

  ngOnInit() {
    this.getAllPatients();
    this.patientHistory = this.formBuidler.group({
      patient: ['', [Validators.required]]
    });
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


  getPatientHistory({value, valid}: {value: PatientId, valid: boolean}) {
    this.patientHistoryData = [];
    this.patientId = value;
    return this.retrievePatientHistory.getPatientHistory(this.patientId.patient).subscribe(
        data => {
          this.patientHistoryData = data;
        },
      error => {
          console.log(error);
      }
    );
  }
}
