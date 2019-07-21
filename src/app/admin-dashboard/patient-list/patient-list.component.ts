import { Component, OnInit } from '@angular/core';
import {UserDataService} from '../../services/data/user-data.service';
import {PatientData} from '../../domainobjects/patient.data';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TriageData} from '../../domainobjects/triage.data.';
import {UsernameService} from '../../services/username.service';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent implements OnInit {

  patientList: PatientData[];


  constructor(private route: Router,
              private patients: UserDataService
             ) { }

  ngOnInit() {
    this.listPatients();
  }



  listPatients() {
    return this.patients.getPatients().subscribe(
      data => {
        this.patientList = data;
        // console.log(this.patients);
      },
      error => {
        console.log(error);
      }
    );
  }

  getPatientId(id) {
    this.route.navigate(['/main-dashboard/add-triage', id]);
  }


  updatePatient(id: number) {
    this.route.navigate(['/main-dashboard/update-patient', id]);
  }
}
