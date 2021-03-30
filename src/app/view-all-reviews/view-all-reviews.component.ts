import { Component, OnInit } from '@angular/core';
import { Review } from '../models/review';

@Component({
  selector: 'app-view-all-reviews',
  templateUrl: './view-all-reviews.component.html',
  styleUrls: ['./view-all-reviews.component.css']
})
export class ViewAllReviewsComponent implements OnInit {

  reviews: Review[];

  constructor() {
    this.reviews = new Array();
  }

  ngOnInit(): void {

  }

}
