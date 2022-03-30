import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Meal } from '../../shared/models/meal.model';
import { Ingredient } from 'src/app/shared/models/ingredient.model';
import { MealsService } from 'src/app/services/meals.service';

@Component({
  selector: 'app-meal-submit',
  templateUrl: './meal-submit.component.html',
  styleUrls: ['./meal-submit.component.css']
})
export class MealSubmitComponent implements OnInit, OnDestroy {
  index: number;
  editMode = false;
  saved = false;
  subscription: Subscription;
  meal: Observable<Meal>;
  mealForm: FormGroup;
  macros = {
    calories: '',
    carbs: '',
    fats: '',
    protein: '',
  }
  constructor(
    private route: ActivatedRoute,
    public store: Store,
    private router: Router,
    private mealService: MealsService
    ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.index = +params['id'];
        this.editMode = params['id'] != null;
        if(!this.editMode){
          this.mealService.onAddMeal(new Meal('New Meal', 
          [new Ingredient('New Ingredient','0 tbp',0,0,0,0)]))
          this.index = +this.mealService.getNewMeal() - 1;
        }
        this.mealService.onUpdateStart(this.index);
        this.meal = this.mealService.onMealSub(this.index);
        this.mealForm = this.mealService.onMealForm(this.index);
      }
    );
  }

  ngOnDestroy(): void {
    this.mealService.onUpdateStop();
  }

  onCancel() {
    if(!this.saved && !this.editMode){
      this.mealService.onRemoveMeal(this.index);
    }
    this.router.navigate(['/meals']);
  }

  onSubmit() {
    this.saved = true;
    this.mealService.onUpdateMeal(this.mealForm.value);
  }

  onClear() {
  }

  onAddIngredient(ingredient: Ingredient){
    this.mealService.onUpdateMeal(this.mealForm.value);
    this.controls.push(this.mealService.createIngredientFormGroup());
    if(ingredient){
      this.mealService.onAddIngredient(ingredient);
    } else {
      this.mealService.onAddIngredient( new Ingredient('New Ingredient', '0 tsp', 0, 0, 0, 0));
    }
    
  }


  get controls() { // a getter!
    return (<FormArray>this.mealForm.get('ingredients')).controls;
  }

}

