import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from "rxjs";

import * as globalVar from '../../globals';

@Injectable()
export class EtniasService {
  static get parameters(){
    return [[Http]]
  }

  private etniasUrl = globalVar.apiUrl+'/etnias';

  constructor(private http: Http) {
    this.http=http;
  }
  private token = JSON.parse(localStorage.getItem('currentUser')).token;
  private colegioId = JSON.parse(localStorage.getItem('currentUser')).colegioId;
  private userRol = JSON.parse(localStorage.getItem('currentUser')).rol;
  private headers = new Headers({'Content-Type': 'application/json','Authorization': this.token, 'colegio_id': this.colegioId,'user_rol':this.userRol});

  getEtnias(){
    return this.http.get(this.etniasUrl,{headers:this.headers})
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || error.status ));
  }
}
