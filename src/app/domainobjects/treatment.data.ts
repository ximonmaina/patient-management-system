export class TreatmentData {
  constructor (
    public id: number,
    public disease: string,
    public caseNotes: string,
    public staffName: string,
    public dateOfDiagnosis: string,
    public drugPrescription: string,
    public laboratoryId: number,
    public patient: number
  ) {}
}
