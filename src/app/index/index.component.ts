import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Staff } from '../models/staff';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  staff: Staff;

  loginError: boolean;
  errorMessage: string;

  model = {
    username: '',
    password: ''
  }

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    console.log(this.model.email, this.model.password);
    staffLogin();
  }

}
function staffLogin() {
  this.sessionService.
}

