import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CreateStaffReq } from '../models/create-staff-req';
import { Staff } from '../models/staff';
import { UpdateStaffReq } from '../models/update-staff-req';
import { SessionService } from './session.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class StaffManagementService {

  baseUrl: string = '/api/staffManagement'

  constructor(private httpClient: HttpClient, private sessionService: SessionService) { }

  createNewStaff(newStaff: Staff): Observable<number> {
    let createStaff: CreateStaffReq = new CreateStaffReq(this.sessionService.getUsername(), this.sessionService.getPassword(), newStaff);
    return this.httpClient.put<number>(this.baseUrl, createStaff, httpOptions).pipe
      (
        catchError(this.handleError)
      );
  }

  getStaffs(): Observable<Staff[]> {
    return this.httpClient.get<Staff[]>(this.baseUrl + "/retrieveAllStaffs?username=" + this.sessionService.getUsername() + "&password=" + this.sessionService.getPassword()).pipe(
      catchError(this.handleError)
    );
  }

  getStaffByStaffId(staffId: number): Observable<Staff> {
    return this.httpClient.get<Staff>(this.baseUrl + "/retrieveStaff/" + staffId + "?username=" + this.sessionService.getUsername() + "&password=" + this.sessionService.getPassword()).pipe(
      catchError(this.handleError)
    );
  }

  updateStaff(staff: Staff): Observable<any> {
    console.log(staff);
    let updateStaffReq: UpdateStaffReq = new UpdateStaffReq(this.sessionService.getUsername(), this.sessionService.getPassword(), staff);
    console.log(updateStaffReq);
    return this.httpClient.post<any>(this.baseUrl, updateStaffReq, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  deleteStaff(staffId: number): Observable<any> {
    return this.httpClient.delete<any>(this.baseUrl + "/" + staffId + "?username=" + this.sessionService.getUsername() + "&password=" + this.sessionService.getPassword()).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage: string = "";

    if (error.error instanceof ErrorEvent) {
      errorMessage = "An unknown error has occurred: " + error.error;
    }
    else {
      errorMessage = "A HTTP error has occurred: " + `HTTP ${error.status}: ${error.error}`;
    }

    console.error(errorMessage);

    return throwError(errorMessage);
  }
}
