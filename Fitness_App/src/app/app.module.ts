import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatGridListModule } from '@angular/material/grid-list';
import { AppRoutingModule } from './app-routing.module';
import { MealsComponent } from './meals/meals.component';
import { RouterModule } from '@angular/router';
import { SidebarNavComponent } from './sidebar-nav/sidebar-nav.component';
import { AuthComponent } from './auth/auth.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MealItemComponent } from './meals/meal-item/meal-item.component';
import { DrowpdownDirective } from './shared/directives/dropdown.directive';
import { StoreModule } from '@ngrx/store';
import * as fromMeals from './meals/store/meal.reducer';
import * as fromAuth from './auth/store/auth.reducer';
import * as fromWorkouts from './workouts/store/workouts.reducer';
import * as fromScheduler from './scheduler/store/schdeuler.reducer';
import * as fromIngredients from './ingredients/store/ingredients.reducer';
import * as fromExercises from './exercises/store/exercises.reducer';
import { MealSubmitComponent } from './meals/meal-submit/meal-submit.component';
import { IngredientsComponent } from './ingredients/ingredients.component';
import { ConnectFormDirective } from './shared/directives/connectform.directive';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './auth/store/auth.effects';
import { MealEffects } from './meals/store/meal.effects';
import { WorkoutsComponent } from './workouts/workouts.component';
import { WorkoutEffects } from './workouts/store/workouts.effects';
import { WorkoutSubmitComponent } from './workouts/workout-submit/workout-submit.component';
import { WorkoutComponent } from './workouts/workout/workout.component';
import { SchedulerComponent } from './scheduler/scheduler.component';
import { SchedulerDaysComponent } from './scheduler/scheduler-days/scheduler-days.component';
import { MacroGraphComponent } from './macro-graph/macro-graph.component';
import { SchedulerDayComponent } from './scheduler/scheduler-day/scheduler-day.component';

import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { PlaceholderDirective } from './shared/directives/placeholder.directive';
import { AboutComponent } from './about/about.component';
import { IngredientEffects } from './ingredients/store/ingredients.effects';
import { ExerciseEffects } from './exercises/store/exercises.effects';
import { SchedulerEffects } from './scheduler/store/scheduler.effects';
import { AlertComponent } from './alert/alert.component';

@NgModule({
  declarations: [
    AppComponent,
    MealsComponent,
    SidebarNavComponent,
    AuthComponent,
    MealItemComponent,
    DrowpdownDirective,
    PlaceholderDirective,
    ConnectFormDirective,
    MealSubmitComponent,
    IngredientsComponent,
    WorkoutsComponent,
    WorkoutSubmitComponent,
    WorkoutComponent,
    SchedulerComponent,
    SchedulerDaysComponent,
    MacroGraphComponent,
    SchedulerDayComponent,
    SearchBarComponent,
    LoadingSpinnerComponent,
    AboutComponent,
    AlertComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatGridListModule,
    MatSidenavModule,
    MatToolbarModule,
    Ng2SearchPipeModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    StoreModule.forRoot({ 
      mealEntries: fromMeals.reducer, 
      userEntries: fromAuth.reducer, 
      workoutEntries: fromWorkouts.reducer,
      schedulerEntries: fromScheduler.reducer,
      ingredientEntries: fromIngredients.reducer,
      exerciseEntries: fromExercises.reducer
    }),
    EffectsModule.forRoot([
      AuthEffects, 
      MealEffects, 
      WorkoutEffects,
      IngredientEffects,
      ExerciseEffects,
      SchedulerEffects
    ]),
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
