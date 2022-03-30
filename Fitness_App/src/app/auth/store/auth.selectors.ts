import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from "./auth.reducer";


export const selectAuth = createSelector(
    createFeatureSelector('userEntries'),
    (state: AuthState) => {
        return state;
    }
);

export const selectUser = createSelector(
    createFeatureSelector('userEntries'),
    (state: AuthState) => {
        return state.user;
    }
);