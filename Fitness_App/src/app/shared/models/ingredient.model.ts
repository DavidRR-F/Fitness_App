export class Ingredient {
    constructor(
        public name: string,
        public servingSize: string,
        public calories: number,
        public carbs: number,
        public fats: number,
        public protein: number
    ) {}
}