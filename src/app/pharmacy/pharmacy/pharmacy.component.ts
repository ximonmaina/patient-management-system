import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {DrugPrescriptionSave} from '../../domainobjects/drug-prescription';
import {UserDataService} from '../../services/data/user-data.service';
import {ActivatedRoute, Router} from '@angular/router';
import {UsernameService} from '../../services/username.service';
import {DrugPrescriptionData} from '../../domainobjects/drug-prescription.data';

@Component({
  selector: 'app-pharmacy',
  templateUrl: './pharmacy.component.html',
  styleUrls: ['./pharmacy.component.css']
})
export class PharmacyComponent implements OnInit {
  pharmacy: FormGroup;
  drugPrescriptionData: DrugPrescriptionData;
  pharmacistName: string;
  doctorname: string;
  patientId: number;
  patientName: string;
  drugPrescId: number;

  constructor(private savePharmacyData: UserDataService,
              private router: Router,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private drugInvFormBuilder: FormBuilder,
              private  getDrugPrescription: UserDataService,
              private getNameOfUser: UsernameService,
              private getUserDataByUsername: UserDataService) { }

  ngOnInit() {
    this.drugPrescId = this.route.snapshot.params['id'];
    this.getStaffName();
    this.getDrugPresc(this.drugPrescId);
  }

  getDrugPresc(id) {
    return this.getDrugPrescription.getDrugPrescriptionsById(id).subscribe(
      data => {
        this.drugPrescriptionData = data;
        // console.log(this.drugPrescriptionData);
        for (const patient of this.drugPrescriptionData.patient) {
          this.patientName = patient.patientMiddleName + ' ' + patient.patientFirstName + ' ' + patient.patientLastName;
          this.patientId = patient.id;
        }
        this.doctorname = this.drugPrescriptionData.doctorName;
      },
      error => {
        console.log(error);
      }
    );
  }

  getStaffName() {
    this.getUserDataByUsername.getUserByUserName(this.getNameOfUser.getUsername()).subscribe(
      data => {
        this.pharmacistName = data['firstName'] + ' ' + data['lastName'];
        // console.log('staff name ' +  this.doctorName);
      },
      error => {
        console.log(error);
      }
    );

    return this.pharmacistName;

  }

  savePharmacyResults({value, valid}: {value: DrugPrescriptionSave, valid: boolean}) {
    console.log(value);
  }

}
