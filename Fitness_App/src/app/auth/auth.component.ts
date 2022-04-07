import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromAuth from './store/auth.reducer';
import { catchError, Observable, Subscription } from 'rxjs';
import { AuthResponseData } from '../services/auth/auth.service';
import { clearError, login, signup } from './store/auth.actions';
import { selectAuth } from './store/auth.selectors';
import { AlertComponent } from '../alert/alert.component';
import { PlaceholderDirective } from '../shared/directives/placeholder.directive';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {

  @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective;
  private closeSub: Subscription;
  private storeSub: Subscription;

  authMode = true;
  isLoading = false;
  error: string = null;

  constructor(
    private compResolver: ComponentFactoryResolver,
    private store: Store<fromAuth.AuthState>
  ) { }

  ngOnInit(): void {
    this.storeSub = this.store.select(selectAuth).subscribe(authState => {
      this.isLoading = authState.loading;
      this.error = authState.authError;
      if(this.error){
        this.showErrorAlert(this.error);
      }
    });
  }

  ngOnDestroy(): void {
    if(!this.error){
      this.storeSub.unsubscribe();
    }  
  }

  onSubmit(form: NgForm) {
    if(!form.valid){
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    this.isLoading = true;

    if (this.authMode){
      this.store.dispatch(login({email: email, password: password}));
    } else {
      this.store.dispatch(signup({email: email, password: password}));
    }
    form.reset();
  }

  onHandleError() {
    this.store.dispatch(clearError());
  }

  onSwitchMode() {
    this.authMode = !this.authMode;
  }

  private showErrorAlert(errorMessage: string) {
    const alertCmpFactory = this.compResolver.resolveComponentFactory(AlertComponent);
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();
    const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);
    componentRef.instance.message = errorMessage; 
    componentRef.instance.close.subscribe(() => {
      hostViewContainerRef.clear();
    });
    
  }

}
