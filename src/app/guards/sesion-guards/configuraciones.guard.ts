/**
 * Created by matias on 28-03-17.
 */
import { Injectable } from '@angular/core';
import {Router, CanActivate, CanActivateChild} from '@angular/router';

@Injectable()
export class ConfiguracionesGuard implements CanActivate {

  private currentUser;
  constructor(private router: Router) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'))
  }

  canActivate() {
    if(!(this.currentUser.rol==4)&&!(this.currentUser.rol==5)){
      return true;
    }

    this.router.navigate(['/app/403']);
    return false;
  }
}

@Injectable()
export class ConfiguracionesGuardChild implements CanActivateChild {
  private currentUser;
  constructor(private router: Router) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'))
  }

  canActivateChild() {
    if(!(this.currentUser.rol==4)&&!(this.currentUser.rol==5)){
      return true;
    }

    this.router.navigate(['/app/403']);
    return false;
  }
}
