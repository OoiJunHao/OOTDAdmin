import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
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

  ingredientsError: boolean;
	categoriesError: boolean;
	categoriesMessage: string | undefined;
  ingredientsMessage: string | undefined;
  resultError: boolean;
  message: string | undefined;
  submitted: boolean;
  

  constructor(private mealService : BentoManagementService,
     private messageService: MessageService, private router: Router,
     private activatedRoute: ActivatedRoute,) { 
    this.mealToCreate = new Meal();
    this.listOfCategories = new Array();
    this.selectedCategories = new Array();
    this.listOfIngredients = new Array();
    this.selectedIngredients = new Array();
    this.ingredientsError = false;
		this.categoriesError = false;
    this.resultError = false;
    this.submitted = false;

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

  create(createMealForm: NgForm) {
    this.mealToCreate.averageRating = 5;
    this.submitted = true;
    if (this.selectedCategories.length == 0 || this.selectedIngredients.length == 0) {
      if (this.selectedCategories.length == 0) {
        this.categoriesError = true;  
        this.categoriesMessage = "Enter at least one category!";
      } else {
        this.categoriesError = false; 
      }
      
      if (this.selectedIngredients.length == 0) {
        this.ingredientsError = true;  
        this.ingredientsMessage = "Enter at least one ingredient!";  
      } else {
        this.ingredientsError = false;   
      }
    } else {
      this.ingredientsError = false;
      this.categoriesError = false; 
      this.mealToCreate.ingredients = this.selectedIngredients;
      this.mealToCreate.categories = this.selectedCategories;
      if (createMealForm.valid) {
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
            this.resultError = true;
            this.message = "An error has occurred while creating the new product: " + error;
          }
        )
      }
    }
    
  }

  clear() {
    this.mealToCreate = new Meal();
  }

}

