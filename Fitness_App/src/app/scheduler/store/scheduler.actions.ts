import { createAction, props } from '@ngrx/store';
import { Event } from 'src/app/shared/models/event.model';

export const addEvent = createAction('[Scheduler] Add Event', props<{key: string, event: Event}>());
export const removeEvent = createAction('[Scheduler] Add Remove', props<{key: string, index: number}>());
export const updateEvents = createAction('[Scheduler] Update Events', props<
{  
    id: string,
    events: Event[]
    
}>());

export const fetchScheduler = createAction('[Scheduler] Fetch Scheduler');
export const storeScheduler = createAction('[Scheduler] Store Scheduler');
export const setScheduler = createAction('[Scheduler] Set Scheduler', props<
{ [key:string]:{ 
    id: string,
    events: Event[]
    }
}
>());
export const setKeys = createAction('[Scheduler] Set Keys', props<{dates: string[]}>())