import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from "rxjs";

import * as globalVar from '../../globals';

@Injectable()
export class ApoderadosService {
  static get parameters(){
    return [[Http]]
  }

  private apoderadosUrl = globalVar.apiUrl+'/apoderados';

  constructor( private http: Http) { }

  private token = JSON.parse(localStorage.getItem('currentUser')).token;
  private colegioId = JSON.parse(localStorage.getItem('currentUser')).colegioId;
  private userRol = JSON.parse(localStorage.getItem('currentUser')).rol;
  private headers = new Headers({'Content-Type': 'application/json','Authorization': this.token, 'colegio_id': this.colegioId,'user_rol':this.userRol});

  createApoderado(alumnoId: number, apoderado: any): Observable<any>{
    apoderado['alumno_id'] = alumnoId;
    return this.http
      .post(this.apoderadosUrl, JSON.stringify({'apoderado':apoderado}), {headers: this.headers})
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server Error: Couldn\'t CREATE Apoderadoo'));
  }

  getApoderadoById(apoderadoId: number): Observable<any>{
    const url = `${this.apoderadosUrl}/${apoderadoId}`;
    return this.http.get(url,{headers:this.headers})
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || error.status ));
  }

  updateApoderado(apoderado: any): Observable<any>{
    const url = `${this.apoderadosUrl}/${apoderado.id}`;
    return this.http
      .put(url, JSON.stringify({'apoderado':apoderado}), {headers: this.headers})
      .map(() => apoderado)
      .catch((error:any) => Observable.throw(error.json().error || error.status ));
  }
}
