import { createAction, props } from "@ngrx/store";
import { Exercise } from "src/app/shared/models/exercise.model";
import { Workout } from "src/app/shared/models/workout.model";

export const addWorkout = createAction('[Workouts] Add Workout', props<{workout: Workout}>());
export const removeWorkout = createAction('[Workouts] Remove Workout', props<{index: number}>());
export const updateWorkout = createAction('[Workouts] Update Workout', props<{workout: Workout}>());
export const startWorkoutUpdate = createAction('[Workouts] Start Workout Update', props<{index: number}>());
export const stopWorkoutUpdate = createAction('[Workouts] Stop Workout Update');
export const fetchWorkouts = createAction('[Workouts] Fetch Workouts');
export const storeWorkouts = createAction('[Workouts] Store Workouts');
export const setWorkouts = createAction('[Workouts] Set Workouts', props<{Workouts: Workout[];}>());
export const removeExercise = createAction('[Workouts] Remove Exercise', props<{ index: number }>());
export const addExercise = createAction('[Workouts] Add Exercise', props<Exercise>());


