import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {UsernameService} from '../username.service';
import {UserDataService} from '../data/user-data.service';

@Injectable({
  providedIn: 'root'
})
export class DoctorGuard implements CanActivate {

  getStaffRole: string;
  constructor(private getNameOfUser: UsernameService,
              private getUserDataByUsername: UserDataService,
              private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.getStaffName() === 'DOCTOR') {
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
