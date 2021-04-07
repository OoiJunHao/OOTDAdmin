import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MenuItem } from "primeng/api";
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  items!: MenuItem[];

  constructor(public sessionService: SessionService, private router: Router) { }

  ngOnInit(): void {
    this.items = [
      {
        label: "Home",
        icon: 'pi pi-fw pi-home',
        routerLink: ['/main-page']
      },
      {
        label: "HR Management",
        icon: 'pi pi-fw pi-users',
        items: [
          {
            label: 'Staff Management',
            routerLink: ['/staffManagement']
          },
          {
            label: 'User Management',
            routerLink: '/user-management'
          },
          {
            label: "Driver Management",
            routerLink: ['/driverManagement']
          }
        ]
      },
      {
        label: "Product Management",
        icon: 'pi pi-fw pi-shopping-cart',
        items: [
          {
            label: 'Bento Management',
            routerLink: ['/bentoManagement']
          },
          {
            label: 'Ingredient Management',
            routerLink: ['/ingredientMangement']
          },
          {
            label: "Promo Management",
            routerLink: ['/promoManagement']
          },
          {
            label: "Review Management",
            routerLink: ['/reviewManagement']
          }
        ]
      },
      {
        label: "Sales Management",
        icon: 'pi pi-fw pi-money-bill',
        items: [
          {
            label: 'Sale Transaction Management',
            routerLink: ['/salesTransactionManagement']
          },
          {
            label: 'Report Generation',
            routerLink: ['/report-generation']
          }
        ]
      }
    ];

  }

  logout() {
    this.sessionService.setIsLogin(false);
    this.sessionService.setCurrentStaff(null);

    this.router.navigate(["/index"])
  }

}