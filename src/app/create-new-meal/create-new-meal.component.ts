import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Category } from '../models/category.enum';
import { Ingredient } from '../models/ingredient';
import { Meal } from '../models/meal';
import { BentoManagementService } from '../services/bento-management.service';

@Component({
  selector: 'app-create-new-meal',
  templateUrl: './create-new-meal.component.html',
  styleUrls: ['./create-new-meal.component.css']
})
export class CreateNewMealComponent implements OnInit {
  mealToCreate: Meal
  listOfCategories : Category[];
  display : boolean = false;
  selectedCategories : Category[];
  listOfIngredients: Ingredient[];
  selectedIngredients: Ingredient[]


  constructor(private mealService : BentoManagementService) { 
    this.mealToCreate = new Meal();
    this.listOfCategories = new Array();
    this.selectedCategories = new Array();
    this.listOfIngredients = new Array();
    this.selectedIngredients = new Array();
  }

  ngOnInit(): void {
    this.mealService.retrieveCategories().subscribe(response => {
      this.listOfCategories = response;
    }, error => {
      console.log("********* create new meal: " + error);
    })

    this.mealService.retrieveIngredients().subscribe(response => {
      this.listOfIngredients = response;
    }, error => {
      console.log("********* create new meal: " + error);
    })
  }

  showDialog() {
    this.display = true;
  }

  create() {
    this.mealToCreate.averageRating = 5;
    this.mealToCreate.ingredients = this.selectedIngredients;
    this.mealToCreate.categories = this.selectedCategories;
    this.mealService.createMeal(this.mealToCreate).subscribe(
      response => {
        let newMealId: number = response;
        console.log(newMealId);
      },
      error => {
        console.log('********** CreateNewMealComponent.ts: ' + error);  
      }
    )
    
  }

}

