import { Action, createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { Event } from 'src/app/shared/models/event.model';
import { Exercise } from 'src/app/shared/models/exercise.model';
import { Ingredient } from 'src/app/shared/models/ingredient.model';
import { Meal } from 'src/app/shared/models/meal.model';
import { Workout } from 'src/app/shared/models/workout.model';
import { addEvent, removeEvent, setKeys, setScheduler, updateEvents } from './scheduler.actions';
import { EntityState, createEntityAdapter } from '@ngrx/entity';

export interface ScheduleState {
    id: string
    events: Event[]
}

export const scheduleAdapter = createEntityAdapter<ScheduleState>();
export interface State extends EntityState<ScheduleState> {}

const defaultSchedule = {
    dates: [],
    entities: {
        "Fri Mar 25 2022 00:00:00 GMT-0400 (Eastern Daylight Time)": {
            id: "Fri Mar 25 2022 00:00:00 GMT-0400 (Eastern Daylight Time)",
            events: [new Event(
                new Meal("Test", [new Ingredient("Test", "1 tbp", 500, 30, 10, 30)]), "meal",
                7, 8
            )]
        }
    }
}

const testSchedule = {
    entities: {}
}

export const initialState: State = scheduleAdapter.getInitialState(testSchedule);

export const schedulerReducer = createReducer(
    initialState,
    on(updateEvents, (action, payload) => {
        return scheduleAdapter.updateOne({id: payload.date, changes: payload.events}, initialState)
    }),
    on(removeEvent, (action, payload) => {
        return scheduleAdapter.removeOne(payload.index, initialState);
    }),
    on(setScheduler, (action, payload) => {
        return {...action, entities: payload}
    }),
    on(setKeys, (action, payload) => {
        return {...action, dates: selectEventIds(getSchedulerState)}
    })
);

export function reducer(state: State | undefined, action: Action){
    return schedulerReducer(state, action);
}

export const getSchedulerState = createFeatureSelector<State>('schedulerEntries');

export const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal,
} = scheduleAdapter.getSelectors(getSchedulerState);

export const selectEventEntities = selectEntities;

export const selectEventIds = selectIds;

export const selectKeys = (props: {keys: string[]}) => createSelector(
    selectEventEntities,
    (entities) => {
        return props.keys.filter(key => entities[key]);
    }
);

export const selectEvents = createSelector(
    selectEventEntities,
    (entities) => {
        return {entries: entities};
    }
);

export const selectCurrentEvents = (props: {key: string}) => createSelector(
    selectEventEntities,
    (entities) => {
        if(entities[props.key]){
            return entities[props.key].events;
        } else {
            return [];
        }
    }
  );