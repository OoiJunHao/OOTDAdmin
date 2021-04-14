import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AccessRightEnum } from '../models/access-right-enum.enum';
import { SaleTransaction } from '../models/sale-transaction';
import { SaleTransactionLine } from '../models/sale-transaction-line';
import { SessionService } from '../services/session.service';
import { SaleTransactionManagementService } from '../services/sale-transaction-management.service'
import { Region } from '../models/region.enum';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  allSaleTransactions: SaleTransaction[];
  allSaleTransactionLineItems: SaleTransactionLine[];

  totalCyob: number;
  totalBento: number;
  cyobVSbento: any;

  currentMonthRevenue: number;
  currentYearRevenue: number;
  previousMonthRevenue: number;
  previousYearRevenue: number;
  monthDiff: number;
  yearDiff: number;

  monthlyMealSales: number[];
  monthlyNightMealSales: number[];
  monthlyDayMealSales: number[];
  dateDict: String[]
  graphData: any;

  regionCount: number[];
  regionData: any;
  regionOptions: any;

  displayPosition: boolean;

  constructor(private saleTransactionManagementService: SaleTransactionManagementService, public sessionService: SessionService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.allSaleTransactionLineItems = new Array();
    this.allSaleTransactions = new Array();
    this.cyobVSbento = {};
    this.totalBento = 0;
    this.totalCyob = 0;
    this.currentMonthRevenue = 0;
    this.currentYearRevenue = 0;
    this.previousMonthRevenue = 0;
    this.previousYearRevenue = 0;
    this.monthDiff = 0;
    this.yearDiff = 0;
    this.monthlyMealSales = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.monthlyNightMealSales = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.monthlyDayMealSales = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.dateDict = ['', '', '', '', '', '', '', '', '', '', '', ''];
    this.graphData = {};
    this.regionCount = [0, 0, 0, 0, 0]; // [central, north, south, east, west]
    this.regionData = {};
    this.regionOptions = {};
    this.displayPosition = false;
  }

  ngOnInit(): void {
    this.checkAccessRight();

    // populate dateDict
    var currentDate = new Date();
    console.log('Current date: ' + currentDate.toUTCString());
    var thisMonth = currentDate.getMonth() == 0 ? 11 : currentDate.getMonth() - 1;
    var thisYear = currentDate.getFullYear();
    for (let i = 0; i < 12; ++i) {
      this.dateDict[i] = (String(thisMonth).length == 2 ? String(thisMonth) : '0' + String(thisMonth)) + String(thisYear);
      thisMonth--;
      if (thisMonth < 0) {
        thisMonth = 11;
        thisYear--;
      }
    }


    this.saleTransactionManagementService.getAllSaleTransactions().subscribe(
      response => {
        this.allSaleTransactions = response;
        this.allSaleTransactions.forEach((value) => {
          value.saleTransactionLineItemEntities.forEach((value) => {
            this.allSaleTransactionLineItems.push(value);
          });

          // Calculate Revenue
          var currentDate = new Date();
          console.log('Current date: ' + currentDate.toUTCString());
          var currentMonth = currentDate.getMonth();
          console.log('Current Month:' + currentMonth);
          var currentYear = currentDate.getFullYear();
          console.log('Current Year:' + currentYear);
          // dunno why the saleTransaction date time is reflected as string in chrome, thus comparing using substring
          var transactionMonth = Number(value.transactionDateTime.toString().substring(5, 7));
          //console.log('T Month:' + transactionMonth);
          var transactionYear = Number(value.transactionDateTime.toString().substring(0, 4));
          //console.log('T Year:' + transactionYear);
          if (transactionYear == currentYear) {
            this.currentYearRevenue += value.totalAmount;
            if (transactionMonth == currentMonth) {
              this.currentMonthRevenue += value.totalAmount;
            } else if (transactionMonth == (currentMonth == 1 ? 12 : currentMonth - 1)) {
              this.previousMonthRevenue += value.totalAmount;
            }
          } else if (transactionYear == currentYear - 1) {
            this.previousYearRevenue += value.totalAmount;
          }

          var deliveryMonth = Number(value.deliveryDateTime.toString().substring(5, 7));
          var deliveryYear = Number(value.deliveryDateTime.toString().substring(0, 4));
          var toCheck = (String(deliveryMonth - 1).length == 2 ? String(deliveryMonth - 1) : '0' + String(deliveryMonth - 1)) + String(deliveryYear);

          // populate sales figures (qty)
          for (let i = 0; i < 12; ++i) {
            if (toCheck === this.dateDict[i]) {
              var month = deliveryMonth - 1;
              this.monthlyMealSales[month] += 1;
              //console.log(value.transactionDateTime);
              var deliveryHour = Number(value.deliveryDateTime.toString().substring(11, 13)); // this is in UTC so yeh HAHA
              if (deliveryHour < 8 || deliveryHour >= 20) {
                this.monthlyNightMealSales[month] += 1;
              } else {
                this.monthlyDayMealSales[month] += 1;
              }

              // check region delivered to
              var region = value.address.region;
              if (region == Region.CENTRAL) {
                this.regionCount[0] += 1;
              } else if (region == Region.NORTH) {
                this.regionCount[1] += 1;
              } else if (region == Region.SOUTH) {
                this.regionCount[2] += 1;
              } else if (region == Region.EAST) {
                this.regionCount[3] += 1;
              } else {
                this.regionCount[4] += 1;
              }
              break;
            }
          }

        });

        this.monthDiff = this.previousMonthRevenue == 0 ? 0 : ((this.currentMonthRevenue / this.previousMonthRevenue) - 1) * 100;
        this.yearDiff = this.previousYearRevenue == 0 ? 0 : ((this.currentYearRevenue / this.previousYearRevenue) - 1) * 100;

        // populate middle bar + line graph
        this.graphData = {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
          datasets: [{
            type: 'line',
            label: 'Total Number of Deliveries',
            borderColor: '#42A5F5',
            borderWidth: 2,
            fill: false,
            data: this.monthlyMealSales
          }, {
            type: 'bar',
            label: 'Night time Deliveries (8pm - 8am)',
            backgroundColor: '#66BB6A',
            data: this.monthlyNightMealSales,
            borderColor: 'white',
            borderWidth: 2
          }, {
            type: 'bar',
            label: 'Day Time Deliveries (8am - 8pm)',
            backgroundColor: '#FFA726',
            data: this.monthlyDayMealSales
          }]
        };

        // populate region network grap
        this.regionData = {
          labels: ['Central', 'North', 'South', 'East', 'West'],
          datasets: [
            {
              label: 'Deliveries over past 12 months',
              backgroundColor: 'rgba(255,99,132,0.2)',
              borderColor: 'rgba(255,99,132,1)',
              pointBackgroundColor: 'rgba(255,99,132,1)',
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: 'rgba(255,99,132,1)',
              data: this.regionCount
            }
          ]
        };
        this.regionOptions = {
          scale: {
            pointLabels: {
              fontSize: 17,
            },
          }
        }




        // calculating total number of sales of each type 
        this.allSaleTransactionLineItems.forEach((value) => {
          if (value.meal.name == 'CYOB') {
            this.totalCyob += 1;
          } else {
            this.totalBento += 1;
          }
        })

        // to populate CYOB vs Bento doughnut chart
        this.cyobVSbento = {
          labels: ['Create Your Own Bento', 'Fixed Bento'],
          datasets: [
            {
              data: [this.totalCyob, this.totalBento],
              backgroundColor: [
                "#FFCE56",
                "#36A2EB"
              ],
              hoverBackgroundColor: [
                "#FFCE56",
                "#36A2EB"
              ]
            }]
        };
        console.log('Populated all lines: ' + this.allSaleTransactionLineItems.length);
      },
      error => {
        console.log('********** MainPageComponent.ts: ' + error);
      }
    );

  }

  checkAccessRight() {
    if (!this.sessionService.checkAccessRight(this.router.url)) {
      this.router.navigate(["/accessRightError"]);
    }
  }

}
