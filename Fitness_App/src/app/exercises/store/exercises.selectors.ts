import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ExerciseState } from "./exercises.reducer";

export const selectExercises = createSelector(
    createFeatureSelector('exerciseEntries'),
    (state: ExerciseState) => {
        return state.exercises;
    }
);