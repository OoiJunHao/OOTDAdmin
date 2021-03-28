import { Component, OnInit } from '@angular/core';
import { AccessRightEnum } from '../models/access-right-enum.enum';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  val1: number | undefined;

  constructor(public sessionService: SessionService) {

  }

  ngOnInit(): void {
  }


}
