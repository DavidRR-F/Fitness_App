import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { map, switchMap, withLatestFrom } from "rxjs";
import { environment } from "src/environments/environment";
import * as SchedulerActions from './scheduler.actions';
import * as fromScheduler from './schdeuler.reducer';
import { Event } from "src/app/shared/models/event.model";

@Injectable({providedIn: 'root'})
export class SchedulerEffects {

    @Effect()
    fetchMeals = this.actions.pipe(
        ofType(SchedulerActions.fetchScheduler),
        switchMap(fetchAction => {
            return this.http.get
            <{dates: [], entries: {[key:string]: {id: string, events: Event[]}} }>
            (environment.fetchUrl)
        }),
        map(entries => {
            return SchedulerActions.setScheduler({
                dates: entries.dates,
                entries: entries.entries
            })
        })
    );

    @Effect({dispatch: false})
    storeMeals = this.actions.pipe(
        ofType(SchedulerActions.storeScheduler),
        withLatestFrom(this.store.select(fromScheduler.selectAll)),
        switchMap(([actionData, SchedulerState]) => {
            return this.http.put(environment.fetchUrl, SchedulerState);
        })
    );

constructor(
    private actions: Actions,
    private store: Store<fromScheduler.ScheduleState>,
    private http: HttpClient
){}
}