import { Component, OnInit } from '@angular/core';
import {PatientData} from '../../domainobjects/patient.data';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TriageData} from '../../domainobjects/triage.data.';
import {UserDataService} from '../../services/data/user-data.service';
import {UsernameService} from '../../services/username.service';
import {ActivatedRoute, Router} from '@angular/router';
import {TreatmentPatientsData} from '../../domainobjects/treatment-patients-data';

@Component({
  selector: 'app-add-patient-triage',
  templateUrl: './add-patient-triage.component.html',
  styleUrls: ['./add-patient-triage.component.css']
})
export class AddPatientTriageComponent implements OnInit {
  findPatient: PatientData;
  triage: FormGroup;
  triageData: TriageData;
  patientName: string;
  clinicStaffName: string;
  patientList: PatientData[];
  id: number;
  patientId: number;
  patientTreatment: TreatmentPatientsData;

  constructor(private patients: UserDataService,
              private addPatientToTreatmentQueue: UserDataService,
              private saveTriageInfo: UserDataService,
              private formBuidler: FormBuilder,
              private getNameOfUser: UsernameService,
              private getUserDataByUsername: UserDataService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.getPatientId(this.id);
    this.getStaffName();
    this.triage = this.formBuidler.group({
      patientWeight: ['', [Validators.required]],
      patientTemperature: ['', [Validators.required]],
      patientHeight: ['', [Validators.required]],
      patientBloodPressure: ['', Validators.required],
      staffName: [{value: this.clinicStaffName, disabled: true}],
      patient: ['']
    });
  }

  getStaffName() {
    this.getUserDataByUsername.getUserByUserName(this.getNameOfUser.getUsername()).subscribe(
      data => {
        this.clinicStaffName = data['firstName'] + ' ' + data['lastName'];
        // console.log('staff name ' +  this.clinicStaffName);
      },
      error => {
        console.log(error);
      }
    );

    return this.clinicStaffName;

  }

  getPatientId(id) {

    this.patients.getPatientById(id).subscribe(
      data => {
        // console.log(data);
        this.findPatient = data;
        this.patientId = this.findPatient.id;
        this.patientTreatment = new TreatmentPatientsData(
          0, false, false, '', this.patientId
        );
        this.patientName = data['patientFirstName'] + ' ' + data['patientMiddleName'] + ' ' + data['patientLastName'];
      },
      error => {
        console.log(error);
      }
    );
  }

  addPatientToQueue(patient: TreatmentPatientsData) {
    console.log(this.patientTreatment);
    this.addPatientToTreatmentQueue.addTreatmentPatientsData(patient).subscribe(
      response => {
            console.log('saved successfully');
      },
      error => {
        console.log(error);
      }
    );
  }

  saveTriage({value, valid}: {value: TriageData, valid: boolean}) {
    value.staffName = this.clinicStaffName;

    // value.patient = this.id;

    this.triageData = value;
    this.triageData['patient'] = Number(this.id);

    console.log(this.triageData);

    this.saveTriageInfo.addPatientTriage(this.triageData).subscribe(
      response => {
        // console.log('triage info saved successfully');
        // console.log(response);
        this.addPatientToQueue(this.patientTreatment);
        this.router.navigate(['/main-dashboard/patient-list']);

      },
      error => {
        console.log(error);
      }
    );
  }

}
