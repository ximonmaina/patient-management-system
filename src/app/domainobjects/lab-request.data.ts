import {PatientData} from './patient.data';

export class LabRequestData {
  constructor (
    public id: number,
    public testName: string,
    public dateOfRequest: string,
    public doctorName: string,
    public patient: PatientData[]
  ) {}

  getDoctorName (): string {
    return this.doctorName;
}
}
