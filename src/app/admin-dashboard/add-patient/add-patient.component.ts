import { Component, OnInit } from '@angular/core';
import {PatientData} from '../../domainobjects/patient.data';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserDataService} from '../../services/data/user-data.service';
import {Router} from '@angular/router';
import {DatePipe} from '@angular/common';
// import {$} from 'protractor';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.css']
})
export class AddPatientComponent implements OnInit {

  patientData: PatientData;
  patient: FormGroup;

  constructor(private savePatientData: UserDataService,
              private router: Router,
              private formBuilder: FormBuilder,
              private datePipe: DatePipe) { }

  ngOnInit() {
    // $('.datepicker').pickadate();

    this.patient = this.formBuilder.group( {
      patientFirstName: ['', [Validators.required, Validators.minLength(2)]],
      patientLastName: ['', [Validators.required, Validators.minLength(2)]],
      patientMiddleName: ['', [Validators.required, Validators.minLength(2)]],
      patientIdentityNumber: [''],
      patientDateOfBirth: ['', Validators.required],
      patientAge: ['', Validators.required],
      patientGender: ['', Validators.required],
      patientCountry: [''],
      patientCounty: [''],
      patientPhoneNumber: ['', Validators.required],
      patientAddress: [''],
      patientEmailAddress: ['', Validators.email]
      }
    );
  }

  savePatient({value, valid}: {value: PatientData, valid: boolean}) {
    value.patientDateOfBirth = this.datePipe.transform(value.patientDateOfBirth, 'yyyy-MM-dd');
    this.patientData = value;
    console.log(this.patientData);

    this.savePatientData.addPatient(this.patientData).subscribe(
      response => {
        console.log(response);
        this.router.navigate(['/main-dashboard/patient-list']);
      },
      error => {
        console.log(error);
      }
    );
  }

}
