import { Action, createReducer, on } from "@ngrx/store"
import { authFailure, authSuccess, clearError, login, logout, signup } from "./auth.actions";
import { User } from "./user.model"

const initialState: AuthState = {
    user: null,
    authError: null,
    loading: false
}

export interface AuthState {
    user: User,
    authError: string,
    loading: boolean
}

export const authReducer = createReducer(
    initialState,
    on(signup || login, (state, payload) => {
        return{
            ...state,
            authError: null,
            loading: true
        };
    }),
    on(logout, (state, payload) => {
        return {
            ...state,
            user: null
        }
    }),
    on(authSuccess, (state, payload) => {
        const user = new User(
            payload.email,
            payload.userID,
            payload.token,
            payload.expirationDate
            );
        return{
            ...state,
            user: user,
            authError: null,
            loading: false
        }
    }),
    on(authFailure, (state, payload) => {
        return{
            ...state,
            user: null,
            authError: payload.failMessage,
            loading: false
        };
    }),
    on(clearError, (state) => {
        return {
            ...state,
            authError: null
        };
    })
);

export function reducer(state: AuthState | undefined, action: Action){
    return authReducer(state, action);
}