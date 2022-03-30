import { Component, Input, OnInit } from '@angular/core';
import { ControlContainer, FormArray, FormGroup, FormGroupDirective } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Ingredient } from '../shared/models/ingredient.model';
import * as fromMeals from '../meals/store/meal.reducer';
import { removeIngredient } from './store/ingredients.actions';
import { Subscription } from 'rxjs';
import { Meal } from '../shared/models/meal.model';
import { MealsService } from '../services/meals.service';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.css']
})
export class IngredientsComponent implements OnInit {

  ingredientForm;
  
  constructor(
    private rootFormGroup: FormGroupDirective,
    private mealService: MealsService
    ) { }

  ngOnInit(): void {
    this.ingredientForm = this.rootFormGroup.control;
    console.log(this.ingredientForm);
  }

  onDelete(ingredientIndex: number) {
    this.mealService.onDeleteIngredient(ingredientIndex);
    this.controls.splice(ingredientIndex, 1);
    console.log(this.ingredientForm);
  }

  get controls() { // a getter!
    return (<FormArray>this.ingredientForm.get('ingredients')).controls;
  }

}
