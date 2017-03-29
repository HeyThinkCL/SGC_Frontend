/**
 * Created by matias on 28-03-17.
 */
import { Injectable } from '@angular/core';
import {Router, CanActivate, CanActivateChild} from '@angular/router';

@Injectable()
export class AdministradorGuard implements CanActivate {

  private currentUser;
  private rol;
  constructor(private router: Router) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.rol = +atob(atob(this.currentUser.rol))[5];
  }

  canActivate() {
    if(!(this.rol==4)){
      return true;
    }

    this.router.navigate(['/app/403']);
    return false;
  }
}

@Injectable()
export class AdministradorGuardChild implements CanActivateChild {
  private currentUser;
  private rol;
  constructor(private router: Router) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.rol = +atob(atob(this.currentUser.rol))[5];
  }

  canActivateChild() {
    if(!(this.rol==4)){
      return true;
    }

    this.router.navigate(['/app/403']);
    return false;
  }
}
