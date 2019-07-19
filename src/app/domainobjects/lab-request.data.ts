import {PatientData} from './patient.data';

export class LabRequestData {
  patientName: string;
  constructor (
    public id: number,
    public testName: string,
    public dateOfRequest: string,
    public doctorName: string,
    public patient: PatientData[]
  ) {}

  getPatientName (): string {
    for (let patient of this.patient) {
      this.patientName = patient.patientFirstName + patient.patientLastName;
    }
    return this.patientName;
 }
}
