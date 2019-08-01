import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {GetUserData} from '../../domainobjects/get-user-data';
import {API_URL} from '../../app.constants';
import {JwtAuthenticationService, TOKEN} from '../jwt-authentication.service';
import {UserData} from '../../domainobjects/user-data';
import {UpdateUser} from '../../domainobjects/update.user';
import {GetUserRole} from '../../domainobjects/get.user.role';
import {PatientData} from '../../domainobjects/patient.data';
import {TriageData} from '../../domainobjects/triage.data.';
import {PatientTriageData} from '../../domainobjects/patient-triage.data';
import {LabRequestData} from '../../domainobjects/lab-request.data';
import {LabResultData} from '../../domainobjects/lab-result.data';
import {Laboratory} from '../../domainobjects/laboratory';
import {DrugPrescriptionData} from '../../domainobjects/drug-prescription.data';
import {DrugInventory} from '../../domainobjects/drug-inventory';

import {DrugPrescriptionSave} from '../../domainobjects/drug-prescription';
import {DrugInventoryData} from '../../domainobjects/drug-inventory-data';
import {UpdatePatientData} from '../../domainobjects/update-patient-data';
import {TreatmentPatientsData} from '../../domainobjects/treatment-patients-data';
import {TreatmentPatients} from '../../domainobjects/treatment-patients';
import {TreatmentData} from '../../domainobjects/treatment.data';
import {LabRequest} from '../../domainobjects/lab-request';
import {PatientHistory} from '../../domainobjects/patient-history';
import {Javamail} from '../../domainobjects/javamail';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor(private http: HttpClient,
             private jwtAuthenticationService: JwtAuthenticationService) { }

  userMail(sendmail: Javamail) {
    const headers = new HttpHeaders({
      Authorization: this.jwtAuthenticationService.getAuthenticatedToken()
    });
    return this.http.post(`${API_URL}/sendemail/sendUserMail`, sendmail, {headers});
  }
  getPatientHistory(id) {
    const headers = new HttpHeaders({
      Authorization: this.jwtAuthenticationService.getAuthenticatedToken()
    });
    // console.log(`${this.jwtAuthenticationService.getAuthenticatedToken()}`);
    return this.http.get<PatientHistory[]>(`${API_URL}/patienthistory/getPatientHistory/${id}`, {headers});
  }

  addTreatmentPatientsData(treatmentPatientsData: TreatmentPatientsData) {
    const headers = new HttpHeaders({
      Authorization: this.jwtAuthenticationService.getAuthenticatedToken()
    });
    return this.http.post(`${API_URL}/treatmentpatients/addTreatmentPatients`, treatmentPatientsData, {headers});
  }

  getTreatmentPatients() {
    const headers = new HttpHeaders({
      Authorization: this.jwtAuthenticationService.getAuthenticatedToken()
    });
    // console.log(`${this.jwtAuthenticationService.getAuthenticatedToken()}`);
    return this.http.get<TreatmentPatients[]>(`${API_URL}/treatmentpatients/getAllTreatmentPatients`, {headers});
  }

  getOneTreatmentPatient(id) {
    const headers = new HttpHeaders({
      Authorization: this.jwtAuthenticationService.getAuthenticatedToken()
    });
    // console.log(`${this.jwtAuthenticationService.getAuthenticatedToken()}`);
    return this.http.get<TreatmentPatients>(`${API_URL}/treatmentpatients/getTreatmentPatients/${id}`, {headers});
  }

  updateTreatmentPatients(treatmentPatientsData: TreatmentPatientsData) {
    const headers = new HttpHeaders({
      Authorization: this.jwtAuthenticationService.getAuthenticatedToken()
    });

    return this.http.patch<DrugInventoryData>(`${API_URL}/treatmentpatients/updateTreatmentPatients`, treatmentPatientsData, {headers});

  }

  deleteTreatmentPatients(id) {
    const headers = new HttpHeaders({
      Authorization: this.jwtAuthenticationService.getAuthenticatedToken()
    });
    return this.http.delete(`${API_URL}/treatmentpatients/deleteTreatmentPatients/${id}`, {headers});
  }

  addDrugPrescriptionData(drugPrescriptionSave: DrugPrescriptionSave) {
    const headers = new HttpHeaders({
      Authorization: this.jwtAuthenticationService.getAuthenticatedToken()
    });
    return this.http.post(`${API_URL}/drugprescription/addDrugPresc`, drugPrescriptionSave, {headers});
  }


  deleteDrugFromInventory(id) {
    const headers = new HttpHeaders({
      Authorization: this.jwtAuthenticationService.getAuthenticatedToken()
    });
    return this.http.delete(`${API_URL}/drug-inventory/deleteDrugInv/${id}`, {headers});
  }
  getSingleDrugInventory(id) {
    const headers = new HttpHeaders({
      Authorization: this.jwtAuthenticationService.getAuthenticatedToken()
    });
    // console.log(`${this.jwtAuthenticationService.getAuthenticatedToken()}`);
    return this.http.get<DrugInventory>(`${API_URL}/drug-inventory/getDrugInventory/${id}`, {headers});
  }
  getDrugInventory() {
    const headers = new HttpHeaders({
      Authorization: this.jwtAuthenticationService.getAuthenticatedToken()
    });
    // console.log(`${this.jwtAuthenticationService.getAuthenticatedToken()}`);
    return this.http.get<DrugInventory[]>(`${API_URL}/drug-inventory/getAllDrugs`, {headers});
  }

  getDrugInventoryById(id: number) {
    const headers = new HttpHeaders({
      Authorization: this.jwtAuthenticationService.getAuthenticatedToken()
    });
    // console.log(`${this.jwtAuthenticationService.getAuthenticatedToken()}`);
    return this.http.get<DrugInventoryData>(`${API_URL}/drug-inventory/getDrugInventory/${id}`, {headers});
  }

  addDrugInventoryData(drugInventory: DrugInventoryData) {
    const headers = new HttpHeaders({
      Authorization: this.jwtAuthenticationService.getAuthenticatedToken()
    });
    return this.http.post(`${API_URL}/drug-inventory/addDrugInventory`, drugInventory, {headers});
  }

  updateDrugInventory(drugInventory: DrugInventory) {
    const headers = new HttpHeaders({
      Authorization: this.jwtAuthenticationService.getAuthenticatedToken()
    });

    return this.http.patch<DrugInventoryData>(`${API_URL}/drug-inventory/updateDrugInv`, drugInventory, {headers});

  }

  updateDrugInventoryData(drugInventory: DrugInventoryData) {
    const headers = new HttpHeaders({
      Authorization: this.jwtAuthenticationService.getAuthenticatedToken()
    });

    return this.http.patch<DrugInventoryData>(`${API_URL}/drug-inventory/updateDrugInv`, drugInventory, {headers});

  }

  getDrugPrescriptionsById(id: number) {
    const headers = new HttpHeaders({
      Authorization: this.jwtAuthenticationService.getAuthenticatedToken()
    });
    // console.log(`${this.jwtAuthenticationService.getAuthenticatedToken()}`);
    return this.http.get<DrugPrescriptionData>(`${API_URL}/drugprescription/getDrugPresc/${id}`, {headers});
  }
  getDrugPrescriptions() {
    const headers = new HttpHeaders({
      Authorization: this.jwtAuthenticationService.getAuthenticatedToken()
    });
    // console.log(`${this.jwtAuthenticationService.getAuthenticatedToken()}`);
    return this.http.get<DrugPrescriptionData[]>(`${API_URL}/drugprescription/getAllDrugPrescriptions`, {headers});
  }

  deleteDrugPrescriptions(id) {
    const headers = new HttpHeaders({
      Authorization: this.jwtAuthenticationService.getAuthenticatedToken()
    });
    return this.http.delete(`${API_URL}/drugprescription/deleteDrugPresc/${id}`, {headers});
  }

  addLabResultsData(labResults: Laboratory) {
    const headers = new HttpHeaders({
      Authorization: this.jwtAuthenticationService.getAuthenticatedToken()
    });
    return this.http.post(`${API_URL}/laboratory/addLabData`, labResults, {headers});
  }
  getPatients() {
    const headers = new HttpHeaders({
      Authorization: this.jwtAuthenticationService.getAuthenticatedToken()
    });
    // console.log(`${this.jwtAuthenticationService.getAuthenticatedToken()}`);
    return this.http.get<PatientData[]>(`${API_URL}/patient/getpatients`, {headers});
  }
  getLabRequestById(id: number) {
    const headers = new HttpHeaders({
      Authorization: this.jwtAuthenticationService.getAuthenticatedToken()
    });
    return this.http.get<LabRequestData>(`${API_URL}/labrequest/getLabTestReq/${id}`, {headers});
  }
  getLabResultsData() {
    const headers = new HttpHeaders({
      Authorization: this.jwtAuthenticationService.getAuthenticatedToken()
    });
    // console.log(`${this.jwtAuthenticationService.getAuthenticatedToken()}`);
    return this.http.get<LabResultData[]>(`${API_URL}/laboratory/getAllLabData`, {headers});
  }
  deleteLabRequest(id) {
    const headers = new HttpHeaders({
      Authorization: this.jwtAuthenticationService.getAuthenticatedToken()
    });
    return this.http.delete(`${API_URL}/labrequest/deleteLabRequest/${id}`, {headers});
  }


  addLabReqData(labRequest: LabRequestData) {
    const headers = new HttpHeaders({
      Authorization: this.jwtAuthenticationService.getAuthenticatedToken()
    });
    return this.http.post(`${API_URL}/labrequest/addLabTestReq`, labRequest, {headers});
  }

  updateLabReqData(labRequest: LabRequest) {
    const headers = new HttpHeaders({
      Authorization: this.jwtAuthenticationService.getAuthenticatedToken()
    });

    return this.http.patch<LabRequest>(`${API_URL}/labrequest/updateLabTestRequest`, labRequest, {headers});

  }

  getLabData() {
    const headers = new HttpHeaders({
      Authorization: this.jwtAuthenticationService.getAuthenticatedToken()
    });
    // console.log(`${this.jwtAuthenticationService.getAuthenticatedToken()}`);
    return this.http.get<LabRequestData[]>(`${API_URL}/labrequest/getAllLabTestReq`, {headers});
  }

   addPatientTriage(triage: TriageData) {
     const headers = new HttpHeaders({
       Authorization: this.jwtAuthenticationService.getAuthenticatedToken()
     });
     return this.http.post(`${API_URL}/patienttriage/addPatientTriage`, triage, {headers});
   }


  updatePatientData(patientData: UpdatePatientData) {
    const headers = new HttpHeaders({
      Authorization: this.jwtAuthenticationService.getAuthenticatedToken()
    });

    return this.http.patch<UpdatePatientData>(`${API_URL}/patient/updatepatient`, patientData, {headers});

  }
   addPatient(patient: PatientData) {
     const headers = new HttpHeaders({
       Authorization: this.jwtAuthenticationService.getAuthenticatedToken()
     });
     return this.http.post(`${API_URL}/patient/addpatient`, patient, {headers});
   }

   getPatientById(id: number) {
     const headers = new HttpHeaders({
       Authorization: this.jwtAuthenticationService.getAuthenticatedToken()
     });
     return this.http.get<PatientData>(`${API_URL}/patient/getpatient/${id}`, {headers});
   }

   getPatientTriageData(id: number) {
     const headers = new HttpHeaders({
       Authorization: this.jwtAuthenticationService.getAuthenticatedToken()
     });
     return this.http.get<PatientTriageData[]>(`${API_URL}/patient/getpatient/${id}`, {headers});
   }

  retrieveUsers() {
    const headers = new HttpHeaders({
      Authorization: this.jwtAuthenticationService.getAuthenticatedToken()
    });
    console.log(`${this.jwtAuthenticationService.getAuthenticatedToken()}`);
    return this.http.get<GetUserData[]>(`${API_URL}/register/getusers`, {headers});
  }

  getUserRole(username) {
    const headers = new HttpHeaders({
      Authorization: this.jwtAuthenticationService.getAuthenticatedToken()
    });
    return this.http.get<GetUserRole>(`${API_URL}/register/getrole/${username}`, {headers});
  }

  getUserByUserName(username) {
    const headers = new HttpHeaders({
      Authorization: this.jwtAuthenticationService.getAuthenticatedToken()
    });
    return this.http.get<UserData>(`${API_URL}/register/getrole/${username}`, {headers});
  }

  getUser(id) {
    const headers = new HttpHeaders({
      Authorization: this.jwtAuthenticationService.getAuthenticatedToken()
    });
    return this.http.get<GetUserData>(`${API_URL}/register/getuser/${id}`, {headers});
  }

  addUser(user: UserData) {
    const headers = new HttpHeaders({
      Authorization: this.jwtAuthenticationService.getAuthenticatedToken()
    });
    // console.log(headers);

    return this.http.post(`${API_URL}/register/adduser`, user, {headers});
  }

  updateUser(user: UpdateUser) {
    const headers = new HttpHeaders({
      Authorization: this.jwtAuthenticationService.getAuthenticatedToken()
    });

    return this.http.patch<GetUserData>(`${API_URL}/register/updateuser`, user, {headers});

  }

  deleteUser(id) {
    const headers = new HttpHeaders({
      Authorization: this.jwtAuthenticationService.getAuthenticatedToken()
    });
    return this.http.delete(`${API_URL}/register/deleteuser/${id}`, {headers});
  }

  addPatientTreatmentData(treatment: TreatmentData) {
    const headers = new HttpHeaders({
      Authorization: this.jwtAuthenticationService.getAuthenticatedToken()
    });
    return this.http.post(`${API_URL}/treatment/addPatientTreatmentData`, treatment, {headers});
  }

  getAuthHeader() {
    return new HttpHeaders({
      Authorization: this.jwtAuthenticationService.getAuthenticatedToken()
    });
  }


}
