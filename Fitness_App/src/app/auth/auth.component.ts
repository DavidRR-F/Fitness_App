import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromAuth from './store/auth.reducer';
import { Observable, Subscription } from 'rxjs';
import { AuthResponseData } from '../services/auth/auth.service';
import { clearError, login, signup } from './store/auth.actions';
import { selectAuth } from './store/auth.selectors';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  private closeSub: Subscription;
  private storeSub:Subscription;

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
    });
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

  // need placeHolder directive and alert component created
  /*private showErrorAlert(errorMessage: string) {
    //initialize
    const alertCmpFactory = this.compResolver.resolveComponentFactory(AlertComponent);
    //view container reference using placeholder directive
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    //clear previous renders
    hostViewContainerRef.clear();
    //create new component in reference
    const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);
    //get access to component instance and set component values (binding)
    componentRef.instance.message = errorMessage; 
    // unsubscribe and clear subscription
    componentRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    });
    
  }*/

}
