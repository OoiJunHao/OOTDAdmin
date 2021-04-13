import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http'
import { Observable, throwError } from 'rxjs'
import { catchError } from 'rxjs/operators'

import { SessionService } from './session.service'
import { Meal } from '../models/meal'
import { NgForm } from '@angular/forms';
import { Category } from '../models/category.enum';
import { Ingredient } from '../models/ingredient';
import { CreateMealReq } from '../models/CreateMealReq';
import { UpdateMealReq } from '../models/UpdateMealReq';
import { GetMealsByCategories } from '../models/GetMealsByCategories';

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
    console.log(this.sessionService.getUsername());
    return this.httpClient.get<Meal[]>(this.baseUrl + "/retrieveAllMeals" + "/?username=" + this.sessionService.getUsername() + "&password=" + this.sessionService.getPassword()).pipe
    (
      catchError(this.handleError)
    )
  }

  createMeal(newMeal: Meal) {
    let createMealReq: CreateMealReq = new CreateMealReq(this.sessionService.getUsername(), this.sessionService.getPassword(), newMeal);
    return this.httpClient.put<number>(this.baseUrl, createMealReq, httpOptions).pipe(
      catchError(this.handleError)
    )
  }

  retrieveCategories() : Observable<Category[]> {
    return this.httpClient.get<Category[]>(this.baseUrl + "/retrieveAllMealCategories" + "/?username=" + this.sessionService.getUsername() + "&password=" + this.sessionService.getPassword()).pipe(
      catchError(this.handleError)
    )
  }

  retrieveIngredients(): Observable<Ingredient[]> {
    return this.httpClient.get<Ingredient[]>(this.baseUrl + "/retrieveAllIngredients" + "/?username=" + this.sessionService.getUsername() + "&password=" + this.sessionService.getPassword()).pipe(
      catchError(this.handleError)
    )
  }

  deleteMeal(meal: Meal): Observable<any> {
    return this.httpClient.delete<any>(this.baseUrl + "/" + meal.mealId + "?username=" + this.sessionService.getUsername() + "&password=" + this.sessionService.getPassword()).pipe(
      catchError(this.handleError)
    )
  }

  retrieveMeal(mealId: number): Observable<Meal> {
    return this.httpClient.get<Meal>(this.baseUrl + "/retrieveMeal/" + mealId + "/?username=" + this.sessionService.getUsername() + "&password=" + this.sessionService.getPassword()).pipe(
      catchError(this.handleError)
    )
  }

  retrieveMealByCategories(categories: Category[]): Observable<Meal[]> {
    let getMeal : GetMealsByCategories = new GetMealsByCategories(this.sessionService.getUsername(), this.sessionService.getPassword(), categories);
    return this.httpClient.post<Meal[]>(this.baseUrl + "/retrieveByCategories", getMeal, httpOptions).pipe(
      catchError(this.handleError)
    )
  }

  updateMeal(meal: Meal): Observable<any> {
    let updateMealReq : UpdateMealReq = new UpdateMealReq(this.sessionService.getUsername(), this.sessionService.getPassword(), meal);
    return this.httpClient.post<any>(this.baseUrl, updateMealReq, httpOptions).pipe(
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
