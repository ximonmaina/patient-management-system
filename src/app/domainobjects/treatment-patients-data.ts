import {PatientData} from './patient.data';

export class TreatmentPatientsData {
  constructor(
    public id: number,
    public status: boolean,
    public testResult: boolean,
    public nameOfDoctor: string,
    public patient: number
  ) {}
}
