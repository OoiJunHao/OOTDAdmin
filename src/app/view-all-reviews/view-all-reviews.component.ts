import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Review } from '../models/review';
import { ReviewManagementService } from '../services/review-management.service';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-view-all-reviews',
  templateUrl: './view-all-reviews.component.html',
  styleUrls: ['./view-all-reviews.component.css']
})
export class ViewAllReviewsComponent implements OnInit {

  reviews: Review[];

  constructor(private reviewManagementService: ReviewManagementService, public sessionService: SessionService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.reviews = new Array();
  }

  ngOnInit(): void {
    this.checkAccessRight();

    this.reviewManagementService.getReviews().subscribe(
      res => {
        this.reviews = res;
      },
      err => {
        console.log('********** VIEWREVIEWCOMPONENT.ts: ' + err);
      }
    );
  }

  checkAccessRight() {
    if (!this.sessionService.checkAccessRight(this.router.url)) {
      this.router.navigate(["/accessRightError"]);
    }
  }

}
