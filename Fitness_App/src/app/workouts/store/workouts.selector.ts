import { createFeatureSelector, createSelector } from "@ngrx/store";
import { WorkoutState } from "./workouts.reducer";

export const selectWorkouts = createSelector(
    createFeatureSelector('workoutEntries'),
    (state: WorkoutState) => {
        return state.Workouts;
    }
);

export const selectWorkout = createSelector(
    createFeatureSelector('workoutEntries'),
    (state: WorkoutState, props: number) => {
        return state.Workouts[props];
    }
);

export const selectExerciseLength = createSelector(
    createFeatureSelector('workoutEntries'),
    (state: WorkoutState, props: {workoutIndex: number; exerciseIndex: number}) => {
        return state.Workouts[props.workoutIndex].exercise.length;
    }
);

export const selectWorkoutsLength = createSelector(
    createFeatureSelector('workoutEntries'),
    (state: WorkoutState) => {
        return state.Workouts.length;
    }
);