import {PatientData} from './patient.data';

export  class LabResultTwoData {
  constructor(
    public id: number,
    public testName: string,
    public testResult: string,
    public testResultDate: string,
    public staffName: string,
    public nameOfDoctor: string,
    public patientName: string
  ) {}
}
