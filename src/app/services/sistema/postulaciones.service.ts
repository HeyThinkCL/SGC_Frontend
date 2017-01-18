import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from "rxjs";

import * as globalVar from '../../globals';

@Injectable()
export class PostulacionesService {
  static get parameters(){
    return [[Http]]
  }

  private alumnosUrl = globalVar.apiUrl+'/alumnos';

  constructor( private http: Http) { }

  private headers = new Headers({'Content-Type': 'application/json'});

  createPostulacion(postulacion: any): Observable<any>{
    return this.http
      .post(this.alumnosUrl, JSON.stringify(postulacion), {headers: this.headers})
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server Error: Couldn\'t CREATE Alumno'));
  }

  getPostulaciones(): Observable<any>{
    const url:string = `${this.alumnosUrl}/postulantes`;
    return this.http.get(url)
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || error.status ));
  }

  getAceptadas(): Observable<any>{
    const url:string = `${this.alumnosUrl}/aceptados`;
    return this.http.get(url)
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || error.status ));
  }

  getListaEspera(): Observable<any>{
    const url:string = `${this.alumnosUrl}/lista_espera`;
    return this.http.get(url)
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || error.status ));
  }

  getRechazadas(): Observable<any>{
    const url:string = `${this.alumnosUrl}/rechazados`;
    return this.http.get(url)
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || error.status ));
  }
}
