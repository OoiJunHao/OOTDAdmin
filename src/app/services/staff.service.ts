import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Staff } from "../models/staff";
import { SessionService } from './session.service';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
    providedIn: 'root'
})
export class StaffService {

    baseUrl = '/api/Staff';

    constructor(private httpClient: HttpClient, private sessionService: SessionService) { }

    staffLogin(username: string, password: string): Observable<Staff> {
        return this.httpClient.get<Staff>(this.baseUrl + "/staffLogin?username=" + username + "&password=" + password).pipe(
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
