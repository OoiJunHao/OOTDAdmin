import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

// PrimeNg Modules
import { MenubarModule } from 'primeng/menubar';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';

import { SplitButtonModule } from 'primeng/splitbutton';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

import { ConfirmationService } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { ToolbarModule } from 'primeng/toolbar';
import { DividerModule } from 'primeng/divider';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ToastModule } from 'primeng/toast';
import { ChartModule } from 'primeng/chart';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FileUpload, FileUploadModule } from 'primeng/fileupload';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { SelectButtonModule } from 'primeng/selectbutton';

//Componenets
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainPageComponent } from './main-page/main-page.component';
import { LayoutModule } from '@angular/cdk/layout';
import { ViewAllMealsComponent } from './view-all-meals/view-all-meals.component';
import { HeaderComponent } from './header/header.component';
import { NavbarComponent } from './navbar/navbar.component';
import { IndexComponent } from './index/index.component';
import { CreateNewMealComponent } from './create-new-meal/create-new-meal.component';
import { ViewAllStaffComponent } from './view-all-staff/view-all-staff.component';
import { AccessRightErrorComponent } from './access-right-error/access-right-error.component';
import { OTUserComponent } from './otuser/otuser.component';
import { ViewAllReviewsComponent } from './view-all-reviews/view-all-reviews.component';
import { ViewAllSalesTransactionComponent } from './view-all-sales-transaction/view-all-sales-transaction.component';
import { ViewAllPromoCodeComponent } from './view-all-promo-code/view-all-promo-code.component';
import { ViewAllDriversComponent } from './view-all-drivers/view-all-drivers.component';
import { ViewAllIngredientComponent } from './view-all-ingredient/view-all-ingredient.component';
import { ReportGenerationComponent } from './report-generation/report-generation.component';



@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    MainPageComponent,
    ViewAllMealsComponent,
    IndexComponent,
    HeaderComponent,
    NavbarComponent,
    CreateNewMealComponent,
    ViewAllStaffComponent,
    AccessRightErrorComponent,
    OTUserComponent,
    ViewAllReviewsComponent,
    ViewAllSalesTransactionComponent,
    ViewAllPromoCodeComponent,
    ViewAllDriversComponent,
    ViewAllIngredientComponent,
    ReportGenerationComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    LayoutModule,
    HttpClientModule,
    ReactiveFormsModule,
    //PRIMENG MODULES
    MenubarModule,
    TableModule,
    HttpClientModule,
    CardModule,
    ButtonModule,
    DialogModule,
    DropdownModule,
    CheckboxModule,
    PanelModule,
    DividerModule,
    MessageModule,
    MessagesModule,
    ToastModule,
    SplitButtonModule,
    ConfirmDialogModule,
    SplitButtonModule,
    MessageModule,
    MessagesModule,
    ToastModule,
    ConfirmDialogModule,
    ToolbarModule,
    DividerModule,
    ChartModule,
    RadioButtonModule,
    FileUploadModule,
    InputSwitchModule,
    CalendarModule,
    InputTextModule,
    SelectButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
