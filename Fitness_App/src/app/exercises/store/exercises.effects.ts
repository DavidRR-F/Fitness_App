import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { map, switchMap, withLatestFrom } from "rxjs";
import { Exercise } from "src/app/shared/models/exercise.model";
import { environment } from "src/environments/environment";
import * as ExerciseActions from './exercises.actions';
import * as fromExercises from './exercises.reducer';
import { selectExercises } from "./exercises.selectors";

@Injectable({providedIn: 'root'})
export class ExerciseEffects {

    @Effect()
    fetchExercises = this.actions.pipe(
        ofType(ExerciseActions.fetchExercises),
        switchMap(fetchAction => {
            return this.http.get<Exercise[]>('https://fitnessapp-55468-default-rtdb.firebaseio.com/exercises/-MzWRP_DnHE6OS3K2Dw0.json')
        }),
        map(exercises => {
            return ExerciseActions.setExercises({exercises: exercises})
        })
    );

    @Effect({dispatch: false})
    storeExercises = this.actions.pipe(
        ofType(ExerciseActions.storeExercises),
        withLatestFrom(this.store.select(selectExercises)),
        switchMap(([actionData, exercises]) => {
            return this.http.put<Exercise[]>(environment.fetchUrl + 'exercises.json', exercises);
        })
    );

constructor(
    private actions: Actions,
    private store: Store<fromExercises.ExerciseState>,
    private http: HttpClient
){}
}