import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CreatePromoReq } from '../models/CreatePromoReq';
import { PromoCode } from '../models/promo-code';
import { UpdatePromoReq } from '../models/UpdatePromoReq';
import { SessionService } from './session.service';

const httpOptions = {
	headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class PromoCodeServiceService {

  baseUrl: string = '/api/PromoCode'

  constructor(private httpClient: HttpClient, private sessionService: SessionService) { }

  getPromoCodes(): Observable<PromoCode[]> {
    return this.httpClient.get<PromoCode[]>(this.baseUrl + "/retrieveAllPromoCode" + "?username=" + this.sessionService.getUsername() + "&password=" + this.sessionService.getPassword()).pipe(
      catchError(this.handleError)
    )
  }

  createPromoCode(newCode: PromoCode) : Observable<Number> {
    let createPromoCode : CreatePromoReq = new CreatePromoReq(this.sessionService.getUsername(), this.sessionService.getPassword(), newCode);
    return this.httpClient.put<Number>(this.baseUrl, createPromoCode, httpOptions).pipe(
      catchError(this.handleError)
    )
  }

  updatePromoCode(updateCode: PromoCode) : Observable<Number> {
    let updatePromoCode: UpdatePromoReq = new UpdatePromoReq(this.sessionService.getUsername(), this.sessionService.getPassword(), updateCode);
    return this.httpClient.post<Number>(this.baseUrl, updatePromoCode, httpOptions).pipe(
      catchError(this.handleError)
    )
  }

  private handleError(error: HttpErrorResponse)
    {
      let errorMessage: string = "";
      
      if (error.error instanceof ErrorEvent) 
      {		
        errorMessage = "An unknown error has occurred: " + error.error;
      } 
      else 
      {		
        errorMessage = "A HTTP error has occurred: " + error.error;
      }
      
      console.error(errorMessage);
      
      return throwError(errorMessage);		
    }


  
}
