import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

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
import { ToastModule } from 'primeng/toast';

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

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    LayoutModule,
    HttpClientModule,
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
    DividerModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
