import { Ingredient } from "./ingredient.model";

export class Meal {
    public name: string;
    public img: string;
    public ingredients: Ingredient[];
    public Calories: number;
    public Carbs: number;
    public Fats: number;
    public Protein: number;
    
    constructor(
        name: string,
        ingredients: Ingredient[]
    ) {
        this.name = name;
        this.img = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQjUeNgdrz-h6KJ560LZSiAKRki4YJBaJqZg&usqp=CAU";
        this.ingredients = ingredients;
        this.Calories = ingredients.map(x => x.calories).reduce(function(a, b){ return a+b; });
        this.Carbs = ingredients.map(x => x.carbs).reduce(function(a, b){ return a+b; });
        this.Fats = ingredients.map(x => x.fats).reduce(function(a, b){ return a+b; });
        this.Protein = ingredients.map(x => x.protein).reduce(function(a, b){ return a+b; });
    }

    public set _calories(amount: number){
        if(amount <= 0){
            throw new Error('This amount is invalid');
        }
        this.Calories = amount;
    }

    
}