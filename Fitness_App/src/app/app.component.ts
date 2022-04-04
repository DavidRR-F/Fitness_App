import { Component, ComponentFactoryResolver, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { autoLogin } from './auth/store/auth.actions';
import * as fromAuth from './auth/store/auth.reducer';
import { User } from './auth/store/user.model';
import { AuthService } from './services/auth/auth.service';
import { selectUser } from './auth/store/auth.selectors';
import { PlaceholderDirective } from './shared/directives/placeholder.directive';
import { AboutComponent } from './about/about.component';
import { SchedulerService } from './services/scheduler.service';
import { MealsService } from './services/meals.service';
import { WorkoutsService } from './services/workouts.service';
import { IngredientsService } from './services/ingredients.service';
import { ExercisesSevice } from './services/exercises.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  @ViewChild(PlaceholderDirective) aboutHost: PlaceholderDirective;
  user: Observable<User>;

  constructor(
    private store: Store<fromAuth.AuthState>,
    private authService: AuthService,
    private compResolver: ComponentFactoryResolver,
    private eventService: SchedulerService,
    private mealService: MealsService,
    private workoutService: WorkoutsService,
    private ingService: IngredientsService,
    private exerciseService: ExercisesSevice
    ) {}
  
  ngOnInit(): void {
    this.store.dispatch(autoLogin());
    this.user = this.store.select(selectUser);
    //fetchdata
    this.eventService.onFetchScheduler();
    this.mealService.onFetchMeals();
    this.workoutService.onFetchWorkouts();
    this.ingService.onFetchIngredients();
    this.exerciseService.onFetchExercises();
  }

  onLogout() {
    this.authService.logout();
  }

  onFetch(){
    //for testing
  }

  



  //programatically show component

  showAbout() {
    //initialize
    const alertCmpFactory = this.compResolver.resolveComponentFactory(AboutComponent);
    //view container reference using placeholder directive
    const hostViewContainerRef = this.aboutHost.viewContainerRef;
    //clear previous renders
    hostViewContainerRef.clear();
    //create new component in reference
    const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);
    // unsubscribe and clear subscription
    componentRef.instance.close.subscribe(() => {
      hostViewContainerRef.clear();
    });
    
  }

}
