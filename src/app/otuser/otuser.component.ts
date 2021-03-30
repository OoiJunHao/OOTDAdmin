import { Component, OnInit } from '@angular/core';
import { OTUser } from '../models/ot-user';
import { OtUserService } from '../services/ot-user.service';
import { SessionService } from '../services/session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-otuser',
  templateUrl: './otuser.component.html',
  styleUrls: ['./otuser.component.css']
})
export class OTUserComponent implements OnInit {
  
  allUsers: OTUser[];
  selectedUsers: OTUser[];

  constructor(private OTUserService: OtUserService, public sessionService: SessionService, private router: Router) {
    this.allUsers = new Array();
    this.selectedUsers = new Array();
  }

  ngOnInit(): void {
    this.OTUserService.getAllUsers().subscribe(response => {this.allUsers = response;console.log(this.allUsers[0].firstName)}, error => {console.log('************* otuser.ts' + error)});
  }

  checkAccessRight()
	{
		if(!this.sessionService.checkAccessRight(this.router.url))
		{
			this.router.navigate(["/accessRightError"]);
		}
	}

}
