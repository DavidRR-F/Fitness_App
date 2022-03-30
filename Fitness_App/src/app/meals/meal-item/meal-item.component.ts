import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MealsService } from 'src/app/services/meals.service';
import { Meal } from '../../shared/models/meal.model';


@Component({
  selector: 'app-meal-item',
  templateUrl: './meal-item.component.html',
  styleUrls: ['./meal-item.component.css']
})
export class MealItemComponent implements OnInit {

  @Input() meal: Meal;
  @Input() index: number;
  deleteStyles = null;
  
  constructor(
    private router: Router,
    private mealService: MealsService
    ) { }

  ngOnInit(): void {
  }

  deleteMeal() {
    this.mealService.onRemoveMeal(this.index);
  }

  editMeal() {
    this.router.navigate(['/meals', this.index]);
  }

  getBackShadow(){
    this.deleteStyles = {
      'color': 'rgb(185, 118, 118)',
      'border-color': '0 5px 15px rgb(221, 45, 45)',
      'box-shadow': '0 5px 30px rgba(221, 51, 45, 0.719)'
    }
  }
  removeBackShadow(){
    this.deleteStyles = null;
  }

}
