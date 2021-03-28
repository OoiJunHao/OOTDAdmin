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

  items!: MenuItem[];

  showUpdate: boolean = false;
  showDelete: boolean = false;
  showCreate: boolean = false;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, public sessionService: SessionService, private staffManagementService: StaffManagementService, private messageService: MessageService) {
    this.staffs = new Array();
    this.staffToView = new Staff();

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

  showUpdateDialog(): void {
    this.showCreate = true;
    this.messageService.add({ severity: 'success', summary: 'Update Staff', detail: "Staff updated successfully" });
  }

  showDeleteDialog(): void {
    this.showDelete = true;
  }


  checkAccessRight() {
    if (!this.sessionService.checkAccessRight(this.router.url)) {
      this.router.navigate(["/accessRightError"]);
    }
  }

}
