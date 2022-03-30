import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ScheduleState } from "./schdeuler.reducer";

// export const selectEvents = (props: {key: string}) => createSelector(
//     createFeatureSelector('schedulerEntries'),
//     (state: ScheduleState) => {
//         return state.dayEvents.has(props.key) ? state.dayEvents.get(props.key) : [];
//     }
// );

// export const selectAll = createSelector(
//     createFeatureSelector('schedulerEntries'),
//     (state: ScheduleState) => {
//         return state.dayEvents;
//     }
// );

