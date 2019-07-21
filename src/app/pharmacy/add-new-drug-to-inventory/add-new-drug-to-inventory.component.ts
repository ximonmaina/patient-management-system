import { Component, OnInit } from '@angular/core';
import {DrugInventory} from '../../domainobjects/drug-inventory';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserDataService} from '../../services/data/user-data.service';
import {Router} from '@angular/router';
import {DatePipe} from '@angular/common';
import {PatientData} from '../../domainobjects/patient.data';
import {DrugInventoryData} from '../../domainobjects/drug-inventory-data';

@Component({
  selector: 'app-add-new-drug-to-inventory',
  templateUrl: './add-new-drug-to-inventory.component.html',
  styleUrls: ['./add-new-drug-to-inventory.component.css']
})
export class AddNewDrugToInventoryComponent implements OnInit {

  drugInventoryData: DrugInventoryData;
  drugInventory: FormGroup;

  constructor(private saveDrugInventoryData: UserDataService,
              private router: Router,
              private formBuilder: FormBuilder,
              private datePipe: DatePipe) { }

  ngOnInit() {
    this.drugInventory = this.formBuilder.group({
      barCodeId: ['', [Validators.required, Validators.minLength(7)]],
      drugName: ['', [Validators.required, Validators.minLength(2)]],
      unitPrice: ['', [Validators.required, Validators.minLength(1)]],
      sellingPrice: ['', [Validators.required, Validators.minLength(1)]],
      inventory: ['', [Validators.required]],
      expiryDate: ['', Validators.required],
      manufacturer: ['', Validators.required],
      notes: ['']
    });
  }

  saveDrug({value, valid}: {value: DrugInventoryData, valid: boolean}) {
    value.expiryDate = this.datePipe.transform(value.expiryDate, 'yyyy-MM-dd');
    this.drugInventoryData = value;
    console.log(this.drugInventoryData);
    this.saveDrugInventoryData.addDrugInventoryData(this.drugInventoryData).subscribe(
      response => {
        this.router.navigate(['/main-dashboard/drug-inv-list']);
      },
      error => {
        console.log(error);
      }
    );
  }
}
