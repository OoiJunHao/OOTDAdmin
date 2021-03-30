import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Category } from '../models/category.enum';
import { Ingredient } from '../models/ingredient';
import { Meal } from '../models/meal';
import { BentoManagementService } from '../services/bento-management.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateMealReq } from '../models/CreateMealReq';

@Component({
  selector: 'app-create-new-meal',
  templateUrl: './create-new-meal.component.html',
  styleUrls: ['./create-new-meal.component.css'],
  providers: [MessageService]
})
export class CreateNewMealComponent implements OnInit {
  mealToCreate: Meal
  listOfCategories : Category[];
  display : boolean = false;
  selectedCategories : Category[];
  listOfIngredients: Ingredient[];
  selectedIngredients: Ingredient[];
  

  constructor(private mealService : BentoManagementService,
     private messageService: MessageService, private router: Router,
     private activatedRoute: ActivatedRoute,) { 
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
        this.display = false;
        this.messageService.add({severity: 'success', summary: 'Service Message', detail: 'New Meal Created: ID ' + newMealId})
        window.location.reload();
      },
      error => {
        console.log('********** CreateNewMealComponent.ts: ' + error);  
      }
    )
    
  }

  clear() {
    this.mealToCreate = new Meal();
  }

}

