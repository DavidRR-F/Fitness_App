import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WorkoutsService } from 'src/app/services/workouts.service';
import { Workout } from 'src/app/shared/models/workout.model';

@Component({
  selector: 'app-workout',
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.css']
})
export class WorkoutComponent implements OnInit {

  @Input() workout: Workout;
  @Input() index: number;
  deleteStyles = null;
  reps: number;
  sets: number;
  exercises: number;
  
  constructor(
    private router: Router,
    private workoutsService: WorkoutsService
  ) { }

  ngOnInit(): void {
    this.sets = this.workout.exercise.map(x => x.sets).reduce(function(a, b){ return a+b; });
    this.reps = this.workout.exercise.map(x => x.reps).reduce(function(a, b){ return a+b; });
    this.exercises = this.workout.exercise.length;
  }

  deleteWorkout() {
    this.workoutsService.onRemoveWorkout(this.index);
  }

  editWorkout() {
    this.router.navigate(['/workouts', this.index]);
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
