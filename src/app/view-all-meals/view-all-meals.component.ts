import { Component, OnInit } from '@angular/core';
import { Meal } from '../models/meal';
import { BentoManagementService } from '../services/bento-management.service';
import { SessionService } from '../services/session.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-view-all-meals',
  templateUrl: './view-all-meals.component.html',
  styleUrls: ['./view-all-meals.component.css']
})
export class ViewAllMealsComponent implements OnInit {
  allMeals: Meal[];

  constructor(private mealService: BentoManagementService,
    public sessionService: SessionService, private router: Router) {
    this.allMeals = new Array();  
  }

  ngOnInit(): void {
      //this.checkAccessRight();

      this.mealService.getProducts().subscribe(response => {
        this.allMeals = response;
      },
      error => {
        console.log('************* ViewAllMeals.ts' + error);
      })
  }

  checkAccessRight()
	{
		if(!this.sessionService.checkAccessRight(this.router.url))
		{
			this.router.navigate(["/accessRightError"]);
		}
	}

}


