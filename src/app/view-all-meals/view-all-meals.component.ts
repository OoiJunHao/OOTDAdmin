import { Component, OnInit } from '@angular/core';
import { Meal } from '../models/meal';
import { BentoManagementService } from '../services/bento-management.service';
import { SessionService } from '../services/session.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MenuItem, Message, MessageService } from 'primeng/api'
import { UpdateMealReq } from '../models/UpdateMealReq';
import { Category } from '../models/category.enum';
import { Ingredient } from '../models/ingredient';
import { NgForm } from '@angular/forms';
import { newArray } from '@angular/compiler/src/util';

@Component({
  selector: 'app-view-all-meals',
  templateUrl: './view-all-meals.component.html',
  styleUrls: ['./view-all-meals.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class ViewAllMealsComponent implements OnInit {
  allMeals: Meal[];
  items: MenuItem[];
  showUpdateDialog: boolean = false;
  showViewMealDialog: boolean = false;
  mealToView: Meal;
  mealToUpdate: Meal;
  listOfCategories: Category[];
  listOfIngredients: number[];
  listOfIngredientsObject: Ingredient[]
  checked: string;
  submitted: boolean;
  ingredientsError: boolean;
  categoriesError: boolean;
  categoriesMessage: string | undefined;
  ingredientsMessage: string | undefined;
  resultError: boolean;
  message: string | undefined;


  constructor(private mealService: BentoManagementService,
    public sessionService: SessionService, private router: Router,
    private confirmationService: ConfirmationService, private messageService: MessageService) {
    this.allMeals = new Array();
    this.items = new Array();
    this.mealToView = new Meal();
    this.mealToUpdate = new Meal();
    this.listOfCategories = new Array();
    this.listOfIngredients = new Array();
    this.checked = "";
    this.submitted = false;
    this.ingredientsError = false;
    this.categoriesError = false;
    this.resultError = false;
    this.listOfIngredientsObject = new Array();
  }

  ngOnInit(): void {
    //this.checkAccessRight();

    this.mealService.getProducts().subscribe(response => {
      this.allMeals = response;
    },
      error => {
        console.log('************* ViewAllMeals.ts' + error);
      })

    this.items = [
      {
        label: 'Update', icon: 'pi pi-refresh', command: () => {
          this.updateMeal();
        }
      },
      {
        label: 'Delete', icon: 'pi pi-times', command: () => {
          this.confirmDelete();
        }
      },
    ]

    this.mealService.retrieveCategories().subscribe(response => {
      this.listOfCategories = response;
    }, error => {
      console.log("********* create new meal: " + error);
    })

    this.mealService.retrieveIngredients().subscribe(response => {
      this.listOfIngredientsObject = response;
    }, error => {
      console.log("********* create new meal: " + error);
    })

  }

  checkAccessRight() {
    if (!this.sessionService.checkAccessRight(this.router.url)) {
      this.router.navigate(["/accessRightError"]);
    }
  }

  viewDetails(meal: Meal) {
    console.log(meal.name);
    this.showViewMealDialog = true;
    this.mealToView = meal;
  }

  updateMeal() {
    this.showUpdateDialog = true;
    if (this.mealToUpdate.isAvailable) {
      this.checked = "true";
    } else {
      this.checked = "false";
    }
    console.log(this.checked);
  }

  deleteMeal() {

  }

  setUpdateMeal(meal: Meal) {
    this.categoriesError = false;
    this.ingredientsError = false;
    this.mealToUpdate = meal;
    this.listOfIngredients = new Array();
    this.mealToUpdate.ingredients?.forEach(element => {
      this.listOfIngredients.push(element.ingredientId);
    });
    console.log(this.listOfIngredients.length);
  }

  test() {
    console.log(this.mealToUpdate.isAvailable);
  }

  updateSubmit(updateMealForm: NgForm) {
    if (this.checked == "true") {
      this.mealToUpdate.isAvailable = true;
    } else {
      this.mealToUpdate.isAvailable = false;
    }
    this.submitted = true;
    if (this.mealToUpdate.categories?.length == 0 || this.listOfIngredients?.length == 0) {
      if (this.mealToUpdate.categories?.length == 0) {
        this.categoriesError = true;
        this.categoriesMessage = "Enter at least one category!";
      } else {
        this.categoriesError = false;
      }

      if (this.listOfIngredients?.length == 0) {
        this.ingredientsError = true;
        this.ingredientsMessage = "Enter at least one ingredient!";
      } else {
        this.ingredientsError = false;
      }
    } else {
      this.retrieveSelectedIngredients();
      if (updateMealForm.valid) {
        this.mealService.updateMeal(this.mealToUpdate).subscribe(
          response => {
            console.log(response);
            this.showUpdateDialog = false;
            this.messageService.add({ severity: 'success', summary: 'Service Message', detail: 'New Meal Updated: ID ' + this.mealToUpdate.mealId })
            window.location.reload();
          }, error => {
            this.resultError = true;
            this.message = "An error has occurred while creating the new product: " + error;
          }
        )
      }
    }
  }

  retrieveSelectedIngredients() {
    this.mealToUpdate.ingredients = new Array();
    this.listOfIngredients.forEach(element => {
      this.listOfIngredientsObject.forEach(element2 => {
        if (element2.ingredientId == element) {
          this.mealToUpdate.ingredients?.push(element2);
        }
      });
    });
  }

  confirmDelete() {
    this.confirmationService.confirm({
      message: 'Do you want to delete this meal?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.mealService.deleteMeal(this.mealToUpdate).subscribe(
          response => {
            console.log("success");
            this.messageService.add({ severity: 'success', summary: 'Service Message', detail: 'Meal Deleted: ID ' + this.mealToUpdate.mealId })
            window.location.reload();
          }, error => {
            this.messageService.add({ severity: 'error', summary: 'Service Message', detail: error })
          }
        )
      },
      reject: () => {
        this.messageService.add({ severity: 'info', summary: 'Service Message', detail: 'Delete cancelled' })
      }
    });
  }

  clear() {
    this.mealToUpdate = new Meal();
  }

}


