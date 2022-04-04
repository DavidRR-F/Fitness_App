import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { addExercise, fetchExercises, removeExercise, storeExercises } from "../exercises/store/exercises.actions";
import * as fromExercises from '../exercises/store/exercises.reducer';
import { selectExercises } from "../exercises/store/exercises.selectors";
import { Exercise } from "../shared/models/exercise.model";

@Injectable({providedIn: 'root'})
export class ExercisesSevice {
    constructor(
        private store: Store<fromExercises.ExerciseState>
    ){}

    onAddExercise(exercise: Exercise) {
        this.store.dispatch(addExercise(exercise));
    }

    onRemoveExercise(index: number){
        this.store.dispatch(removeExercise({index: index}));
    }

    onExercisesSub(){
        return this.store.select(selectExercises);
    }

    onStoreExercises() {
        this.store.dispatch(storeExercises());
    }

    onFetchExercises() {
        this.store.dispatch(fetchExercises());
    }
}