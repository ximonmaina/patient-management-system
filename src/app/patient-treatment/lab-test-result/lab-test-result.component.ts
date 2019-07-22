import { Component, OnInit } from '@angular/core';
import {PatientData} from '../../domainobjects/patient.data';
import {UserDataService} from '../../services/data/user-data.service';
import {UsernameService} from '../../services/username.service';
import {Router} from '@angular/router';
import {LabResultData} from '../../domainobjects/lab-result.data';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LabRequestData} from '../../domainobjects/lab-request.data';
import {delay} from 'rxjs/operators';
import {PatientId} from '../../domainobjects/patient-id';
import {LabResultTwoData} from '../../domainobjects/lab-result-two.data';
import {TreatmentPatients} from '../../domainobjects/treatment-patients';
import {PatientTreatmentIdService} from '../../services/patient-treatment-id.service';

@Component({
  selector: 'app-lab-test-result',
  templateUrl: './lab-test-result.component.html',
  styleUrls: ['./lab-test-result.component.css']
})
export class LabTestResultComponent implements OnInit {

  patients: PatientData[];
  allPatients: PatientData[];
  labResultsData: LabResultData[];
  labResult: FormGroup;
  patientName: string;
  patientId: PatientId;
  patientLabDataResult: PatientData;
  patientLabResultWithName: LabResultTwoData[];
  s: LabResultTwoData[] = [];

  // patients in queue
  patientTreatmentId: number;
  patientTreatments: TreatmentPatients;
  public getPatientIdFromTreatment: PatientData[];
  idForPatientInQueue: number;

  constructor(private getLabData: UserDataService,
              private treatmentPatientId: PatientTreatmentIdService,
              private getPatientTreatments: UserDataService,
              private getNameOfUser: UsernameService,
              private router: Router,
              private formBuidler: FormBuilder,
              private getPatients: UserDataService) { }

  ngOnInit() {
    this.getLabResults();
    this.treatmentPatientId.currentIdValue.subscribe(
      data => {
        this.patientTreatmentId = data;
        // console.log('Patient id');
        // console.log(this.patientTreatmentId);
      }
    );
    this.getPatientIdFromQueue();
    this.getAllPatients();
    this.labResult = this.formBuidler.group({
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
        this.labResult.patchValue({patient: this.idForPatientInQueue});
        // console.log(this.idForPatientInQueue);
      }
    );
  }

  getLabResults() {
    return this.getLabData.getLabResultsData().subscribe(
      data => {
        this.labResultsData = data;
        console.log(data);
    },
      error => {
        console.log(error);
      }
    );
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

  labResults({value, valid}: {value: PatientId, valid: boolean}) {
    this.s = [];
    console.log(this.s);
    this.patientId = value;
    console.log(this.patientId.patient);
    return this.getPatients.getPatientById(this.patientId.patient).subscribe(
      data => {
        this.patientLabDataResult = data;
        this.patientName = this.patientLabDataResult['patientFirstName'] + ' ' + this.patientLabDataResult['patientLastName'];
        this.patientLabResultWithName = this.patientLabDataResult.labData;
        for (const lab of this.patientLabResultWithName) {
                console.log(lab);
                lab['patientName'] = this.patientName;
                this.s.push(lab);
        }
        // this.patientLabResultWithName['patientName'] = this.patientName;
        // console.log(this.s);
      }
    );
  }

}
