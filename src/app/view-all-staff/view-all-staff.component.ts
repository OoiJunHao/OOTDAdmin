import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { Staff } from '../models/staff';
import { SessionService } from '../services/session.service';
import { StaffManagementService } from '../services/staff-management.service';
import { StaffService } from '../services/staff.service';

@Component({
  selector: 'app-view-all-staff',
  templateUrl: './view-all-staff.component.html',
  styleUrls: ['./view-all-staff.component.css'],
  providers: [MessageService]
})
export class ViewAllStaffComponent implements OnInit {

  staffs: Staff[];
  staffToView: Staff;
  staffToUpdate: Staff;

  items!: MenuItem[];

  showUpdate: boolean = false;
  showDelete: boolean = false;
  showCreate: boolean = false;

  submitted: boolean = false;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, public sessionService: SessionService, private staffManagementService: StaffManagementService, private messageService: MessageService) {
    this.staffs = new Array();
    this.staffToView = new Staff();
    this.staffToUpdate = new Staff();


    this.items = [
      {

        label: "Update",
        icon: "pi pi-folder-open",
        command: () => { this.showUpdateDialog(); },
      },
      {
        label: "Delete",
        icon: "pi pi-trash",
        command: () => { this.showDeleteDialog(); },
      }

    ];
  }

  ngOnInit(): void {
    this.checkAccessRight();

    this.staffManagementService.getStaffs().subscribe(
      response => {
        this.staffs = response;
      },
      error => {
        console.log('********** ViewAllStaffComponent.ts: ' + error);
      }
    );
  }

  passStaff(staff: Staff) {
    console.log("Staff clicked: " + staff.username);
    this.staffToView = staff;
    console.log(this.staffToView);
  }

  showUpdateDialog(): void {
    this.showUpdate = true;
    // this.messageService.add({ severity: 'success', summary: 'Update Staff', detail: "Staff updated successfully" });
  }

  showDeleteDialog(): void {
    this.showDelete = true;
  }

  hideUpdateDialog(): void {
    this.showUpdate = false;
  }

  updateStaff() {

    this.submitted = true;
    if (this.staffToView.staffId != null) {
      this.staffManagementService.updateStaff(this.staffToView).subscribe(
        response => {
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Staff Updated', life: 3000 });
        },
        error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Staff Update Fail', life: 3000 });
          console.log('********** UpdateProductComponent.ts: ' + error);
        }

      );

      this.ngOnInit();
      this.showUpdate = false;
    }
  }


  checkAccessRight() {
    if (!this.sessionService.checkAccessRight(this.router.url)) {
      // this.router.navigate(["/accessRightError"]);
    }
  }

}
