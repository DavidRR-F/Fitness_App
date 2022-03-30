import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from './auth.service';
import * as fromAuth from '../../auth/store/auth.reducer';
import { HttpHandler, HttpParams, HttpRequest } from '@angular/common/http';
import { exhaustMap, map, take } from 'rxjs';
import { selectAuth } from 'src/app/auth/store/auth.selectors';

@Injectable({
  providedIn: 'root'
})
export class AuthInteceptorService {

  constructor(private authService: AuthService,
    private store: Store<fromAuth.AuthState>) {}
    
intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.store.select(selectAuth)
    .pipe(
        take(1), 
        map(authState => {
            return authState.user;
        }),
        exhaustMap(user => {
            if(!user) {
                return next.handle(req);
            }
            const modReq = req.clone({params: new HttpParams().set('auth', user.token)});
            return next.handle(modReq);
        }));
}
}
