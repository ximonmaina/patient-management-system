import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API_URL} from '../app.constants';
import {map} from 'rxjs/operators';
import {USER_NAME} from './username.service';

export const TOKEN = 'token';
export const AUTHENTICATED_USER =  'authenticatedUser';
@Injectable({
  providedIn: 'root'
})
export class JwtAuthenticationService {
   token: string;
   constructor(private http: HttpClient) {}

  executeJWTAuthenticationService(username, password) {
    return this.http.post<any>(`${API_URL}/authenticate`,
      {username, password}).pipe(
      map(
        data => {
          this.token = data['token'];
          sessionStorage.setItem(AUTHENTICATED_USER, username);
          sessionStorage.setItem(TOKEN, `Bearer ${this.token}`);
          return data;
        }
      )
    );
  }

  getAuthenticatedUser() {
    return sessionStorage.getItem('authenticatedUser');
  }

  getAuthenticatedToken() {
    return sessionStorage.getItem('token');
  }
  isUserLoggedIn() {
    const user =  sessionStorage.getItem('authenticatedUser');
    return !(user === null);
  }

  logout() {
    sessionStorage.removeItem('authenticatedUser');
    sessionStorage.removeItem('token');

  }
}
