import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccessRightEnum } from '../models/access-right-enum.enum';
import { Staff } from '../models/staff';
import { SessionService } from '../services/session.service';
import { StaffService } from '../services/staff.service';

@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
    staff: Staff | undefined;

    loginError: boolean | undefined;
    errorMessage: string | undefined;

    model = {
        username: '',
        password: ''
    }
    constructor(private router: Router, private activatedRouter: ActivatedRoute, public sessionService: SessionService, private staffService: StaffService) {
        this.loginError = false;
    }

    ngOnInit(): void {
    }

    onSubmit(form: NgForm) {
        console.log(this.model.username, this.model.password);
        this.staffLogin();
    }


    staffLogin(this: any) {
        console.log(">>>>>> LOGIN <<<<<<<<");
        this.sessionService.setUsername(this.model.username);
        this.sessionService.setPassword(this.model.password);
        this.staffService.staffLogin(this.model.username, this.model.password).subscribe(
            (response: Staff) => {
                let staff: Staff = response;

                if (response.type?.toString() == "ADMIN") {
                    staff.type = AccessRightEnum.ADMIN;
                } else if (response.type?.toString() == "EMPLOYEE") {
                    staff.type = AccessRightEnum.EMPLOYEE;
                }
                if (staff != null) {
                    this.sessionService.setIsLogin(true);
                    this.sessionService.setCurrentStaff(staff);
                    this.loginError = false;
                    this.router.navigate(["/main-page"]);
                } else {
                    this.loginError = true;
                }
                console.log(JSON.parse(sessionStorage.currentStaff));

            },
            (error: any) => {
                this.loginError = true;
                this.errorMessage = error;

            }
        );
    }
}


