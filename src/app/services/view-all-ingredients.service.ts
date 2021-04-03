import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CreateIngredientReq } from '../models/create-ingredient-req';
import { Ingredient } from '../models/ingredient';
import { UpdateIngredientReq } from '../models/update-ingredient-req';
import { SessionService } from './session.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class ViewAllIngredientsService {

  baseUrl: string = '/api/ingredientManagement'

  constructor(private httpClient: HttpClient, private sessionService: SessionService) { }


  getIngredients(): Observable<Ingredient[]> {
    return this.httpClient.get<Ingredient[]>(this.baseUrl + "/retrieveAllIngredients?username=" + this.sessionService.getUsername() + "&password=" + this.sessionService.getPassword()).pipe(
      catchError(this.handleError)
    )
  }

  createIngredient(newIngred: Ingredient): Observable<Ingredient> {
    let createIngredient: CreateIngredientReq = new CreateIngredientReq(this.sessionService.getUsername(), this.sessionService.getPassword(), newIngred);
    return this.httpClient.put<Ingredient>(this.baseUrl, createIngredient, httpOptions).pipe(
      catchError(this.handleError)
    )
  }

  updateIngredient(newIngred: Ingredient): Observable<Ingredient> {
    console.log(">>>>>>>>> UPDATING <<<<<<<<<<<");
    let updateIngredient: UpdateIngredientReq = new UpdateIngredientReq(this.sessionService.getUsername(), this.sessionService.getPassword(), newIngred);
    console.log(updateIngredient.ingredient);
    return this.httpClient.post<Ingredient>(this.baseUrl, updateIngredient, httpOptions).pipe(
      catchError(this.handleError)
    )
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage: string = "";

    if (error.error instanceof ErrorEvent) {
      errorMessage = "An unknown error has occurred: " + error.error;
    }
    else {
      errorMessage = "A HTTP error has occurred: " + error.error;
    }

    console.error(errorMessage);

    return throwError(errorMessage);
  }

}
