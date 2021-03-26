import { Component, OnInit } from '@angular/core';
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
          { label: 'Staff Management' },
          { label: 'User Management' },
          { label: "Driver Management" }
        ]
      },
      {
        label: "Product Management",
        icon: 'pi pi-fw pi-shopping-cart',
        items: [
          { label: 'Bento Management' },
          { label: 'Ingredient Management' },
          { label: "Promo Management" },
          { label: "Review Management" }
        ]
      },
      {
        label: "Sales Management",
        icon: 'pi pi-fw pi-money-bill',
        items: [
          { label: 'Sale Transaction Management' },
          { label: 'Report Generation' }
        ]
      }
    ];

  }

}
