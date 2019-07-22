import {PatientData} from './patient.data';

export class TreatmentPatients {
  constructor(
    public id: number,
    public status: boolean,
    public testResult: boolean,
    public nameOfDoctor,
    public patient: PatientData[]
  ) {}
}
