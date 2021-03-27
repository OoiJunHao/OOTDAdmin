import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MenuItem } from "primeng/api";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  items!: MenuItem[];

  constructor() { }

  ngOnInit(): void {
    this.items = [
      {
        label: "HR Management",
        icon: 'pi pi-fw pi-users',
        items: [
          {
            label: 'Staff Management',
            routerLink: '/staff-management'
          },
          {
            label: 'User Management',
            routerLink: '/user-management'
          },
          {
            label: "Driver Management",
            routerLink: '/driver-management'
          }
        ]
      },
      {
        label: "Product Management",
        icon: 'pi pi-fw pi-shopping-cart',
        items: [
          {
            label: 'Bento Management',
            routerLink: '/bento-management'
          },
          {
            label: 'Ingredient Management',
            routerLink: '/ingredient-management'
          },
          {
            label: "Promo Management",
            routerLink: '/promo-management'
          },
          {
            label: "Review Management",
            routerLink: '/review-management'
          }
        ]
      },
      {
        label: "Sales Management",
        icon: 'pi pi-fw pi-money-bill',
        items: [
          {
            label: 'Sale Transaction Management',
            routerLink: '/sale-transaction-management'
          },
          {
            label: 'Report Generation',
            routerLink: '/report-generation'
          }
        ]
      }
    ];

  }

}
