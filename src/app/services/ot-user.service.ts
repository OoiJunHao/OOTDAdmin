import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http'
import { Observable, throwError } from 'rxjs'
import { catchError } from 'rxjs/operators'
import { SessionService } from './session.service'

import { OTUser } from "../models/ot-user";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class OtUserService {
  baseUrl: string = '/api/OTUser'

  constructor(private httpClient: HttpClient, private sessionService: SessionService) { }

  getAllUsers(): Observable<OTUser[]> {
    return this.httpClient.get<OTUser[]>(this.baseUrl + '/retrieveAllOTUsers').pipe(catchError(this.handleError));
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
