import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthService } from './auth.service';
import * as fromAuth from '../../auth/store/auth.reducer';
import { map, Observable, take } from 'rxjs';
import { selectAuth } from 'src/app/auth/store/auth.selectors';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(
    private router: Router,
    private store: Store<fromAuth.AuthState>
  ) {}
canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
: boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    // return this.authService.user
    return this.store.select(selectAuth)
    .pipe(take(1),
    map(authState => {
        return authState.user;
    }),
    map(user => {
      const isAuth = !!user;
      if(isAuth){
          return true;
      }
      return this.router.createUrlTree(['/auth']);
    }));
}
}
