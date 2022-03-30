import { Action, createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { Event } from 'src/app/shared/models/event.model';
import { Exercise } from 'src/app/shared/models/exercise.model';
import { Ingredient } from 'src/app/shared/models/ingredient.model';
import { Meal } from 'src/app/shared/models/meal.model';
import { Workout } from 'src/app/shared/models/workout.model';
import { addEvent, removeEvent, setScheduler, updateEvents } from './scheduler.actions';
import { EntityState, createEntityAdapter } from '@ngrx/entity';

export interface ScheduleState {
    id: string
    events: Event[]
}

var today = new Date();
today.setHours(0, 0, 0, 0);
var tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate()+1);
tomorrow.setHours(0, 0, 0, 0);
var meal_1 = new Meal ('Test Meal #1', [
    new Ingredient('Test Ingredient#1', '1 tbp', 50, 50, 50, 50),
    new Ingredient('Test Ingredient#2', '1 tbp', 30, 30, 30, 30),
    new Ingredient('Test Ingredient#3', '3 tbp', 320, 320, 320, 320)
        ]
    );
var meal_2 = new Meal ('Test Meal #2', [
    new Ingredient('Test Ingredient#1', '1 tbp', 50, 50, 50, 50),
    new Ingredient('Test Ingredient#2', '1 tbp', 30, 30, 30, 30),
    new Ingredient('Test Ingredient#3', '3 tbp', 300, 30, 30, 30)
        ]
    )
const defaultImg = 'data:image/png;base64,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';
var workout = new Workout('Test Workout', [
    new Exercise (
        'Test Exercise #1',
        defaultImg,
        12, 3, 145
    ),
    new Exercise (
        'Test Exercise #2',
        defaultImg,
        12, 3, 145
    ),
    new Exercise (
        'Test Exercise #3',
        defaultImg,
        12, 3, 145
    ),
    new Exercise (
        'Test Exercise #4',
        defaultImg,
        12, 3, 145
    )
    ])

export const scheduleAdapter = createEntityAdapter<ScheduleState>();
export interface State extends EntityState<ScheduleState> {}

const defaultSchedule = {
    dates: ['Fri Mar 25 2022 00:00:00 GMT-0400 (Eastern Daylight Time)'],
    entities: {
        'Fri Mar 25 2022 00:00:00 GMT-0400 (Eastern Daylight Time)': {
            id: 'Fri Mar 25 2022 00:00:00 GMT-0400 (Eastern Daylight Time)',
            events: [
                new Event(workout, 'workout', 12, 13),
                new Event(meal_1, 'meal', 7, 8)
            ]
        },
        'Fri Mar 24 2022 00:00:00 GMT-0400 (Eastern Daylight Time)': {
            id: 'Fri Mar 25 2022 00:00:00 GMT-0400 (Eastern Daylight Time)',
            events: [
                new Event(workout, 'workout', 12, 13),
                new Event(meal_1, 'meal', 7, 8)
            ]
        }
    }
}

export const initialState: State = scheduleAdapter.getInitialState(defaultSchedule);

export const schedulerReducer = createReducer(
    initialState,
    on(updateEvents, (action, payload) => {
        return scheduleAdapter.updateOne({id: payload.date, changes: payload.events}, initialState)
    }),
    on(removeEvent, (action, payload) => {
        return scheduleAdapter.removeOne(payload.index, initialState);
    }),
    on(setScheduler, (action, payload) => {
        return {...action, payload}
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