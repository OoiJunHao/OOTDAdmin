import { Category } from "./category.enum";

export class EnumModel {
    category: Category;
    index: Number;

    constructor(category: Category, index: Number) {
        this.category = category;
        this.index = index;
    }
}