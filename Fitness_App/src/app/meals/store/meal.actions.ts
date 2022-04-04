import { createAction, props } from '@ngrx/store';
import { Ingredient } from 'src/app/shared/models/ingredient.model';
import { Meal } from '../../shared/models/meal.model';

export const addMeal = createAction('[Meals] Add Meal', props<Meal>());
export const removeMeal = createAction('[Meals] Remove Meal', props<{index: number}>());
export const updateMeal = createAction('[Meals] Update Meal', props<Meal>());
export const startMealUpdate = createAction('[Meals] Start Meal Update', props<{index: number}>());
export const stopMealUpdate = createAction('[Meals] Stop Meal Update');
export const removeIngredient = createAction('[Meals] Remove Ingredient', props<{ index: number }>());
export const addIngredient = createAction('[Meals] Add Ingredient', props<Ingredient>());
export const fetchMeals = createAction('[Meals] Fetch Meals');
export const storeMeals = createAction('[Meals] Store Meals');
export const setMeals = createAction('[Meals] Set Meals', props<{meals: Meal[];}>());

