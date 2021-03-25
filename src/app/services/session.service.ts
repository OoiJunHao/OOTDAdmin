import { Injectable } from '@angular/core';
import { AccessRightEnum } from '../models/access-right-enum.enum';
import { Staff } from '../models/staff';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor() { }

  getIsLogin(): boolean {
    if (sessionStorage.isLogin == "true") {
      return true;
    } else {
      return false;
    }
  }

  setIsLogin(isLogin: boolean): void {
    sessionStorage.isLogin = isLogin;
  }

  getCurrentStaff(): Staff {
    return JSON.parse(sessionStorage.currentStaff);
  }

  setCurrentStaff(currentStaff: Staff): void {
    sessionStorage.currentStaff = JSON.stringify(currentStaff);
  }

  getUsername(): string {
    return sessionStorage.username;
  }



  setUsername(username: string | undefined): void {
    sessionStorage.username = username;
  }



  getPassword(): string {
    return sessionStorage.password;
  }



  setPassword(password: string | undefined): void {
    sessionStorage.password = password;
  }

  checkAccessRight(path: string): boolean {
    if (this.getIsLogin()) {
      let staff: Staff = this.getCurrentStaff();
      if (staff.accessRightEnum == AccessRightEnum.ADMIN) {
        //all staff management pages
        if (path == "") {
          return true;
        }
      } else if (staff.accessRightEnum == AccessRightEnum.EMPLOYEE) {
        //everything else
        if (path == " ") {
          return true;
        } else {
          return false;
        }
      }
      return false;
    } else {
      return false;
    }
  }
}
