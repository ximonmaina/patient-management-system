import {LabResultTwoData} from './lab-result-two.data';

export class PatientData {
  constructor (
  public id: number,
  public patientFirstName: string,
  public patientLastName: string,
  public patientMiddleName: string,
  public patientIdentityNumber: number,
  public patientDateOfBirth: string,
  public patientAge: number,
  public patientGender: string,
  public patientCountry: string,
  public patientCounty: string,
  public patientPhoneNumber: number,
  public patientAddress: string,
  public patientEmailAddress: string,
  public patientClinicId: string,
  public labData: LabResultTwoData[]
) {}
}
