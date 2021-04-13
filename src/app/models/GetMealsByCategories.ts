import { Category } from "./category.enum";

export class GetMealsByCategories {
    username: string | undefined;
    password: string | undefined;
    enums: Category[] | undefined


    constructor(username?: string, password?: string, enums?: Category[]) {
        this.username = username
        this.password = password
        this.enums = enums;
    }

}