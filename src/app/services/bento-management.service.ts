import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http'
import { Observable, throwError } from 'rxjs'
import { catchError } from 'rxjs/operators'

import { SessionService } from './session.service'
import { Meal } from '../models/meal'
import { NgForm } from '@angular/forms';
import { Category } from '../models/category.enum';
import { Ingredient } from '../models/ingredient';

const httpOptions = {
	headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class BentoManagementService {

  baseUrl: string = '/api/Bento'

  constructor(private httpClient: HttpClient, private sessionService: SessionService) { }


  getProducts() : Observable<Meal[]> {
    return this.httpClient.get<Meal[]>(this.baseUrl + "/retrieveAllMeals").pipe
    (
      catchError(this.handleError)
    )
  }

  createMeal(newMeal: Meal) {
    return this.httpClient.put<number>(this.baseUrl, newMeal, httpOptions).pipe(
      catchError(this.handleError)
    )
  }

  retrieveCategories() : Observable<Category[]> {
    return this.httpClient.get<Category[]>(this.baseUrl + "/retrieveAllMealCategories").pipe(
      catchError(this.handleError)
    )
  }

  retrieveIngredients(): Observable<Ingredient[]> {
    return this.httpClient.get<Ingredient[]>(this.baseUrl + "/retrieveAllIngredients").pipe(
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
        errorMessage = "A HTTP error has occurred: " + `HTTP ${error.status}: ${error.error}`;
      }
      
      console.error(errorMessage);
      
      return throwError(errorMessage);		
    }
}
