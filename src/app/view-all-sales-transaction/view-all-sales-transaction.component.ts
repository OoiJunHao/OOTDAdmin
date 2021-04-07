import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SelectItem, FilterService, FilterMatchMode } from 'primeng/api';
import { Delivery } from '../models/delivery.enum';
import { PromoCode } from '../models/promo-code';
import { SaleTransaction } from '../models/sale-transaction';
import { SaleTransactionManagementService } from '../services/sale-transaction-management.service';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-view-all-sales-transaction',
  templateUrl: './view-all-sales-transaction.component.html',
  styleUrls: ['./view-all-sales-transaction.component.css']
})
export class ViewAllSalesTransactionComponent implements OnInit {

  sales: SaleTransaction[];
  salesToView: any;

  showViewDetailsDialog: boolean = false;
  matchModeOptions: SelectItem[];

  constructor(private saleTransactionService: SaleTransactionManagementService, private sessionService: SessionService, private router: Router, private filterService: FilterService) {
    this.sales = new Array();
    this.matchModeOptions = [ { label: 'Contains', value: FilterMatchMode.CONTAINS }];
    // this.salesToView = this.sales[0];
  }

  ngOnInit(): void {
    this.saleTransactionService.getAllSaleTransactions().subscribe(
      response => {
        this.sales = response;
        this.salesToView = this.sales[0];
      },
      error => {
        console.log('********** ViewAllSalesTransaction.ts: ' + error);
      }
    );
  }

  checkDeliveryStatus(status: Delivery): number {
    if (status == "ORDER_RECEIVED") {
      return 1;
    } else if (status == "INDELIVERY") {
      return 2;
    } else {
      return 3;
    }
  }

  viewDetails(sale: SaleTransaction) {
    console.log(sale);
    this.showViewDetailsDialog = true;
    this.salesToView = sale;
    console.log(this.salesToView);
  }

}
