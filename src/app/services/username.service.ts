import { Injectable } from '@angular/core';
import {UserDataService} from './data/user-data.service';

export const USER_NAME = 'user_name';
@Injectable({
  providedIn: 'root'
})
export class UsernameService {
   username: string;
  constructor() { }

  setUserName(username: string) {
    this.username = username;
    localStorage.setItem(USER_NAME, this.username);
  }

  getUsername(): string {
    return sessionStorage.getItem('authenticatedUser');
  }
}
