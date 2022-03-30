import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Workout } from '../shared/models/workout.model';
import { selectWorkouts } from './store/workouts.selector';

@Component({
  selector: 'app-workouts',
  templateUrl: './workouts.component.html',
  styleUrls: ['./workouts.component.css']
})
export class WorkoutsComponent implements OnInit {

  workouts: Observable<Workout[]>;
  searchResult: string = '';

  constructor(
    private store: Store,
    private router: Router,
    private route: ActivatedRoute
    ) {}

  ngOnInit(): void {
    //this.store.dispatch(fetchWorkouts);
    this.workouts = this.store.select(selectWorkouts);
  }

  ngOnDestroy(): void {
      //this.store.dispatch(storeWorkouts)
  }

  onNew() {
    //route to fresh form
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  onResults(event){
    this.searchResult = event;
  }

}
