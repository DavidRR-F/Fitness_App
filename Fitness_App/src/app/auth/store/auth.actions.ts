import { createAction, props } from "@ngrx/store";

export const signup = 
createAction('[Auth] Sign Up', props<{email: string; password: string}>());

export const login = 
createAction('[Auth] Login', props<{email: string; password: string}>());

export const logout = createAction('[Auth] Logout');

export const autoLogin = createAction('[Auth] Auto Login');

export const authSuccess = 
createAction('[Auth] Auth Success', props<{
    email: string;
    userID: string;
    token: string;
    expirationDate: Date;
    redirect: boolean;
}>());

export const authFailure = 
createAction('[Auth] Auth Failure', props<{ failMessage: string }>());

export const clearError = createAction('[Auth] Clear Error');

