import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { AuthComponent } from "./auth/auth.component";
import { MealSubmitComponent } from "./meals/meal-submit/meal-submit.component";
import { MealsComponent } from "./meals/meals.component";
import { SchedulerDayComponent } from "./scheduler/scheduler-day/scheduler-day.component";
import { SchedulerComponent } from "./scheduler/scheduler.component";
import { AuthGuardService } from "./services/auth/auth-guard.service";
import { WorkoutSubmitComponent } from "./workouts/workout-submit/workout-submit.component";
import { WorkoutsComponent } from "./workouts/workouts.component";

const appRoutes: Routes = [
    {path: '', component: SchedulerComponent , canActivate: [AuthGuardService]},
    {path: 'meals', component: MealsComponent, canActivate: [AuthGuardService]},
    {path: 'meals/new', component: MealSubmitComponent, canActivate: [AuthGuardService] },
    {path: 'meals/:id', component: MealSubmitComponent, canActivate: [AuthGuardService] },
    { path: 'auth', component: AuthComponent },
    {path: 'workouts', component: WorkoutsComponent, canActivate: [AuthGuardService]},
    {path: 'workouts/new', component: WorkoutSubmitComponent, canActivate: [AuthGuardService] },
    {path: 'workouts/:id', component: WorkoutSubmitComponent, canActivate: [AuthGuardService] },
    {path: 'calendar', component: SchedulerComponent, canActivate: [AuthGuardService] },
    {path: 'calendar/:day', component: SchedulerDayComponent, canActivate: [AuthGuardService] }
];

@NgModule({
    // preloading strategy optimizes lazy loading and will preload files asap (loads during idle time)
    imports: [RouterModule.forRoot(appRoutes, {useHash: true})],
    exports: [RouterModule]
})
export class AppRoutingModule {

}