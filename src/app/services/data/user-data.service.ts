import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {GetUserData} from '../../domainobjects/get-user-data';
import {API_URL} from '../../app.constants';
import {JwtAuthenticationService, TOKEN} from '../jwt-authentication.service';
import {UserData} from '../../domainobjects/user-data';
import {UpdateUser} from '../../domainobjects/update.user';
import {GetUserRole} from '../../domainobjects/get.user.role';
import {PatientData} from '../../domainobjects/patient.data';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor(private http: HttpClient,
             private jwtAuthenticationService: JwtAuthenticationService) { }

   getPatients() {
     const headers = new HttpHeaders({
       Authorization: this.jwtAuthenticationService.getAuthenticatedToken()
     });
     // console.log(`${this.jwtAuthenticationService.getAuthenticatedToken()}`);
     return this.http.get<PatientData[]>(`${API_URL}/patient/getpatients`, {headers});
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

  getAuthHeader() {
    return new HttpHeaders({
      Authorization: this.jwtAuthenticationService.getAuthenticatedToken()
    });
  }


}
