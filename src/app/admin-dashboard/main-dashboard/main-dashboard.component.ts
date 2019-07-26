import { Component, OnInit } from '@angular/core';
import {PatientTreatmentIdService} from '../../services/patient-treatment-id.service';
import {UserDataService} from '../../services/data/user-data.service';
import {TreatmentPatients} from '../../domainobjects/treatment-patients';
import {TreatmentPatientsData} from '../../domainobjects/treatment-patients-data';

@Component({
  selector: 'app-main-dashboard',
  templateUrl: './main-dashboard.component.html',
  styleUrls: ['./main-dashboard.component.css']
})
export class MainDashboardComponent implements OnInit {
  patientId: number;
  patientTreatmentId: number;
  status: boolean;
  testResult: boolean;
  nameOfDoctor: string;
  getTreatmentPatient: TreatmentPatients;
  updateTreatmentPatient: TreatmentPatientsData;

  constructor(private patientTreatmentIdUpdate: PatientTreatmentIdService,
              private getTreatmentPatients: UserDataService) { }

  ngOnInit() {
    this.patientTreatmentIdUpdate.currentIdValue.subscribe(
      data => {
        this.patientTreatmentId = data;
      }
    );
  }

  updateTreatmentPatients() {
    if (this.patientTreatmentId !== undefined) {
      this.getTreatmentPatients.getOneTreatmentPatient(this.patientTreatmentId).subscribe(
        data => {
          this.getTreatmentPatient = data;
          for (const patient of this.getTreatmentPatient.patient) {
            this.patientId = patient.id;
          }
          this.patientTreatmentId = this.getTreatmentPatient.id;
          this.status = false;
          this.testResult = this.getTreatmentPatient.testResult;
          this.nameOfDoctor = this.getTreatmentPatient.nameOfDoctor;
          this.updateTreatmentPatient = new TreatmentPatientsData(
            this.patientTreatmentId, this.status, this.testResult, this.nameOfDoctor, this.patientId
          );
          this.updatePatientTreatment(this.updateTreatmentPatient);
          console.log('Treatment patient updated successfully');
        }
      );

    }
  }

  private updatePatientTreatment(updateTreatmentPatient: TreatmentPatientsData) {
    this.getTreatmentPatients.updateTreatmentPatients(updateTreatmentPatient).subscribe(
      response => {
        // console.log('Updated successfully');
        // console.log(response);

      },
      error => {
        console.log(error);
      }
    );
  }
}
