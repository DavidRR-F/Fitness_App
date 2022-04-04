import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { map, mergeMap, switchMap, withLatestFrom } from "rxjs";
import { environment } from "src/environments/environment";
import * as SchedulerActions from './scheduler.actions';
import * as fromScheduler from './schdeuler.reducer';
import { Event } from "src/app/shared/models/event.model";
import { selectAll } from "./schdeuler.reducer";
import { storeScheduler } from "./scheduler.actions";

@Injectable({providedIn: 'root'})
export class SchedulerEffects {

    @Effect()
    fetchScheduler = this.actions.pipe(
        ofType(SchedulerActions.fetchScheduler),
        switchMap(fetchAction => {
            return this.http.get<{ [key:string]: {id: string, events: Event[]} }>('https://fitnessapp-55468-default-rtdb.firebaseio.com/scheduler/-MzpBYdMdV5Oeh5yoB41/entries.json')
        }),
        map(entries => {
            return SchedulerActions.setScheduler(entries)
        })
    );

    @Effect({dispatch: false})
    storeScheduler = this.actions.pipe(
        ofType(storeScheduler),
        withLatestFrom(this.store.select(fromScheduler.selectEvents)),
        switchMap(([actionData, Schedule]) => {
            return this.http.put<{
                dates: string[], 
                entries: { [key:string]: {id: string, events: Event[]}  }
            }>
            ('https://fitnessapp-55468-default-rtdb.firebaseio.com/scheduler/-MzpBYdMdV5Oeh5yoB41.json', 
            JSON.stringify(Schedule)
            );
        })
    );

constructor(
    private actions: Actions,
    private store: Store<fromScheduler.ScheduleState>,
    private http: HttpClient
){}
}