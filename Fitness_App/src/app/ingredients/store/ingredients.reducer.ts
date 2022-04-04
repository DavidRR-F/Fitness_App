import { Action, createReducer, on, State } from '@ngrx/store';
import { Ingredient } from '../../shared/models/ingredient.model';
import { addIngredient, removeIngredient, setIngredients } from './ingredients.actions';

export interface IngredientState {
    ingredients: Ingredient[]
}

const initialState: IngredientState = {
    ingredients: []
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
        return {...entries, ingredients: [...payload.ingredients]};
    })
);

export function reducer(state: IngredientState | undefined, action: Action){
    return ingredientReducer(state, action);
}