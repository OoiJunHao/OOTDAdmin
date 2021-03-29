import {Meal} from '../models/meal'

export class UpdateMealReq {
    username: string | undefined;
    password: string | undefined;
    mealEntity: Meal | undefined;

    constructor(username?: string, password?: string, mealEntity?: Meal) {
        this.username = username;
        this.password = password;
        this.mealEntity = mealEntity;
    }
}