import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromScheduler from '../scheduler/store/schdeuler.reducer';
import { selectEventIds, selectEvents } from '../scheduler/store/schdeuler.reducer';
import { addEvent, fetchScheduler, removeEvent, setKeys, storeScheduler, updateEvents } from '../scheduler/store/scheduler.actions';
// import { selectAll, selectEvents } from '../scheduler/store/scheduler.selectors';
import { Event } from '../shared/models/event.model';

@Injectable({
  providedIn: 'root'
})
export class SchedulerService {

  constructor(
    private store: Store<fromScheduler.ScheduleState>
  ) { }

  onAddEvent(key: Date, event: Event){
    this.store.dispatch(addEvent({key: key.toString(), event: event}));
  }

  onRemoveEvent(key: Date, index: number){
    this.store.dispatch(removeEvent({key: key.toString(), index: index}));
  }

  onUpdateEvents(key: Date, events: Event[]){
    this.store.dispatch(updateEvents( { id: key.toString(), events: events } ));
  }

  onSchedulerSub(day: Date){
    return this.store.select(fromScheduler.selectCurrentEvents({key: day.toString()}));
  }
  selectAll(){
    return this.store.select(fromScheduler.selectAll);
  }

  onSelectEventIds(){
    this.store.select(fromScheduler.selectEventIds);
  }

  getDaysInMonth(month: number){
    var date = new Date();
    var days = [];
    var day = new Date(date.getFullYear(), month, 1);
    day.setHours(0, 0, 0, 0);
    while(day.getMonth() === month){
      days.push(new Date(day));
      day.setDate(day.getDate() +1);
    }
    if(days[days.length-1].getDay() !== 6){
      while(days[days.length-1].getDay() !== 6){
        days.push(new Date(day));
        day.setDate(day.getDate() + 1);
      }
    }
    day = new Date(date.getFullYear(), month, 1);
    if(days[0].getDay() !== 0){
      while(days[0].getDay() !== 0){
        day.setDate(day.getDate() - 1);
        days.unshift(new Date(day));
      }
    }
    // this.store.dispatch(setKeys({dates: days.map(value => value.toString())}))
    return days;
  }

  onSetKeys(days: string[]){
    this.store.dispatch(setKeys({dates: days}));
  }

  onStoreScheduler(){
    this.store.dispatch(storeScheduler());
  }

  onFetchScheduler(){
    this.store.dispatch(fetchScheduler());
  }

}
