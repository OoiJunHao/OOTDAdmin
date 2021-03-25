import { Category } from "./category.enum";
import { Ingredient } from "./ingredient";

export class Meal {
    mealId: number;
    price: number;
    description: string;
    calorie: number;
    averageRating: number;
    name: string;
    image: string;

    categories: Category[];
    ingredients = Ingredient[];

    constructor(
        mealId: number,
        price: number,
        description: string,
        calorie: number,
        averageRating: number,
        name: string,
        image: string,
        categories: Category[]
        ingredient: Ingredient[];
    ) {
        this.mealId = mealId
        this.price = price
        this.description = description
        this.calorie = calorie
        this.averageRating = averageRating
        this.name = name
        this.image = image
        this.categories = categories
        this.ingredients = ingredient
    }


}
