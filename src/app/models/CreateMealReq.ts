import {Meal} from '../models/meal'

export class CreateMealReq {
    username: string | undefined;
    password: string | undefined;
    bentoEntity: Meal | undefined;

    constructor(username?: string, password?: string, mealEntity?: Meal) {
        this.username = username;
        this.password = password;
        this.bentoEntity = mealEntity;
    }
}

