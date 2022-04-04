import { Injectable } from "@angular/core";
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { Observable, take } from "rxjs";
import { Exercise } from "../shared/models/exercise.model";
import { Workout } from "../shared/models/workout.model";
import { addExercise, addWorkout, fetchWorkouts, removeExercise, removeWorkout, startWorkoutUpdate, stopWorkoutUpdate, storeWorkouts, updateWorkout } from "../workouts/store/workouts.actions";
import * as fromWorkouts from '../workouts/store/workouts.reducer';
import { selectWorkout, selectWorkouts, selectWorkoutsLength } from "../workouts/store/workouts.selector";

@Injectable({
    providedIn: 'root'
  })
  export class WorkoutsService {
  
    constructor(
      private store: Store<fromWorkouts.WorkoutState>,
      private formBuilder: FormBuilder
    ) { }
  
    onAddWorkout(workout: Workout){
      this.store.dispatch(addWorkout(workout));
    }
  
    getNewWorkout(){
      let index = 0;
      this.store.select(selectWorkoutsLength).pipe(take(1)).subscribe((data) => {index = data;});
      return index;
    }
  
    onRemoveWorkout(index: number){
      this.store.dispatch(removeWorkout({index: index}));
    }
  
    onUpdateStart(index: number){
      this.store.dispatch(startWorkoutUpdate({index: index}));
    }
  
    onUpdateStop(){
      this.store.dispatch(stopWorkoutUpdate());
    }
  
    onUpdateWorkout(workout: Workout){
      this.store.dispatch(updateWorkout(workout));
    }
  
    onAddExercise(exercise: Exercise){
      this.store.dispatch(addExercise(exercise));
    }
  
    onDeleteExercise(index: number){
      this.store.dispatch(removeExercise({index: index}));
    }
  
    onWorkoutSub(index: number): Observable<Workout> {
      return this.store.select(selectWorkout, index);
    }

    onWorkoutsSub(){
      return this.store.select(selectWorkouts);
    }
  
    onWorkoutForm(index: number) {
      let arrayLength = 0;
      let workoutExercises = new FormArray([])
      this.store.select(selectWorkout, index).pipe(take(1))
      .subscribe((data) => arrayLength = data.exercise.length);
      for(let i=0; i<arrayLength; i++){
        workoutExercises.push(this.createExerciseFormGroup());
      }
      return this.formBuilder.group({
        name: new FormControl('', Validators.required),
        exercise: workoutExercises
      });
    }
  
    createExerciseFormGroup() {
      return new FormGroup({
        name: new FormControl('', Validators.required),
        imgUrl: new FormControl('', Validators.required),
        reps: new FormControl('', 
          [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
        sets: new FormControl('', 
          [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
        weight: new FormControl('', 
          [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
      });
    }

    onStoreWorkouts(){
      this.store.dispatch(storeWorkouts());
    }

    onFetchWorkouts(){
      this.store.dispatch(fetchWorkouts());
    }
  
  }