import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { map, switchMap, withLatestFrom } from "rxjs";
import { Ingredient } from "src/app/shared/models/ingredient.model";
import { environment } from "src/environments/environment";
import * as IngredientActions from './ingredients.actions';
import * as fromIngredients from './ingredients.reducer';

@Injectable({providedIn: 'root'})
export class IngredientEffects {

    @Effect()
    fetchIngredients = this.actions.pipe(
        ofType(IngredientActions.fetchIngredients),
        switchMap(fetchAction => {
            return this.http.get<Ingredient[]>(environment.fetchUrl)
        }),
        map(ingredients => {
            return IngredientActions.setIngredients({ingredients: ingredients})
        })
    );

    @Effect({dispatch: false})
    storeMeals = this.actions.pipe(
        ofType(IngredientActions.storeIngredients),
        withLatestFrom(this.store.select('ingredients')),
        switchMap(([actionData, ingredientsState]) => {
            return this.http.put(environment.fetchUrl, ingredientsState);
        })
    );

constructor(
    private actions: Actions,
    private store: Store<fromIngredients.IngredientState>,
    private http: HttpClient
){}
}

