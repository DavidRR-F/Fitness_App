import { createAction, props } from '@ngrx/store';
import { Ingredient } from 'src/app/shared/models/ingredient.model';


export const addIngredient = createAction('[Ingredients] Add Ingredient', props<Ingredient>());
export const removeIngredient = createAction('[Ingredients] Remove Ingredient', props<{index: number}>());

export const fetchIngredients = createAction('[Ingredients] Fetch Ingredients');
export const storeIngredients = createAction('[Ingredients] Store Ingredients');
export const setIngredients = createAction('[Ingredients] Set Ingredients', props<{ingredients:Ingredient[]}>());