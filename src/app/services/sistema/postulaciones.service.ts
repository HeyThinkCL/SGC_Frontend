import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from "rxjs";

import * as globalVar from '../../globals';

@Injectable()
export class PostulacionesService {
  static get parameters(){
    return [[Http]]
  }

  private matriculasUrl = globalVar.apiUrl+'/alumnos';

  constructor( private http: Http) { }

  private headers = new Headers({'Content-Type': 'application/json'});

  createPostulacion(postulacion: any): Observable<any>{
    return this.http
      .post(this.matriculasUrl, JSON.stringify(postulacion), {headers: this.headers})
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server Error: Couldn\'t CREATE Alumno'));
  }
}
