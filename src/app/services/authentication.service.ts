import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from "rxjs";

import * as globalVars from '../globals';

@Injectable()
export class AuthenticationService {
  static get parameters(){
    return [[Http]]
  }

  private authUrl: string = globalVars.apiUrl+'/authenticate';
  private headers = new Headers({'Content-Type': 'application/json'});

  public token: string;
  public colegioId: number;

  private userRol = [
    {'rol':1,'glosa':'Sostenedor'},
    {'rol':2,'glosa':'Director'},
    {'rol':3,'glosa':'UTP'},
    {'rol':4,'glosa':'Administrador'},
    {'rol':5,'glosa':'Digitador'},
  ];


  constructor(private http: Http) {
    this.http=http;
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  login(token: string, userData: any){
    if(token && userData){
      this.token =JSON.parse(JSON.stringify(token));

      let rolName = this.userRol.find(r => r.rol == +userData.rol).glosa;
      let currentUser = {
        email: userData.email,
        token: this.token,
        colegioId: userData.colegio_id,
        rol: btoa(btoa(token.substr(0,5)+userData.rol+token.substr(token.length-5,token.length))),
        sesion: rolName,
        nombre: userData.nombre,
        apellido: userData.apellido_paterno,
      };

      localStorage.setItem('currentUser', JSON.stringify(currentUser));

      return true;
    } else {
      return false;
    }
  }

  logout(): void {
    this.token = null;
    localStorage.removeItem('currentUser');
  }

  //POST
  authenticate(user: string, password: string): Observable<any>{
    return this.http.post(this.authUrl,JSON.stringify({'credentials':{'email':user,'password':password}}),{headers: this.headers})
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || error.status ));
  }

}
