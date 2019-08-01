import { Component, OnInit } from '@angular/core';
import {DrugPrescriptionData} from '../../domainobjects/drug-prescription.data';
import {UserDataService} from '../../services/data/user-data.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-drug-prescription-list',
  templateUrl: './drug-prescription-list.component.html',
  styleUrls: ['./drug-prescription-list.component.css']
})
export class DrugPrescriptionListComponent implements OnInit {

  drugPrescriptions: DrugPrescriptionData[];
  id: number;
  disablebutton = [false, false];

  constructor(private getDrugPrescriptions: UserDataService,
              private route: Router) { }

  ngOnInit() {
    this.getAllDrugPrescriptions();
  }

  getAllDrugPrescriptions() {
    return this.getDrugPrescriptions.getDrugPrescriptions().subscribe(
      data => {
        this.drugPrescriptions = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  goToPharmacy(index, id) {
    this.id = id;
    this.disablebutton[index] = true;
    console.log(this.id);
    this.route.navigate(['/main-dashboard/pharmacy', id]);
    this.getAllDrugPrescriptions();
  }

  refresh() {
    this.getAllDrugPrescriptions();
  }
}
