export class TreatmentData {
  constructor (
    public id: number,
    public disease: string,
    public caseNotes: string,
    public drugPrescription: string,
    public staffName: string,
    public dateOfDiagnosis: string,
    public patient: number
  ) {}
}
