import { Component, OnInit } from '@angular/core';
import {DrugInventoryData} from '../../domainobjects/drug-inventory-data';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserDataService} from '../../services/data/user-data.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-update-drug',
  templateUrl: './update-drug.component.html',
  styleUrls: ['./update-drug.component.css']
})
export class UpdateDrugComponent implements OnInit {

  drugInventoryData: DrugInventoryData;
  drugInventory: FormGroup;
  id: number;
  getInventoryList: DrugInventoryData;

  constructor(private saveDrugInventoryData: UserDataService,
              private getDrugInventory: UserDataService,
              private router: Router,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private datePipe: DatePipe) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    console.log(this.id);
    this.drugInventoryData = new DrugInventoryData(0, 0 ,
      '', 0, 0, 0, '', '', '');

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

    this.getDrugInventory.getDrugInventoryById(this.id).subscribe(
      response => {
        this.drugInventoryData = response;
        console.log(this.drugInventoryData);
        delete this.drugInventoryData['id'];
        this.drugInventoryData.expiryDate = this.datePipe.transform(this.drugInventoryData.expiryDate, 'yyyy-MM-dd');
        this.drugInventory.setValue(this.drugInventoryData);
      },
      error => {
        console.log(error);
      }
    );
  }


  saveDrug({value, valid}: {value: DrugInventoryData, valid: boolean}) {
    value.expiryDate = this.datePipe.transform(value.expiryDate, 'yyyy-MM-dd');
    this.drugInventoryData = value;
    console.log(this.drugInventoryData);
    this.drugInventoryData.id = this.id;
    this.saveDrugInventoryData.updateDrugInventoryData(this.drugInventoryData).subscribe(
      response => {
        this.router.navigate(['/main-dashboard/drug-inv-list']);
      },
      error => {
        console.log(error);
      }
    );
  }

}
