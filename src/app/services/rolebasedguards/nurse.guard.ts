import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {HardcodedAuthenticationService} from '../hardcoded-authentication.service';
import {UsernameService} from '../username.service';
import {UserDataService} from '../data/user-data.service';

@Injectable({
  providedIn: 'root'
})
export class NurseGuard implements CanActivate {

  getStaffRole: string;
  constructor(private getNameOfUser: UsernameService,
              private getUserDataByUsername: UserDataService,
              private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.getStaffName() === 'NURSE') {
      return true;
    } else {
      this.router.navigate(['/main-dashboard/authorization-error']);
      return false;
    }
  }

  getStaffName() {
    this.getUserDataByUsername.getUserByUserName(this.getNameOfUser.getUsername()).subscribe(
      data => {
        this.getStaffRole = data['roles'];
        // console.log('staff name ' +  this.getStaffRole);
      },
      error => {
        console.log(error);
      }
    );

    return this.getStaffRole;

  }
  }
