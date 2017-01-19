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

  private headers = new Headers({'Content-Type': 'application/json'});

  createApoderado(alumnoId: number, apoderado: any): Observable<any>{
    apoderado['alumno_id'] = alumnoId;
    console.log({'apoderado':apoderado});
    return this.http
      .post(this.apoderadosUrl, JSON.stringify({'apoderado':apoderado}), {headers: this.headers})
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server Error: Couldn\'t CREATE Apoderadoo'));
  }

  getApoderadoById(apoderadoId: number): Observable<any>{
    const url = `${this.apoderadosUrl}/${apoderadoId}`;
    return this.http.get(url)
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || error.status ));
  }
}
