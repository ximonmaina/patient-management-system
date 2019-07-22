import { Component, OnInit } from '@angular/core';
import {TreatmentPatients} from '../../domainobjects/treatment-patients';
import {UserDataService} from '../../services/data/user-data.service';
import {Router} from '@angular/router';
import {PatientTreatmentIdService} from '../../services/patient-treatment-id.service';
import {TreatmentPatientsData} from '../../domainobjects/treatment-patients-data';

@Component({
  selector: 'app-treatment-patients',
  templateUrl: './treatment-patients.component.html',
  styleUrls: ['./treatment-patients.component.css']
})
export class TreatmentPatientsComponent implements OnInit {

  treatmentPatients: TreatmentPatients[];
  id: number;
  updateTreatmentPatient: TreatmentPatientsData;
  getTreatmentPatient: TreatmentPatients;
  patientId: number;
  patientTreatmentId: number;
  status: boolean;
  testResult: boolean;
  nameOfDoctor: string;

  constructor(private getTreatmentPatients: UserDataService,
              private patientTreatmentIdUpdate: PatientTreatmentIdService,
              private route: Router) { }

  ngOnInit() {
    this.getAllTreatmentPatients();
  }


  getAllTreatmentPatients() {
     return this.getTreatmentPatients.getTreatmentPatients().subscribe(
       data => {
         this.treatmentPatients = data;
       },
       error => {
         console.log(error);
       }
     );
  }

  goToTreatment(id: number) {
    this.id = id;
    this.getTreatmentPatients.getOneTreatmentPatient(this.id).subscribe(
      data => {
        this.getTreatmentPatient = data;
        for (const patient of this.getTreatmentPatient.patient) {
          this.patientId = patient.id;
        }

        this.patientTreatmentId = this.getTreatmentPatient.id;
        this.status = true;
        this.testResult = this.getTreatmentPatient.testResult;
        this.nameOfDoctor = this.getTreatmentPatient.nameOfDoctor;
        this.updateTreatmentPatient = new TreatmentPatientsData(
          this.patientTreatmentId, this.status, this.testResult, this.nameOfDoctor, this.patientId
        );
        this.updatePatientTreatment(this.updateTreatmentPatient);
      }
    );
    this.patientTreatmentIdUpdate.changeIdValue(this.id);
    this.route.navigate(['/main-dashboard/main-treatment/treatment']);
  }

  updatePatientTreatment(treatmentPatient: TreatmentPatientsData) {
     this.getTreatmentPatients.updateTreatmentPatients(treatmentPatient).subscribe(
       response => {
         // console.log('Updated successfully');
         // console.log(response);
         this.getAllTreatmentPatients();
       },
       error => {
         console.log(error);
       }
     );
  }

  removePatient(id: number) {
     this.getTreatmentPatients.deleteTreatmentPatients(id).subscribe(
       response => {
         this.getAllTreatmentPatients();
       }
     );
  }
}
