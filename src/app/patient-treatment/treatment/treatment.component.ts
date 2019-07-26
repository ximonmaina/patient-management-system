import {Component, OnDestroy, OnInit} from '@angular/core';
import {TreatmentData} from '../../domainobjects/treatment.data';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserDataService} from '../../services/data/user-data.service';
import {Router} from '@angular/router';
import {DatePipe} from '@angular/common';
import {PatientData} from '../../domainobjects/patient.data';
import {ReplaySubject, Subject} from 'rxjs';
import {debounceTime, delay, filter, map, takeUntil, tap} from 'rxjs/operators';
import {UsernameService} from '../../services/username.service';
import {PatientTriageData} from '../../domainobjects/patient-triage.data';
import {TriageData} from '../../domainobjects/triage.data.';
import {DrugInventory} from '../../domainobjects/drug-inventory';
import {DrugPrescriptionData} from '../../domainobjects/drug-prescription.data';
import {DrugPrescriptionSave} from '../../domainobjects/drug-prescription';
import {PharmacyData} from '../../domainobjects/pharmacy-data';
import {PharmacyTemp} from '../../domainobjects/pharmacy-temp';
import {PatientTreatmentIdService} from '../../services/patient-treatment-id.service';
import {TreatmentPatients} from '../../domainobjects/treatment-patients';
import {TreatmentPatientsData} from '../../domainobjects/treatment-patients-data';
interface Event {
  name: string;
  value: any;
}


@Component({
  selector: 'app-treatment',
  templateUrl: './treatment.component.html',
  styleUrls: ['./treatment.component.css']
})
export class TreatmentComponent implements OnInit {

  diagnosisDate =  Date.now();
  doctorName: string;
  patientTriageData: PatientTriageData[];
  getData: TriageData[];
  events: Event[] = [];
  modalState = false;
  patientName: string;
  patientId = 0;
  patientIdTwo = 0;
  treatmentData: TreatmentData;
  treatment: FormGroup;

  // Drug inventory
  drugInventoryData: DrugInventory[];
  drugPrescription: string;
  savePatientDrugPrescription = '';
  finalDrugPrescriptionValue: string;
  counter = 0;
  commitPharmacyData: PharmacyData;
  commitDrugPrescriptions: DrugPrescriptionSave;

  // list of patients
  public patients: PatientData[];
  public allPatients: PatientData[];
  private nameOfDoctor: string;
  private drugPrescriptionOne: FormGroup;
  private dateOfPrescription: string;
  private patient: number;
  private staffName: string;

  // patients in queue
  patientTreatmentId: number;
  patientTreatments: TreatmentPatients;
  public getPatientIdFromTreatment: PatientData[];
  idForPatientInQueue: number;
  updateTreatmentPatient: TreatmentPatientsData;
  getTreatmentPatient: TreatmentPatients;
  status: boolean;
  testResult: boolean;
  nameOfDoctorPatientTreatment: string;

  constructor(private saveTreatmentData: UserDataService,
              private patientTreatmentIdUpdate: PatientTreatmentIdService,
              private treatmentPatientId: PatientTreatmentIdService,
              private getPatientTreatments: UserDataService,
              private saveDrugPrescription: UserDataService,
              private savePharmacyData: UserDataService,
              private getPatients: UserDataService,
              private getNameOfUser: UsernameService,
              private getUserDataByUsername: UserDataService,
              private router: Router,
              private formBuilder: FormBuilder,
              private getAllDrugs: UserDataService,
              private datePipe: DatePipe) { }



  ngOnInit() {

    this.getStaffName();
    this.getDrugs();
    this.treatmentPatientId.currentIdValue.subscribe(
      data => {
        this.patientTreatmentId = data;
        // console.log('Patient id');
        // console.log(this.patientTreatmentId);
      }
    );

    this.getPatientIdFromQueue();
    this.treatment = this.formBuilder.group({
      disease: ['', [Validators.required, Validators.minLength(5)]],
      caseNotes: ['', [Validators.required, Validators.minLength(5)]],
      // staffName: [{value: this.doctorName, disabled: true}],
      // dateOfDiagnosis: ['', [Validators.required]],
      patient: ['', [Validators.required]]
    });

    this.drugPrescriptionOne = this.formBuilder.group( {
      drugName: ['', Validators.required],
      drugNotes: ['']
    });


    this.getAllPatients();
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
        this.treatment.patchValue({patient: this.idForPatientInQueue});
        // console.log(this.idForPatientInQueue);
      }
    );
  }

  addDrugPrescription({value, valid}: {value: PharmacyTemp, valid: boolean}) {
    console.log(value);
  }

  saveDrugPrescriptionOkay({value, valid}: {value: PharmacyData, valid: boolean}) {
    this.commitPharmacyData = value;
    this.finalDrugPrescriptionValue = this.savePatientDrugPrescription;
    this.drugPrescription = this.finalDrugPrescriptionValue;
    this.dateOfPrescription = this.datePipe.transform(this.diagnosisDate, 'yyyy-MM-dd');
    this.nameOfDoctor = this.doctorName;
    this.staffName = this.doctorName;
    this.patient = this.patientIdTwo;

    // pharmacy data
    this.commitPharmacyData = new PharmacyData(
      0,
      this.drugPrescription,
      this.dateOfPrescription,
      this.nameOfDoctor,
      this.staffName,
      this.patient
    );

    // drug prescription data
    this.commitDrugPrescriptions = new DrugPrescriptionSave(
      0,
      this.drugPrescription,
      this.doctorName,
      this.dateOfPrescription,
      this.patient
    );
    // console.log(this.commitPharmacyData);
    // console.log(this.commitDrugPrescriptions);
    this.savePharmacyData.addPharmacyData(this.commitPharmacyData).subscribe(
      data => {
        console.log('pharmacy data save successfully');
      },
      error => {
        console.log(error);
      }
    );
    this.saveDrugPrescription.addDrugPrescriptionData(this.commitDrugPrescriptions).subscribe(
      data => {
        console.log('drug prescriptions saved successfully');
      },
      error => {
        console.log(error);
      }
    );

    // this.savePharmacyData
    this.counter = 0;
    this.savePatientDrugPrescription = '';
  }

  addDrugDescriptionDetails({value, valid}: {value: PharmacyTemp, valid: boolean}) {
    ++this.counter;
    this.savePatientDrugPrescription += this.counter + ' <p> Drug Name: ' + value.drugName + ', Drug Notes: ' + value.drugNotes + ' </p>';
    this.drugPrescriptionOne.reset();
  }

  clear() {
    this.counter = 0;
    this.savePatientDrugPrescription = '';
  }

  addPatientPrescription({value, valid}: {value: TreatmentData, valid: boolean}) {
    console.log(value);
    this.treatmentData = value;
    // console.log(this.treatmentData.patient);
    this.patientIdTwo = this.treatmentData.patient;

    this.getPatients.getPatientTriageData(this.treatmentData.patient).subscribe(
      data => {
        this.patientTriageData = data;
        this.getData = this.patientTriageData['PatientTriage'];
        console.log(this.getData);
        this.patientName = this.patientTriageData['patientFirstName'] + ' ' + this.patientTriageData['patientLastName'];



      },
      error => {
        console.log(error);
      }
    );
  }

  getDrugs() {
    return this.getAllDrugs.getDrugInventory().subscribe(
      data => {
        this.drugInventoryData = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  getStaffName() {
    this.getUserDataByUsername.getUserByUserName(this.getNameOfUser.getUsername()).subscribe(
      data => {
        this.doctorName = data['firstName'] + ' ' + data['lastName'];
        // console.log('staff name ' +  this.doctorName);
      },
      error => {
        console.log(error);
      }
    );

    return this.doctorName;

  }



  getPatientId({value, valid}: {value: TreatmentData, valid: boolean}) {
    this.treatmentData = value;
    // console.log(this.treatmentData.patient);
    this.patientId = this.treatmentData.patient;
    // console.log("triage patient id");
    // console.log(this.treatmentData.patient);


    this.getPatients.getPatientTriageData(this.treatmentData.patient).subscribe(
      data => {
        this.patientTriageData = data;
        this.getData = this.patientTriageData['PatientTriage'];
        console.log(this.getData);
        this.patientName = this.patientTriageData['patientFirstName'] + ' ' + this.patientTriageData['patientLastName'];



      },
      error => {
        console.log(error);
      }
    );
  }

  turnOn() {
    this.modalState = true;
    console.log(this.modalState);
  }

  onAdd($event) {
    this.events.push({ name: '(add)', value: $event });
    console.log('hello');
    for (const event of this.events)  {
      console.log(event);
    }

  }

  getAllPatients() {
    return this.getPatients.getPatients().subscribe(
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

  saveTreatment({value, valid}: {value: TreatmentData, valid: boolean}) {
    console.log(value);
  }


  goToPatientList() {
    this.getPatientTreatments.getOneTreatmentPatient(this.idForPatientInQueue).subscribe(
      data => {
        this.getTreatmentPatient = data;
        for (const patient of this.getTreatmentPatient.patient) {
          this.patientId = patient.id;
        }

        this.patientTreatmentId = this.getTreatmentPatient.id;
        this.status = false;
        this.testResult = this.getTreatmentPatient.testResult;
        this.nameOfDoctorPatientTreatment = this.getTreatmentPatient.nameOfDoctor;
        this.updateTreatmentPatient = new TreatmentPatientsData(
          this.patientTreatmentId, this.status, this.testResult, this.nameOfDoctorPatientTreatment, this.patientId
        );
        this.updatePatientTreatment(this.updateTreatmentPatient);
        this.router.navigate(['/main-dashboard/treatment-patients']);
      }
    );
  }

  updatePatientTreatment(treatmentPatient: TreatmentPatientsData) {
    this.getPatientTreatments.updateTreatmentPatients(treatmentPatient).subscribe(
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
