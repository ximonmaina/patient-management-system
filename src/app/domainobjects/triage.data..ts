export class TriageData {
  constructor(
    public id: number,
    public patientWeight: number,
    public patientTemperature: number,
    public patientHeight: number,
    public patientBloodPressure: string,
    public staffName: string,
    public patient: number
  ) { }
}
