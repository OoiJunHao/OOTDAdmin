import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { MainPageComponent } from './main-page/main-page.component';
import { ViewAllMealsComponent } from './view-all-meals/view-all-meals.component'
import { IndexComponent } from "./index/index.component";
import { CreateNewMealComponent } from './create-new-meal/create-new-meal.component'


const routes: Routes = [
  { path: '', redirectTo: '/index', pathMatch: 'full' },
  { path: 'index', component: IndexComponent },
  { path: 'main-page', component: MainPageComponent },
  { path: 'bentoManagement', component: ViewAllMealsComponent },
  { path: 'createNewMeal', component: CreateNewMealComponent}
  


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
