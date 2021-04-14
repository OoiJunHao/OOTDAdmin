import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  ingredientType: any[];

  selectedType: string = "";

  ingredientToView: any;

  showUpdate: boolean = false;
  showCreate: boolean = false;
  submitted: boolean = false;
  uploadImage: boolean = false;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private ingredientService: ViewAllIngredientsService, public sessionService: SessionService, private messageService: MessageService, private confirmationService: ConfirmationService) {
    this.ingredients = new Array();
    this.ingredientType = new Array();
  }

  ngOnInit(): void {
    this.checkAccessRight();
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
    this.ingredientType = [
      { name: 'Add On', code: 'ADDON' },
      { name: 'Base', code: 'BASE' },
      { name: 'Meat', code: 'MEAT' },
      { name: 'Sauce', code: 'SAUCE' },
      { name: 'Vege', code: 'VEGE' }
    ];
  }

  checkAccessRight() {
    if (!this.sessionService.checkAccessRight(this.router.url)) {
      this.router.navigate(["/accessRightError"]);
    }
  }

  showCreateDialog() {
    this.showCreate = true;
  }

  showUpdateDialog(ingred: Ingredient) {
    this.showUpdate = true;
    this.ingredientToView = ingred;
  }

  createNewIngredient(): void {
    if (!this.ingredientToCreate.name || !this.ingredientToCreate.price || !this.ingredientToCreate.calorie) {
      this.messageService.add({ severity: 'error', summary: 'Missing Details', detail: 'Please fill up all fields', life: 3000 });
      return;
    }
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
    } else {
      this.messageService.add({ severity: 'error', summary: 'Missing Detail', detail: 'Please select a ingredient type', life: 3000 });
      return;
    }
    console.log(this.selectedType);
    if (this.ingredientToCreate != null) {
      console.log(this.ingredientToCreate);
      this.ingredientService.createIngredient(this.ingredientToCreate).subscribe(
        response => {
          this.ingredientToCreate = response;
          this.messageService.add({ severity: 'success', summary: 'Ingredient Successfully Created', detail: 'Do not forget to upload an ingredient image', life: 3000 });
          this.updateTable();
          this.showCreate = false;
        },
        error => {
          console.log('********** creation of ingredient : ' + error);
          this.messageService.add({ severity: 'error', summary: 'Error Creating Ingredient', detail: 'Please try again', life: 3000 });
        }
      );
    }
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

  showImageDialog(ingred: Ingredient) {
    this.ingredientToView = ingred;
    this.uploadImage = true;
  }

  onUpload() {
    window.location.reload();
    this.messageService.add({ severity: 'success', summary: 'Image Uploaded', detail: '' });
  }

}
