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

  constructor(private saveTreatmentData: UserDataService,
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
    this.getAllPatients();
    this.getStaffName();
    this.getDrugs();
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
    console.log(this.patientId);


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

  saveTreatment({value, valid}: {value: TreatmentData, valid: boolean}) {
      console.log(value);
  }



}
