import { Component, DoCheck, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { ExercisesSevice } from '../services/exercises.service';
import { IngredientsService } from '../services/ingredients.service';
import { MealsService } from '../services/meals.service';
import { WorkoutsService } from '../services/workouts.service';
import { Exercise } from '../shared/models/exercise.model';
import { Ingredient } from '../shared/models/ingredient.model';
import { Meal } from '../shared/models/meal.model';
import { Workout } from '../shared/models/workout.model';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit, DoCheck {

  @Input() database;
  searchText: string = '';
  @Output() search: EventEmitter<string> = new EventEmitter<string>();
  @Output() newEvent: EventEmitter<Meal | Workout | Ingredient | Exercise> 
  = new EventEmitter<Meal | Workout | Ingredient | Exercise>();
  meals: Observable<Meal[]>;
  workouts: Observable<Workout[]>;
  ingredients: Observable<Ingredient[]>;
  exercises: Observable<Exercise[]>;

  constructor(
    private mealsService: MealsService,
    private workoutsService: WorkoutsService,
    private ingredientsService: IngredientsService,
    private exercisesService: ExercisesSevice
  ) { }

  ngOnInit(): void {
    if(this.database !== 'Ingredients' && this.database !== 'Exercises') {
    this.workouts = this.workoutsService.onWorkoutsSub();
    this.meals = this.mealsService.onMealsSub();
    }
    if(this.database === 'Ingredients') {
      this.ingredients = this.ingredientsService.onIngredientsSub();
    }
    if(this.database === 'Exercises') {
      this.exercises = this.exercisesService.onExercisesSub();
    }
  }
  ngDoCheck(): void {
      this.search.emit(this.searchText);
  }
  
  clearSearch(){
    this.searchText = '';
  }

  onAdd(event: Meal | Workout | Ingredient | Exercise){
    this.newEvent.emit(event);
    this.searchText = '';
  }

  
}
