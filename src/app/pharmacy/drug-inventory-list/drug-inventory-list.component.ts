import { Component, OnInit } from '@angular/core';
import {DrugInventory} from '../../domainobjects/drug-inventory';
import {UserDataService} from '../../services/data/user-data.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-drug-inventory-list',
  templateUrl: './drug-inventory-list.component.html',
  styleUrls: ['./drug-inventory-list.component.css']
})
export class DrugInventoryListComponent implements OnInit {
  drugInventoryData: DrugInventory[];
  message: string;

  constructor(private getDrugInventoryList: UserDataService,
              private deleteDrugById: UserDataService,
              private route: Router) { }

  ngOnInit() {
    this.retrieveDrugList();
  }

  retrieveDrugList() {
    this.getDrugInventoryList.getDrugInventory().subscribe(
      data => {
        this.drugInventoryData = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  updateDrug(id: number) {
    this.route.navigate(['/main-dashboard/update-drug', id]);
  }

  deletedrug(id: number) {
     this.deleteDrugById.deleteDrugFromInventory(id).subscribe(
       response => {
         this.message = `Delete of ${id} Successful`;
         this.retrieveDrugList();
       },
       error => {
         console.log(error);
       }
     );
  }

  removeMessage() {
    this.message = '';
  }
}
