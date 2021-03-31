import { Category } from "./category.enum";
import { Ingredient } from "./ingredient";

export class Meal {
    mealId: number | undefined;
    price: number | undefined;
    description: string | undefined;
    calorie: number | undefined;
    averageRating: number | undefined;
    name: string | undefined;
    image: string | undefined;
    isAvailable: boolean | undefined;

    categories: Category[] | undefined;
    ingredients :Ingredient[] | undefined;

    constructor(
        mealId?: number,
        price?: number,
        description?: string,
        calorie?: number,
        averageRating?: number,
        name?: string,
        image?: string,
        available? : boolean,
        categories?: Category[],
        ingredients?: Ingredient[]
    ) {
        this.mealId = mealId
        this.price = price
        this.description = description
        this.calorie = calorie
        this.averageRating = averageRating
        this.name = name
        this.image = image
        this.isAvailable = available 
        this.categories = categories
        this.ingredients = ingredients
    }


}
