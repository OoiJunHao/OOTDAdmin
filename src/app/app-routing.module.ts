import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { MainPageComponent } from './main-page/main-page.component';
import { ViewAllMealsComponent } from './view-all-meals/view-all-meals.component'
import { IndexComponent } from "./index/index.component";
import { CreateNewMealComponent } from './create-new-meal/create-new-meal.component'
import { ViewAllStaffComponent } from './view-all-staff/view-all-staff.component';
import { AccessRightErrorComponent } from './access-right-error/access-right-error.component';
import { OTUserComponent} from './otuser/otuser.component';

const routes: Routes = [
  { path: '', redirectTo: '/index', pathMatch: 'full' },
  { path: 'accessRightError', component: AccessRightErrorComponent },
  { path: 'index', component: IndexComponent },
  { path: 'main-page', component: MainPageComponent },
  { path: 'bentoManagement', component: ViewAllMealsComponent },
  { path: 'createNewMeal', component: CreateNewMealComponent },
  { path: 'staffManagement', component: ViewAllStaffComponent },
  { path: 'user-management', component: OTUserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
