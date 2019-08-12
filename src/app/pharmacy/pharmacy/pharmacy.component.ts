import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DrugPrescriptionSave} from '../../domainobjects/drug-prescription';
import {UserDataService} from '../../services/data/user-data.service';
import {ActivatedRoute, Router} from '@angular/router';
import {UsernameService} from '../../services/username.service';
import {DrugPrescriptionData} from '../../domainobjects/drug-prescription.data';
import {DatePipe} from '@angular/common';
import {DrugInventory} from '../../domainobjects/drug-inventory';
import {PharmacyData} from '../../domainobjects/pharmacy-data';

@Component({
  selector: 'app-pharmacy',
  templateUrl: './pharmacy.component.html',
  styleUrls: ['./pharmacy.component.css']
})
export class PharmacyComponent implements OnInit {
  pharmacyData: PharmacyData;
  drugPrescriptionData: DrugPrescriptionData;
  pharmacistName: string;
  patientId: number;
  patientName: string;
  drugPrescId: number;
  drugInventory: FormGroup;
  drugInventoryData: DrugInventory[];
  tempDrugInventory: DrugInventory[] = [];
  updateDrugInventory: DrugInventory;
  addDrugInventory: DrugInventory;


  // Pharmacy data
  dateOfPrescription: string;
  nameOfDoctor: string;
  staffName: string;
  patient: number;
  drugDescription: string;
  maxInventoryQuantity: number;
  inventory: number;
  exceedsInventory: boolean;
  patientAge: number;
  // end of pharmacy data

  drugInvDate: Date;

  // Drug inventory data
  private id: number;
  private barCodeId: number;
  private drugName: string;
  private unitPrice: number;
  private sellingPrice: number;
  private expiryDate: Date;
  private quantity: number;
  private manufacturer: string;
  private notes: string;
  private inventoryNumber: number;
  isUpdateComplete = true;


  constructor(private savePharmacyData: UserDataService,
              private router: Router,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private  getDrugPrescription: UserDataService,
              private getNameOfUser: UsernameService,
              private getUserDataByUsername: UserDataService,
              private getAllDrugs: UserDataService,
              private updateDrugInventoryData: UserDataService,
              private deleteDrugPrescription: UserDataService,
              private datePipe: DatePipe) { }

  ngOnInit() {
    this.updateDrugInventory = new DrugInventory(0, 0, '', 0,
      0, 0, null, 0, '', '');
    this.drugPrescId = this.route.snapshot.params['id'];
    this.getDrugs();
    this.getDrugPresc(this.drugPrescId);
    this.getStaffName();
    this.drugInventory = this.formBuilder.group({
      id: ['', [Validators.required]],
      drugName: ['', [Validators.required]],
      barCodeId: [{value: '', disabled: true}],
      unitPrice: [{value: '', disabled: true}],
      sellingPrice: [{value: '', disabled: true}],
      expiryDate: [{value: '', disabled: true}],
      notes: [{value: '', disabled: true}],
      quantity: ['', [Validators.required]],
      inventory: ['', Validators.required],
      manufacturer: [{value: '', disabled: true}]
    });

  }


  getDrugInv({value, valid}: {value: DrugInventory, valid: boolean}) {
    if (value.id !== null) {
      this.getDrugPrescription.getSingleDrugInventory(value.id).subscribe(
        data => {
          this.updateDrugInventory = data;
          // delete this.updateDrugInventory['inventory'];
          console.log(this.updateDrugInventory);
          this.drugInvDate = this.updateDrugInventory.expiryDate;
          this.maxInventoryQuantity = this.updateDrugInventory.inventory;
          // console.log(this.maxInventoryQuantity);
          this.drugInventory.setValue({
            id: this.updateDrugInventory.id,
            drugName: this.updateDrugInventory.drugName,
            barCodeId: this.updateDrugInventory.barCodeId,
            unitPrice: this.updateDrugInventory.unitPrice,
            sellingPrice: this.updateDrugInventory.sellingPrice,
            expiryDate: this.updateDrugInventory.expiryDate,
            notes: this.updateDrugInventory.notes,
            quantity: null,
            inventory: this.updateDrugInventory.inventory,
            manufacturer: this.updateDrugInventory.manufacturer
          });

        },
        error => {
          console.log(error);
        }
      );
    } else if (value.id === null || value.id === 0) {
      this.drugInventory.reset();
    }
  }



  getDrugPresc(id) {
    return this.getDrugPrescription.getDrugPrescriptionsById(id).subscribe(
      data => {
        this.drugPrescriptionData = data;
        for (const patient of this.drugPrescriptionData.patient) {
          this.patientName = patient.patientMiddleName + ' ' + patient.patientFirstName + ' ' + patient.patientLastName;
          this.patientId = patient.id;
          this.patientAge = patient.patientAge;
        }
        this.drugDescription = this.drugPrescriptionData['drugPrescription'];
        // tslint:disable-next-line:max-line-length
        this.dateOfPrescription = this.drugPrescriptionData.dateOfPrescription;
        this.nameOfDoctor = this.drugPrescriptionData.doctorName;
        this.patient = this.patientId;



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
        this.pharmacistName = data['firstName'] + ' ' + data['lastName'];
        this.staffName = this.pharmacistName;
        // console.log('staff name ' +  this.staffName);
      },
      error => {
        console.log(error);
      }
    );

    return this.pharmacistName;

  }

  updateDrugInventoryResults({value, valid}: {value: DrugInventory, valid: boolean}) {
    for (const drugInv of this.tempDrugInventory) {
      delete drugInv.quantity;
      console.log(drugInv);
      this.updateDrugInventoryData.updateDrugInventory(drugInv).subscribe(
        data => {
          console.log('Drug Inv updated successfully');
        },
        error => {
          console.log(error);
        }
        );
    }

    this.deleteDrugPrescription.deleteDrugPrescriptions(this.drugPrescId).subscribe(
      response => {
        console.log('drug presc deleted successfully');
        this.router.navigate(['/main-dashboard/drug-list']);
        this.tempDrugInventory = [];
      },
      error => {
        console.log(error);
      }
    );
  }

  tempSaveDrugInventoryResults({value, valid}: {value: DrugInventory, valid: boolean}) {
    this.isUpdateComplete = false;
    console.log(value);
    this.id = this.updateDrugInventory.id;
      this.drugName = this.updateDrugInventory.drugName;
      this.barCodeId = this.updateDrugInventory.barCodeId;
      this.unitPrice = this.updateDrugInventory.unitPrice;
      this.sellingPrice = this.updateDrugInventory.sellingPrice;
      this.expiryDate = this.updateDrugInventory.expiryDate;
      this.notes = this.updateDrugInventory.notes;
      this.quantity = value.quantity;
      this.inventoryNumber = Number(this.updateDrugInventory.inventory) - Number(value.quantity);
      this.manufacturer = this.updateDrugInventory.manufacturer;
      this.addDrugInventory = new DrugInventory(
        this.id, this.barCodeId, this.drugName, this.unitPrice, this.sellingPrice,
        this.inventoryNumber, this.expiryDate, this.quantity, this.manufacturer, this.notes
      );
    this.tempDrugInventory.push(this.addDrugInventory);
    this.drugInventory.reset();
    console.log(this.tempDrugInventory);
  }

  // savePharmacy() {
  //   this.pharmacyData = new PharmacyData(0, this.drugPrescription,
  //    this.dateOfPrescription,
  //    this.nameOfDoctor,
  //    this.staffName,
  //    this.patientId,
  //   );
  //
  //
  //   console.log(this.pharmacyData);
  // }

  checkInventory({value, valid}: {value: DrugInventory, valid: boolean}) {
    if (value.quantity > this.maxInventoryQuantity) {
      this.exceedsInventory = true;
    } else {
      this.exceedsInventory = false;
    }
  }

  cancelUpdate() {
    this.tempDrugInventory = [];
    this.router.navigate(['/main-dashboard/drug-list']);
  }
}
