import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { map, switchMap, withLatestFrom } from "rxjs";
import { environment } from "src/environments/environment";
import { Meal } from "../../shared/models/meal.model";
import * as MealActions from './meal.actions';
import * as fromMeals from './meal.reducer';

@Injectable({providedIn: 'root'})
export class MealEffects {

    @Effect()
    fetchMeals = this.actions.pipe(
        ofType(MealActions.fetchMeals),
        switchMap(fetchAction => {
            return this.http.get<Meal[]>(environment.fetchUrl)
        }),
        map(meals => {
            return meals.map(meal => {
                return new Meal(meal.name, meal.ingredients ? meal.ingredients : [])
            });
        }),
        map(meals => {
            return MealActions.setMeals({
                meals: meals,
                editedMeal: null,
                editedMealIndex: -1 });
        })
    );

    @Effect({dispatch: false})
    storeMeals = this.actions.pipe(
        ofType(MealActions.storeMeals),
        withLatestFrom(this.store.select('meals')),
        switchMap(([actionData, mealsState]) => {
            return this.http.put(environment.fetchUrl, mealsState);
        })
    );

constructor(
    private actions: Actions,
    private store: Store<fromMeals.MealState>,
    private http: HttpClient
){}
}