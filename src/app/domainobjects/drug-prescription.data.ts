import {PatientData} from './patient.data';

export class DrugPrescriptionData {
  constructor(
    public id: number,
    public drugPrescription: string,
    public doctorName: string,
    public dateOfPrescription: string,
    public patient: PatientData[]
  ) {}
}
