import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { AuthService } from "src/app/services/auth/auth.service";
import { environment } from "src/environments/environment";
import { authFailure, authSuccess, autoLogin, login, logout, signup } from "./auth.actions";
import { User } from "./user.model";

@Injectable({providedIn: 'root'})
export class AuthEffects {

    constructor(
        private actions$: Actions, 
        private http: HttpClient, 
        private router: Router,
        private authService: AuthService
    ) {}

    @Effect()
    authLogin = this.actions$.pipe(
        ofType(login),
        switchMap((authData) => {
            return this.http.post<AuthResponseData>(environment.loginUrl + environment.firebaseAPIKey, 
                {
                    email: authData.email,
                    password: authData.password,
                    returnSecureToken: true
                }
            ).pipe(
                tap(resData => {
                    this.authService.autoLogout(+resData.expiresIn * 1000);
                }),
                map(resData => {
                    return handleAuth(+resData.expiresIn, resData.email, resData.localId, resData.idToken)
                }),
                catchError(errorRes => {
                    return handleError(errorRes);
                })
            )
        })
    );

    @Effect()
    authSignup = this.actions$.pipe(
            ofType(signup),
            switchMap((signupAction) => {
                return this.http.post<AuthResponseData>(
                    environment.signupUrl + environment.firebaseAPIKey, 
                    {
                        email: signupAction.email,
                        password: signupAction.password,
                        returnSecureToken: true
                    }
                ).pipe(
                    tap(resData => {
                        this.authService.autoLogout(+resData.expiresIn * 1000);
                    }),
                    map(resData => {
                        return handleAuth(+resData.expiresIn, resData.email, resData.localId, resData.idToken)
                    }),
                    catchError(errorRes => {
                        return handleError(errorRes);
                    })
                )
            })
    );

    @Effect({dispatch: false})
    authRedirect = this.actions$.pipe(
        ofType(authSuccess),
        tap((authSuccessAction) => {
            if(authSuccessAction.redirect){
                this.router.navigate(['/']);
            }
        })
    );

    @Effect({dispatch: false})
    autoLogout = this.actions$.pipe(
        ofType(logout),
        tap(() => {
            this.authService.clearLogoutTimer();
            localStorage.removeItem('userData');
            this.router.navigate(['/auth']);
        })
    );

    @Effect()
    autoLogin = this.actions$.pipe(
        ofType(autoLogin),
        map(() => {
            const userData: {
                email: string,
                id: string,
                _token: string,
                _tokenExpirationDate: string
            } = JSON.parse(localStorage.getItem('userData'));
            if(!userData){
                return {type: 'DUMMY' };
            }
            const loadedUser = new User(
                userData.email, 
                userData.id, 
                userData._token,
                new Date(userData._tokenExpirationDate)
                );
            if(loadedUser.token) {
                const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
                this.authService.autoLogout(expirationDuration);
                return authSuccess({
                    email: loadedUser.email,
                    userID: loadedUser.id,
                    token: loadedUser.token,
                    expirationDate: new Date(userData._tokenExpirationDate),
                    redirect: false
                });
            }
            return {type: 'DUMMY' };
        })
    );
}

export interface AuthResponseData {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

export const handleAuth = (expiresIn: number, email: string, userID: string, token: string) => 
    {
        const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);
        const user = new User(email, userID, token, expirationDate);
        localStorage.setItem('userData', JSON.stringify(user));
        return authSuccess({
                email: email,
                userID: userID,
                token: token,
                expirationDate: expirationDate,
                redirect: true
            }
        );
    };

export const handleError = (errorRes: any) => {
    // returns new observable so the effect stream doesnt die
    let errorMessage = 'Unknown error occurred'
    if (!errorRes.error || !errorRes.error.error){
        return of(authFailure({failMessage: errorMessage}));
    }
    switch(errorRes.error.error.message) {
        case 'EMAIL_EXISTS':
            errorMessage = 'This email already exists';
            break;
        case 'EMAIL_NOT_FOUND' || 'INVALID_PASSWORD':
            errorMessage = 'This email or password does not exist';
            break;            
    }
        return of(authFailure({failMessage: errorMessage}));
};