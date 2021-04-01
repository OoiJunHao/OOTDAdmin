import { Meal } from "./meal";
import { OTUser } from "./ot-user";

export class Review {
    reviewId: number;
    rating: string;
    description: string;
    reviewDate: Date;
    user: OTUser;
    meal: Meal;


    constructor(
        reviewId: number,
        rating: string,
        description: string,
        reviewDate: Date,
        user: OTUser,
        meal: Meal
    ) {
        this.reviewId = reviewId
        this.rating = rating
        this.description = description
        this.reviewDate = reviewDate
        this.user = user
        this.meal = meal
    }


}
