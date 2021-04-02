import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Driver } from '../models/driver';
import { UpdateDriverReq } from '../models/update-driver-req';
import { SessionService } from './session.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class DriverManagementService {

  baseUrl: string = '/api/driverManagement'

  constructor(private httpClient: HttpClient, private sessionService: SessionService) { }

  getDrivers(): Observable<Driver[]> {
    return this.httpClient.get<Driver[]>(this.baseUrl + "/retrieveAllDrivers?username=" + this.sessionService.getUsername() + "&password=" + this.sessionService.getPassword()).pipe(
      catchError(this.handleError)
    )
  }

  updateDriver(driver: Driver): Observable<any> {
    let updateDriverReq: UpdateDriverReq = new UpdateDriverReq(this.sessionService.getUsername(), this.sessionService.getPassword(), driver);
    return this.httpClient.post<any>(this.baseUrl, updateDriverReq, httpOptions).pipe(
      catchError(this.handleError)
    )
  }

  deleteDriver(driver: Driver): Observable<any> {
    return this.httpClient.delete<any>(this.baseUrl + "/" + driver.driverId + "?username=" + this.sessionService.getUsername() + "&password=" + this.sessionService.getPassword()).pipe(
      catchError(this.handleError)
    )
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

