import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { Driver } from '../models/driver';
import { DriverManagementService } from '../services/driver-management.service';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-view-all-drivers',
  templateUrl: './view-all-drivers.component.html',
  styleUrls: ['./view-all-drivers.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class ViewAllDriversComponent implements OnInit {

  drivers: Driver[];
  items: MenuItem[];
  showUpdateDialog: boolean = false;
  showViewDriverDialog: boolean = false;

  driverToView: any;
  driverToUpdate: any;

  submitted: boolean;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, public sessionService: SessionService, private driverManagementService: DriverManagementService, private messageService: MessageService, private confirmationService: ConfirmationService) {
    this.drivers = new Array();
    this.submitted = false;

    this.items = [
      {

        label: "Update",
        icon: "pi pi-folder-open",
        command: () => { this.showUpdateDriverDialog(); },
      },
      {
        label: "Delete",
        icon: "pi pi-trash",
        command: () => { this.deleteDriver(); },
      }

    ];
  }


  ngOnInit(): void {

    this.driverManagementService.getDrivers().subscribe(
      response => {
        this.drivers = response;
        this.driverToView = this.drivers[0];
        this.driverToUpdate = this.drivers[0];
      },
      error => {
        console.log('********** ViewAllDriversComponent.ts: ' + error);
      }
    );
  }

  setUpdateDriver(driver: Driver) {
    console.log(driver);
    this.driverToUpdate = driver;
    this.driverToView = driver;
  }

  viewDetails(driver: Driver) {
    this.showViewDriverDialog = true;
    this.driverToView = driver;

  }

  updateDriver() {
    // consol
    this.submitted = true;
    if (this.driverToUpdate != null) {
      this.driverManagementService.updateDriver(this.driverToUpdate).subscribe(
        response => {
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Driver Updated', life: 3000 });
        },
        error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Staff Update Fail', life: 3000 });
          console.log('********** UpdateDriver.ts: ' + error);
        }
      );

      this.ngOnInit();
      this.showUpdateDialog = false;
    }
  }

  deleteDriver(): void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + this.driverToView.username + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (this.driverToView != null) {
          this.driverManagementService.deleteDriver(this.driverToView.driverId).subscribe(
            response => {
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Driver Deleted', life: 3000 });
              this.drivers = this.drivers.filter(val => val.driverId !== this.driverToView.driverId);
              this.ngOnInit();
              // this.router.navigate(["/staffManagement"]);
            },
            error => {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Driver Deletion Fail', life: 3000 });
              console.log('********** Delete Driver: ' + error);

            }
          )
        }

      }
    });
  }


  showUpdateDriverDialog(): void {
    console.log(this.driverToUpdate);
    this.showUpdateDialog = true;
  }

  hideDialog(): void {
    this.driverToUpdate = this.drivers[0];
    this.showUpdateDialog = false;
  }

}
