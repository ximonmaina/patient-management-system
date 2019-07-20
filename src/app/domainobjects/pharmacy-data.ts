export class PharmacyData {
  constructor(
    public id: number,
    public drugPrescription: string,
    public dateOfPrescription: string,
    public nameOfDoctor: string,
    public staffName: string,
    public patient: number
  ) {}

}
