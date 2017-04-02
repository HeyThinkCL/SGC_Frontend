import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from "rxjs";

import * as globalVar from '../../globals';

@Injectable()
export class AnotacionesService {
  static get parameters(){
    return [[Http]]
  }

  private anotacionessUrl = globalVar.apiUrl+'/anotaciones';

  constructor(private http: Http) {
    this.http=http;
  }
  private token = JSON.parse(localStorage.getItem('currentUser')).token;
  private headers = new Headers({'Content-Type': 'application/json','Authorization': this.token});

  getColegioId(){
    return JSON.parse(localStorage.getItem('currentUser')).colegioId;
  }
  getUserRol(){
    return JSON.parse(localStorage.getItem('currentUser')).userRol;
  }
  //POST
  createAnotacion(anotacion): Observable<any>{
    let options = new RequestOptions({headers: this.headers});
    let payload = {};
    payload['anotaciones'] = JSON.parse(JSON.stringify(anotacion));
    payload['colegio_id'] = this.getColegioId();

    return this.http.post(this.anotacionessUrl, JSON.stringify(payload), options)
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || error.status ));
  }

}
