import {PatientData} from './patient.data';

export class Laboratory {
  constructor(
    public id: number,
    public testName: string,
    public testResult: string,
    public testResultDate: string,
    public staffName: string,
    public nameOfDoctor: string,
    public patient: number,
  ) {}
}
