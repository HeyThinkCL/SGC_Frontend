import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from "rxjs";

@Injectable()
export class AuthenticationService {

  public token: string;
  public colegioId: number;

  constructor() {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;
  }

  login(user: string, password: string){
    let token = user+password;
    if(token && user=='test' && password=='test'){
      this.token = token;
      this.colegioId = 1;
      localStorage.setItem('currentUser', JSON.stringify({ username: user, token: token, colegioId: this.colegioId }));
      return true;
    } else {
      return false;
    }
  }

  logout(): void {
    this.token = null;
    localStorage.removeItem('currentUser');
  }

}
