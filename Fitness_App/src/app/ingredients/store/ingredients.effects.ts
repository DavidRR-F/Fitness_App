import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, Effect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { map, mergeMap, switchMap, withLatestFrom } from "rxjs";
import { Ingredient } from "src/app/shared/models/ingredient.model";
import { environment } from "src/environments/environment";
import * as IngredientActions from './ingredients.actions';
import { storeIngredients } from "./ingredients.actions";
import * as fromIngredients from './ingredients.reducer';
import { selectIngredients } from "./ingredients.selector";

@Injectable({providedIn: 'root'})
export class IngredientEffects {

    @Effect()
    fetchIngredients = this.actions.pipe(
        ofType(IngredientActions.fetchIngredients),
        switchMap(fetchAction => {
            return this.http.get<Ingredient[]>("https://fitnessapp-55468-default-rtdb.firebaseio.com/ingredients/-MzWPOzHBZ9aRZgbncsp.json")
        }),
        map(ingredients => {
            return IngredientActions.setIngredients({ingredients: ingredients})
        })
    );

    @Effect({dispatch: false})
    storeIngredients = this.actions.pipe(
        ofType(storeIngredients),
        withLatestFrom(this.store.select(selectIngredients)),
        switchMap(([actionData, ingredients]) => {
            console.log(ingredients)
            return this.http.put<Ingredient[]>(environment.fetchUrl + "ingredients.json", 
            ingredients
            );
        })
    );

constructor(
    private actions: Actions,
    private store: Store<fromIngredients.IngredientState>,
    private http: HttpClient
){}
}

