import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IngredientState } from "./ingredients.reducer";

export const selectIngredients = createSelector(
    createFeatureSelector('ingredientEntries'),
    (state: IngredientState) => {
        return state.ingredients;
    }
);