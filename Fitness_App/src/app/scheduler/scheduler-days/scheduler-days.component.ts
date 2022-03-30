import { Component, Input, OnInit } from '@angular/core';
import { Observable, take } from 'rxjs';
import { MealsService } from 'src/app/services/meals.service';
import { SchedulerService } from 'src/app/services/scheduler.service';
import { WorkoutsService } from 'src/app/services/workouts.service';
import { Event } from 'src/app/shared/models/event.model';
import { MacroModel } from 'src/app/shared/models/macro-graph.model';
import { Meal } from 'src/app/shared/models/meal.model';
import { Workout } from 'src/app/shared/models/workout.model';

@Component({
  selector: 'app-scheduler-days',
  templateUrl: './scheduler-days.component.html',
  styleUrls: ['./scheduler-days.component.css']
})
export class SchedulerDaysComponent implements OnInit {

  @Input() day;
  @Input() inMonth;
  @Input() events: Array<Event>;

  workout: Workout;
  meals: Meal[] = [];

  totalCals = 'Calories: 2000';
  proxy_macros: Array<MacroModel> = [
    {value: 220, color: 'blue', size: '20px', legend: 'C'},
    {value: 150, color: 'green', size: '20px', legend: 'P'},
    {value: 70, color: 'yellow', size: '20px', legend: 'F'}
  ]

  constructor(
  ) { }

  ngOnInit(): void {
    if(this.events){
      this.events.forEach((val) => {
        if(val.eventType === 'workout'){
          this.workout = val.event;
        } else {
          this.meals.push(val.event);
        }
      });
    }
  }

  getTotalCals() {
    return "Calories: " + this.meals.map(x => x.Calories).reduce(function(a, b){ return a+b; });
  }
  getMacros() {
    return [
      {value: this.meals.map(x => x.Carbs).reduce(function(a, b){ return a+b; }), 
        color: 'blue', size: '20px', legend: 'C'},
      {value: this.meals.map(x => x.Protein).reduce(function(a, b){ return a+b; }), 
        color: 'green', size: '20px', legend: 'P'},
      {value: this.meals.map(x => x.Fats).reduce(function(a, b){ return a+b; }), 
        color: 'yellow', size: '20px', legend: 'F'}
    ]
  }

}
