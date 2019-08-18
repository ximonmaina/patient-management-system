import { Component, OnInit } from '@angular/core';
import {PatientData} from '../../domainobjects/patient.data';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserDataService} from '../../services/data/user-data.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DatePipe} from '@angular/common';
import {UpdatePatientData} from '../../domainobjects/update-patient-data';

@Component({
  selector: 'app-update-patient',
  templateUrl: './update-patient.component.html',
  styleUrls: ['./update-patient.component.css']
})
export class UpdatePatientComponent implements OnInit {
  patientData: UpdatePatientData;
  patient: FormGroup;
  id: number;

  constructor(private savePatientData: UserDataService,
              private getPatientById: UserDataService,
              private route: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder,
              private datePipe: DatePipe) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
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

    this.getPatientById.getPatientById(this.id).subscribe(
      data => {
        this.patientData = data;
        delete  this.patientData['id'];
        delete this.patientData['PatientTriage'];
        delete this.patientData['patientTreatment'];
        delete this.patientData['labData'];
        delete this.patientData['PharmacyData'];
        this.patientData.patientDateOfBirth = this.datePipe.transform(this.patientData.patientDateOfBirth, 'yyyy-MM-dd');
        this.patient.setValue(this.patientData);
      },
      error => {
        console.log(error);
    }
    );
  }

  savePatient({value, valid}: {value: PatientData, valid: boolean}) {
    value.patientDateOfBirth = this.datePipe.transform(value.patientDateOfBirth, 'yyyy-MM-dd');
    this.patientData = value;
    console.log(this.patientData);
    this.patientData.id = this.id;
    delete this.patientData['PatientTriage'];
    delete this.patientData['patientTreatment'];
    delete this.patientData['labData'];
    delete this.patientData['PharmacyData'];
    delete this.patientData['patientClinicId'];
    this.savePatientData.updatePatientData(this.patientData).subscribe(
      response => {
        // console.log(response);
        this.router.navigate(['/main-dashboard/patient-list']);
      },
      error => {
        console.log(error);
      }
    );
  }

}
