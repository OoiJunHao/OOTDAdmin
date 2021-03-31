import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { SessionService } from './session.service';
import { SaleTransaction } from '../models/sale-transaction';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class SaleTransactionManagementService {

  baseUrl: string = '/api/saleTransactionManagement'

  constructor(private httpClient: HttpClient, private sessionService: SessionService) { }

  getAllSaleTransactions(): Observable<SaleTransaction[]> {
    console.log(this.sessionService.getUsername());
    return this.httpClient.get<SaleTransaction[]>(this.baseUrl + "/retrieveAllSaleTransactions" + "/?username=" + this.sessionService.getUsername() + "&password=" + this.sessionService.getPassword()).pipe
      (
        catchError(this.handleError)
      )
  }


  private handleError(error: HttpErrorResponse) {
    let errorMessage: string = "";
    if (error.error instanceof ErrorEvent) {
      errorMessage = "An unknown error has occurred: " + error.error;
    } else {
      errorMessage = "A HTTP error has occurred: " + `HTTP ${error.status}: ${error.error}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
