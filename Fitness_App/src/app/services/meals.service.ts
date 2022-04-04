import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription, take } from 'rxjs';
import { Meal } from '../shared/models/meal.model';
import { addIngredient, addMeal, fetchMeals, removeIngredient, removeMeal, startMealUpdate, stopMealUpdate, storeMeals, updateMeal } from '../meals/store/meal.actions';
import * as fromMeals from '../meals/store/meal.reducer';
import { selectIngredientsLength, selectMeal, selectMeals, selectMealsLength } from '../meals/store/meal.selectors';
import { Ingredient } from '../shared/models/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class MealsService {

  constructor(
    private store: Store<fromMeals.MealState>,
    private formBuilder: FormBuilder
  ) { }

  onAddMeal(meal: Meal){
    this.store.dispatch(addMeal(meal));
  }

  getNewMeal(){
    let index = 0;
    this.store.select(selectMealsLength).pipe(take(1)).subscribe((data) => {index = data;});
    return index;
  }

  onRemoveMeal(index: number){
    this.store.dispatch(removeMeal({index: index}));
  }

  onUpdateStart(index: number){
    this.store.dispatch(startMealUpdate({index: index}));
  }

  onUpdateStop(){
    this.store.dispatch(stopMealUpdate());
  }

  onUpdateMeal(meal: Meal){
    this.store.dispatch(updateMeal(meal));
  }

  onAddIngredient(ingredient: Ingredient){
    this.store.dispatch(addIngredient(ingredient));
  }

  onDeleteIngredient(index: number){
    this.store.dispatch(removeIngredient({index: index}));
  }

  onMealSub(index: number): Observable<Meal> {
    return this.store.select(selectMeal, index);
  }

  onMealsSub(): Observable<Meal[]> {
    return this.store.select(selectMeals);
  }

  onStoreMeals() {
    this.store.dispatch(storeMeals());
  }

  onFetchMeals() {
    this.store.dispatch(fetchMeals());
  }

  onMealForm(index: number) {
    let arrayLength = 0;
    let mealIngredients = new FormArray([])
    this.store.select(selectMeal, index).pipe(take(1))
    .subscribe((data) => arrayLength = data.ingredients.length);
    for(let i=0; i<arrayLength; i++){
      mealIngredients.push(this.createIngredientFormGroup());
    }
    return this.formBuilder.group({
      name: new FormControl('', Validators.required),
      img: new FormControl('', Validators.required),
      Calories: new FormControl(''),
      Carbs: new FormControl(''),
      Fats: new FormControl(''),
      Protein: new FormControl(''),
      ingredients: mealIngredients
    });
  }

  createIngredientFormGroup() {
    return new FormGroup({
      name: new FormControl('', Validators.required),
      servingSize: new FormControl('', Validators.required),
      calories: new FormControl('', 
        [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
      carbs: new FormControl('', 
        [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
      fats: new FormControl('', 
        [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
      protein: new FormControl('', 
        [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
    });
  }


}
