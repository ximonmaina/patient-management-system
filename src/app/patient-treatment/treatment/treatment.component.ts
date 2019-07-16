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
interface Event {
  name: string;
  value: any;
}


@Component({
  selector: 'app-treatment',
  templateUrl: './treatment.component.html',
  styleUrls: ['./treatment.component.css']
})
export class TreatmentComponent implements OnInit, OnDestroy {

   diagnosisDate =  Date.now();
   doctorName: string;
   patientTriageData: PatientTriageData[];
   getData: TriageData[];
  events: Event[] = [];
  modalState = false;
  patientName: string;
  patientId = 0;

  constructor(private saveTreatmentData: UserDataService,
              private getPatients: UserDataService,
              private getNameOfUser: UsernameService,
              private getUserDataByUsername: UserDataService,
              private router: Router,
              private formBuilder: FormBuilder,
              private datePipe: DatePipe) { }


  treatmentData: TreatmentData;
  treatment: FormGroup;


  // list of patients
  public patients: PatientData[];
  public allPatients: PatientData[];

  // control for the selected patient for server side filtering
   public patientServerSideCtrl: FormControl = new FormControl();

   // control for filter for server server side
  public patientServerSideFilteringCtrl: FormControl = new FormControl();

  // indicate search operation is in progress
  public searching = false;

  // list of banks filtered after server side search
  public filteredServerPatients: ReplaySubject<PatientData[]> = new ReplaySubject<PatientData[]>(1);

  // subject that emits when the component has been destroyed
  protected _onDestroy = new Subject<void>();

  ngOnInit() {
    this.getAllPatients();
    this.getStaffName();

    // this.patientServerSideFilteringCtrl.valueChanges
    //   .pipe(
    //     filter(search => !!search),
    //     tap(() => this.searching = true),
    //     takeUntil(this._onDestroy),
    //     debounceTime(200),
    //     map(search => {
    //       if (!this.patients) {
    //         return [];
    //       }
    //
    //       // get data and filter it
    //       return this.patients.filter(patient => patient.patientFirstName.toLowerCase().indexOf(search) > -1);
    //     }),
    //     delay(500)
    //   )
    //   .subscribe(filteredPatients => {
    //     this.searching = false;
    //     this.filteredServerPatients.next(filteredPatients);
    //   },
    //     error => {
    //       this.searching = false;
    //       console.log(error);
    //     });

    this.treatment = this.formBuilder.group({
      disease: ['', [Validators.required, Validators.minLength(5)]],
      caseNotes: ['', [Validators.required, Validators.minLength(5)]],
      drugPrescription: ['', [Validators.required, Validators.minLength(5)]],
      // staffName: [{value: this.doctorName, disabled: true}],
      // dateOfDiagnosis: ['', [Validators.required]],
      patient: ['', [Validators.required]]
    });


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

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
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
