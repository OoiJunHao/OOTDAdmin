import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '../services/session.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public sessionService: SessionService, private router: Router) { }

  ngOnInit(): void {
  }

  logout() {
    this.sessionService.setIsLogin(false);
    // this.sessionService.setCurrentStaff(null);

    this.router.navigate(["/index"])
  }


}
