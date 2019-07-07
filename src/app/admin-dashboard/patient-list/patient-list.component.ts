import { Component, OnInit } from '@angular/core';
import {UserDataService} from '../../services/data/user-data.service';
import {PatientData} from '../../domainobjects/patient.data';
import {Router} from '@angular/router';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent implements OnInit {

  patientList: PatientData[];
  constructor(private patients: UserDataService,
              private route: Router) { }

  ngOnInit() {
    this.listPatients();
  }

  listPatients() {
    return this.patients.getPatients().subscribe(
      data => {
        this.patientList = data;
        console.log(this.patients);
      },
      error => {
        console.log(error);
      }
    );
  }

  addPatientTriage(id) {
    this.route.navigate([]);
  }

}
