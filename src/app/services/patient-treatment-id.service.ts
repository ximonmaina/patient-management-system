import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientTreatmentIdService {
  private patientTreatmentIdSource = new BehaviorSubject(undefined);
  currentIdValue = this.patientTreatmentIdSource.asObservable();
  constructor() { }

  changeIdValue(id: number) {
    this.patientTreatmentIdSource.next(id);
  }
}
