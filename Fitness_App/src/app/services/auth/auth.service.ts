import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromAuth from '../../auth/store/auth.reducer';
import * as AuthActions from '../../auth/store/auth.actions';
import { _isTestEnvironment } from '@angular/cdk/platform';
import { environment } from '../../../environments/environment'
import { catchError, tap, throwError } from 'rxjs';
import { User } from 'src/app/auth/store/user.model';
import { MealsService } from '../meals.service';
import { ExercisesSevice } from '../exercises.service';

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private tokenExpirationTimer: any;
  
  constructor(
    private store: Store<fromAuth.AuthState>,
    private execiseService: ExercisesSevice
  ) { }

  logout() {
    this.execiseService.onStoreExercises();
    this.store.dispatch(AuthActions.logout());

    localStorage.removeItem('userData'); 
    if(this.tokenExpirationTimer){
        clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  clearLogoutTimer(){
    if(this.tokenExpirationTimer){
        clearTimeout(this.tokenExpirationTimer);
        this.tokenExpirationTimer = null;
    }
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
        this.store.dispatch(AuthActions.logout())
    }, expirationDuration);
  }

  autoLogin() {
    const userData: {
        email: string,
        id: string,
        _token: string,
        _tokenExpirationDate: string
    } = JSON.parse(localStorage.getItem('userData'));
    if(!userData){
        return;
    }
    const loadedUser = new User(
        userData.email, 
        userData.id, 
        userData._token,
        new Date(userData._tokenExpirationDate)
        );
    if(loadedUser.token) {
        this.store.dispatch(AuthActions.authSuccess({
            email: loadedUser.email,
            userID: loadedUser.id,
            token: loadedUser.token,
            expirationDate: new Date(userData._tokenExpirationDate),
            redirect: false
        }));

        const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
        this.autoLogout(expirationDuration);
    }
  }

  private handleUser(email: string, userId: string, token: string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + (expiresIn * 1000));
    const user = new User(
        email, 
        userId, 
        token, 
        expirationDate
    );
    this.store.dispatch(AuthActions.authSuccess({
        email: user.email,
        userID: user.id,
        token: user.token,
        expirationDate: expirationDate,
        redirect: true
    }));
    this.autoLogout(expiresIn * 1000);
    // allows you to write values to local storage
    // JSON.stringify converts a javascript object to a string
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(errorRes: HttpErrorResponse){
    let errorMessage = 'Unknown error occurred'
        if (!errorRes.error || !errorRes.error.error){
            return throwError(errorMessage);
        }
        switch(errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
                errorMessage = 'This email already exists';
                break;
            case 'EMAIL_NOT_FOUND' || 'INVALID_PASSWORD':
                errorMessage = 'This email or password does not exist';
                break;            
        }
        return throwError(errorMessage);
  }
    
  

}
