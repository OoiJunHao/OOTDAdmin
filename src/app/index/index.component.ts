// import { Component, OnInit } from '@angular/core';
// import { NgForm } from '@angular/forms';
// import { ActivatedRoute, Router } from '@angular/router';
// import { Staff } from '../models/staff';
// import { SessionService } from '../services/session.service';
// import { StaffService } from '../services/staff.service';

// @Component({
//   selector: 'app-index',
//   templateUrl: './index.component.html',
//   styleUrls: ['./index.component.css']
// })
// export class IndexComponent implements OnInit {
//   staff: Staff | undefined;

//   loginError: boolean | undefined;
//   errorMessage: string | undefined;

//   model = {
//     username: '',
//     password: ''
//   }

//   constructor(private router: Router, private activatedRouter: ActivatedRoute, public sessionService: SessionService, private staffService: StaffService) {
//     this.loginError = false;
//   }

//   ngOnInit(): void {
//   }

//   onSubmit(form: NgForm) {
//     console.log(this.model.username, this.model.password);
//     staffLogin();
//   }

// }
// function staffLogin(this: any) {
//   this.sessionService.setUsername(this.username);
//   this.sessionService.setPassword(this.password);

//   this.staffService.staffLogin(this.model.username, this.model.password).subscribe(
//     response => {
//       let staff: Staff = response.subscriber;
//       if (staff != null) {
//         this.sessionService.setIsLogin(true);
//         this.sessionService.setCurrentStaff(staff);
//         // this.
//       }

//     }
//   )
// }

