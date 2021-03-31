import { IngredientType } from "./ingredient-type.enum";

export class Ingredient {
    ingredientId: number;
    name: string;
    price: number;
    calorie: number;
    type: IngredientType;


    constructor(
        ingredientId: number,
        name: string,
        price: number,
        calorie: number,
        type: IngredientType
    ) {
        this.ingredientId = ingredientId
        this.name = name
        this.price = price
        this.calorie = calorie
        this.type = type
    }

    

}
