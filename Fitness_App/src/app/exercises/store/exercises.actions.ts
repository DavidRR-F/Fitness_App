import { createAction, props } from "@ngrx/store";
import { Exercise } from "src/app/shared/models/exercise.model";

export const addExercise = createAction('[Exercises] Add Exercise', props<Exercise>());
export const removeExercise = createAction('[Exercises] Remove Exercise', props<{index: number}>());

export const fetchExercises = createAction('[Exercises] Fetch Exercises');
export const storeExercises = createAction('[Exercises] Store Exercises');
export const setExercises = createAction('[Exercises] Set Exercises', props<{ exercises: Exercise[] }>());