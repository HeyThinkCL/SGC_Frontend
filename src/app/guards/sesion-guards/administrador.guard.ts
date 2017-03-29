/**
 * Created by matias on 28-03-17.
 */
import { Injectable } from '@angular/core';
import {Router, CanActivate, CanActivateChild} from '@angular/router';

@Injectable()
export class AdministradorGuard implements CanActivate {

  private currentUser;
  constructor(private router: Router) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'))
  }

  canActivate() {
    if(!(this.currentUser.rol==4)){
      return true;
    }

    this.router.navigate(['/app/403']);
    return false;
  }
}

@Injectable()
export class AdministradorGuardChild implements CanActivateChild {
  private currentUser;
  constructor(private router: Router) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'))
  }

  canActivateChild() {
    if(!(this.currentUser.rol==4)){
      return true;
    }

    this.router.navigate(['/app/403']);
    return false;
  }
}
