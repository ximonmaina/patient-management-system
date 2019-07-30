export class PatientHistory {
  constructor(
    // Patient
    public  patientFirstName: string,
  public  patientLastName: string,
  public  patientMiddleName: string,
  public  patientAge: number,
  public  patientGender: string,

  // triage data
  public  patientWeight: number,
  public  patientTemperature: number,
  public  patientHeight: number,
  public  patientBloodPressure: string,
  public  nurseName: string,
  public  triageDate: Date,

  // treatment
  public  disease: string,
  public  caseNotes: string,
  public  doctorName: string,
  public  drugPrescription: string,

  // laboratory
  public  testName: string,
  public  testResult: string,
  public  labTechName: string
  ) {}
}
