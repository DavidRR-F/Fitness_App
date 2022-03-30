import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { map, switchMap, withLatestFrom } from "rxjs";
import { Exercise } from "src/app/shared/models/exercise.model";
import { environment } from "src/environments/environment";
import * as ExerciseActions from './exercises.actions';
import * as fromExercises from './exercises.reducer';

@Injectable({providedIn: 'root'})
export class ExerciseEffects {

    @Effect()
    fetchIngredients = this.actions.pipe(
        ofType(ExerciseActions.fetchExercises),
        switchMap(fetchAction => {
            return this.http.get<Exercise[]>(environment.fetchUrl)
        }),
        map(exercises => {
            return ExerciseActions.setExercises({exercises: exercises})
        })
    );

    @Effect({dispatch: false})
    storeMeals = this.actions.pipe(
        ofType(ExerciseActions.storeExercises),
        withLatestFrom(this.store.select('exercises')),
        switchMap(([actionData, ingredientsState]) => {
            return this.http.put(environment.fetchUrl, ingredientsState);
        })
    );

constructor(
    private actions: Actions,
    private store: Store<fromExercises.ExerciseState>,
    private http: HttpClient
){}
}