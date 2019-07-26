import {PatientData} from './patient.data';

export class LabRequest {
  constructor (
    public id: number,
    public testName: string,
    public dateOfRequest: string,
    public doctorName: string,
    public status: boolean,
    public patient: number
  ) {}
}
