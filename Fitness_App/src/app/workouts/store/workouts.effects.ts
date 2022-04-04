import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, Effect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { exhaustMap, map, switchMap, withLatestFrom } from "rxjs";
import { Exercise } from "src/app/shared/models/exercise.model";
import { Workout } from "src/app/shared/models/workout.model";
import { environment } from "src/environments/environment";
import { fetchWorkouts, setWorkouts, storeWorkouts } from "./workouts.actions";
import * as fromWorkouts from './workouts.reducer';
import { selectWorkouts } from "./workouts.selector";

@Injectable({providedIn: 'root'})
export class WorkoutEffects {

    
    @Effect()
    fetchWorkouts = this.actions.pipe(
        ofType(fetchWorkouts),
        switchMap(fetchAction => {
            return this.http.get<Workout[]>('https://fitnessapp-55468-default-rtdb.firebaseio.com/workouts/-MzWTKN4oeAoqZIA5bib.json')
        }),
        map(workouts => {
            return workouts.map(workout => {
                return new Workout(workout.name, workout.exercise ? workout.exercise : [])
            });
        }),
        map(workouts => {
            return setWorkouts({ Workouts: workouts });
        })
    );

    @Effect({dispatch: false})
    storeWorkouts = this.actions.pipe(
        ofType(storeWorkouts),
        withLatestFrom(this.store.select(selectWorkouts)),
        switchMap(([actionData, workouts]) => {
            return this.http.put<Workout[]>(environment.fetchUrl + 'workouts.json', workouts);
        })
    );


constructor(
    private actions: Actions,
    private store: Store<fromWorkouts.WorkoutState>,
    private http: HttpClient
){}}