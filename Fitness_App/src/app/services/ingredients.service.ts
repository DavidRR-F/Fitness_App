import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { storeIngredients } from "../ingredients/store/ingredients.actions";
import * as fromIngredients from '../ingredients/store/ingredients.reducer'
import { selectIngredients } from "../ingredients/store/ingredients.selector";
import { addIngredient, removeIngredient } from "../meals/store/meal.actions";
import { Ingredient } from "../shared/models/ingredient.model";
@Injectable({
    providedIn: 'root'
  })
  export class IngredientsService {
  
    constructor(
      private store: Store<fromIngredients.IngredientState>,
    ) { }

    onAddIngredient(ingredient: Ingredient){
        this.store.dispatch(addIngredient(ingredient));
    }

    onDeleteIngredient(index: number){
        this.store.dispatch(removeIngredient({index: index}));
    }

    onIngredientsSub(){
        return this.store.select(selectIngredients);
    }

    onStoreIngredientss() {
      this.store.dispatch(storeIngredients());
    }
}