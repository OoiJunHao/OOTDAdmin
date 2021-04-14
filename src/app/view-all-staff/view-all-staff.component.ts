import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { AccessRightEnum } from '../models/access-right-enum.enum';
import { Staff } from '../models/staff';
import { SessionService } from '../services/session.service';
import { StaffManagementService } from '../services/staff-management.service';

@Component({
  selector: 'app-view-all-staff',
  templateUrl: './view-all-staff.component.html',
  styleUrls: ['./view-all-staff.component.css'],
  providers: [MessageService, ConfirmationService],
})
export class ViewAllStaffComponent implements OnInit {

  staffs: Staff[];
  staffToView: Staff;
  staff: Staff;
  createStaffEnum: string = "";

  items!: MenuItem[];

  showUpdate: boolean = false;
  showDelete: boolean = false;
  showCreate: boolean = false;

  submitted: boolean = false;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, public sessionService: SessionService, private staffManagementService: StaffManagementService, private messageService: MessageService, private confirmationService: ConfirmationService) {
    this.staffs = new Array();
    this.staffToView = sessionService.getCurrentStaff();
    this.staff = sessionService.getCurrentStaff();
    // this.staffId = null;


    this.items = [
      {

        label: "Update",
        icon: "pi pi-folder-open",
        command: () => { this.showUpdateDialog(); },
      },
      {
        label: "Delete",
        icon: "pi pi-trash",
        command: () => { this.deleteStaff(); },
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

  showCreateDialog(): void {
    this.showCreate = true;
  }

  createNewStaff(): void {
    if (this.createStaffEnum == "Admin") {
      this.staff.type = AccessRightEnum.ADMIN;
    } else if (this.createStaffEnum == "Employee") {
      this.staff.type = AccessRightEnum.EMPLOYEE;
    }

    if (this.staff != null) {
      console.log(this.staff);
      this.staffManagementService.createNewStaff(this.staff).subscribe(
        res => {
          let newStaffId: number = res;
          this.staffManagementService.getStaffByStaffId(newStaffId).subscribe(
            res => {
              this.staff = res;
            },
            error => {
              console.log('********** retrieve by id: ' + error);
            }
          );
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Staff Created', life: 3000 });
          this.staffs.push(this.staff);
          this.ngOnInit();
        },
        error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Staff Creation Failed', life: 3000 });
          console.log('********** create staff: ' + error);
        }
      );
    }
    this.showCreate = false;
  }

  deleteStaff(): void {
    this.showDelete = true;

    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + this.staffToView.username + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (this.staffToView != null) {
          this.staffManagementService.deleteStaff(this.staffToView.staffId).subscribe(
            response => {
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Staff Deleted', life: 3000 });
              this.staffs = this.staffs.filter(val => val.staffId !== this.staffToView.staffId);
              this.ngOnInit();
              // this.router.navigate(["/staffManagement"]);
            },
            error => {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Staff Deletion Fail', life: 3000 });
              console.log('********** DeleteStaff: ' + error);

            }
          )
        }

      }
    });
  }

  hideDialog(): void {
    this.showUpdate = false;
    this.showCreate = false;
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
      this.router.navigate(["/accessRightError"]);
    }
  }

}
