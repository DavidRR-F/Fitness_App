import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectMeals } from './store/meal.selectors';
import { Observable, Subscription } from 'rxjs';
import { Meal } from '../shared/models/meal.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-meals',
  templateUrl: './meals.component.html',
  styleUrls: ['./meals.component.css']
})
export class MealsComponent implements OnInit, OnDestroy {

  searchResult: string = '';
  meals: Observable<Meal[]>;

  constructor(
    private store: Store,
    private router: Router,
    private route: ActivatedRoute
    ) {}

  ngOnInit(): void {
    //this.store.dispatch(fetchMeals);
    this.meals = this.store.select(selectMeals);
  }

  ngOnDestroy(): void {
      //this.store.dispath(storeMeals)
  }

  onNew() {
    //route to fresh form
    this.router.navigate(['new'], {relativeTo: this.route});
  }
  onResults(event){
    this.searchResult = event;
  }

}
