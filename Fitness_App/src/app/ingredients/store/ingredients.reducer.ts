import { Action, createReducer, on, State } from '@ngrx/store';
import { Ingredient } from '../../shared/models/ingredient.model';
import { addIngredient, removeIngredient, setIngredients } from './ingredients.actions';

export interface IngredientState {
    ingredients: Ingredient[]
}

const initialState: IngredientState = {
    ingredients: [
        new Ingredient('Test Ingredient#1', '1 tbp', 50, 50, 50, 50),
        new Ingredient('Test Ingredient#2', '1 tbp', 30, 30, 30, 30),
        new Ingredient('Test Ingredient#3', '3 tbp', 320, 320, 320, 320)
      ]
    }
    


export const ingredientReducer = createReducer(
    initialState,
    on(addIngredient, (entries, payload) => {
        const entriesClone: IngredientState = JSON.parse(JSON.stringify(entries));
        entriesClone.ingredients.push(payload);
        return entriesClone;
    }),
    on(removeIngredient, (entries, payload) => {
        const entriesClone: IngredientState = JSON.parse(JSON.stringify(entries));
        entriesClone.ingredients.splice(payload.index, 1);
        return entriesClone;
    }),
    on(setIngredients, (entries, payload) => {
        return {...entries, ingredients: payload.ingredients};
    })
);

export function reducer(state: IngredientState | undefined, action: Action){
    return ingredientReducer(state, action);
}