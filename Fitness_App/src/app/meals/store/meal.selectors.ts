import { createFeatureSelector, createSelector, State } from "@ngrx/store";
import { Meal } from "../../shared/models/meal.model";
import { MealState } from "./meal.reducer";



export const selectMeals = createSelector(
    createFeatureSelector('mealEntries'),
    (state: MealState) => {
        return state.meals;
    }
);

export const selectMeal = createSelector(
    createFeatureSelector('mealEntries'),
    (state: MealState, props: number) => {
        return state.meals[props];
    }
);

export const selectIngredientsLength = createSelector(
    createFeatureSelector('mealEntries'),
    (state: MealState, props: {mealIndex: number; ingIndex: number}) => {
        return state.meals[props.mealIndex].ingredients.length;
    }
);

export const selectMealsLength = createSelector(
    createFeatureSelector('mealEntries'),
    (state: MealState) => {
        return state.meals.length;
    }
);

