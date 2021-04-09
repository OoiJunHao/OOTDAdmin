import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Ingredient } from '../models/ingredient';
import { IngredientType } from '../models/ingredient-type.enum';
import { SessionService } from '../services/session.service';
import { ViewAllIngredientsService } from '../services/view-all-ingredients.service';

@Component({
  selector: 'app-view-all-ingredient',
  templateUrl: './view-all-ingredient.component.html',
  styleUrls: ['./view-all-ingredient.component.css'],
  providers: [MessageService, ConfirmationService],
})
export class ViewAllIngredientComponent implements OnInit {

  ingredients: Ingredient[];
  ingredientToCreate: any;


  selectedType: string = "";

  ingredientToView: any;

  showUpdate: boolean = false;
  showCreate: boolean = false;
  submitted: boolean = false;

  constructor(private ingredientService: ViewAllIngredientsService, public sessionService: SessionService, private messageService: MessageService, private confirmationService: ConfirmationService) {
    this.ingredients = new Array();


  }

  ngOnInit(): void {
    this.ingredientService.getIngredients().subscribe(
      response => {
        this.ingredients = response;
        this.ingredientToCreate = new Ingredient(this.ingredients.length + 1);

        this.ingredientToView = new Ingredient(this.ingredients.length + 1);
      },
      error => {
        console.log('******* View All Ingredient.ts' + error);
      }
    )
    // this.ingredientTypeEnum = [IngredientType.ADDON, IngredientType.BASE, IngredientType.MEAT, IngredientType.SAUCE, IngredientType.SAUCE, IngredientType.VEGE]
  }

  showCreateDialog() {
    this.showCreate = true;
  }

  showUpdateDialog(ingred: Ingredient) {
    this.showUpdate = true;
    this.ingredientToView = ingred;
  }

  createNewIngredient(): void {
    if (this.selectedType == "MEAT") {
      this.ingredientToCreate.type = IngredientType.MEAT;
    } else if (this.selectedType == "VEGE") {
      this.ingredientToCreate.type = IngredientType.VEGE;
    } else if (this.selectedType == "BASE") {
      this.ingredientToCreate.type = IngredientType.BASE;
    } else if (this.selectedType == "ADDON") {
      this.ingredientToCreate.type = IngredientType.ADDON;
    } else if (this.selectedType == "SAUCE") {
      this.ingredientToCreate.type = IngredientType.SAUCE;
    }
    console.log(this.selectedType);
    if (this.ingredientToCreate != null) {
      console.log(this.ingredientToCreate);
      this.ingredientService.createIngredient(this.ingredientToCreate).subscribe(
        response => {
          this.ingredientToCreate = response;
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Ingredient Created', life: 3000 });
          this.updateTable();
        },
        error => {
          console.log('********** creation of ingredient : ' + error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Ingredient Creation Failed', life: 3000 });


        }
      );
    }
    this.showCreate = false;
  }

  updateIngredient() {
    this.submitted = true;
    if (this.ingredientToView != null) {
      this.ingredientService.updateIngredient(this.ingredientToView).subscribe(
        response => {
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Ingredient Updated', life: 3000 });
          this.updateTable();
        },
        error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Ingredient Update Fail', life: 3000 });
        }
      );

      this.showUpdate = false;
    }
  }

  updateTable(): void {
    this.ingredientService.getIngredients().subscribe(
      response => {
        this.ingredients = response;
        this.ingredientToCreate = new Ingredient(1);
        this.ingredientToView = new Ingredient(1);
      },
      error => {
        console.log('******* ViewAllIngredientComponent.ts: ' + error);
      }
    )
  }

  closeDialog() {
    this.showCreate = false;
    this.showUpdate = false;
    this.updateTable();
  }

}
