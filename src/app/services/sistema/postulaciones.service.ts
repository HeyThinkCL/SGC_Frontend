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

  private token = JSON.parse(localStorage.getItem('currentUser')).token;
  private colegioId = JSON.parse(localStorage.getItem('currentUser')).colegioId;
  private userRol = JSON.parse(localStorage.getItem('currentUser')).rol;
  private headers = new Headers({'Content-Type': 'application/json','Authorization': this.token, 'colegio_id': this.colegioId,'user_rol':this.userRol});

  createPostulacion(postulacion: any): Observable<any>{
    return this.http
      .post(this.alumnosUrl, JSON.stringify(postulacion), {headers: this.headers})
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server Error: Couldn\'t CREATE Alumno'));
  }

  getAllPostulaciones(): Observable<any>{
    return this.http.get(this.alumnosUrl,{headers:this.headers})
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || error.status ));
  }

  getPostulaciones(): Observable<any>{
    const url:string = `${this.alumnosUrl}/postulantes`;
    return this.http.get(url,{headers:this.headers})
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || error.status ));
  }

  getAceptadas(): Observable<any>{
    const url:string = `${this.alumnosUrl}/aceptados`;
    return this.http.get(url,{headers:this.headers})
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || error.status ));
  }

  getListaEspera(): Observable<any>{
    const url:string = `${this.alumnosUrl}/lista_espera`;
    return this.http.get(url,{headers:this.headers})
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || error.status ));
  }

  getRechazadas(): Observable<any>{
    const url:string = `${this.alumnosUrl}/rechazados`;
    return this.http.get(url,{headers:this.headers})
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || error.status ));
  }

  getPostulante(postulanteId: any): Observable<any>{
    return this.getAllPostulaciones()
      .map(postulante => postulante.find(postulante => postulante.id == postulanteId));
  }

  updatePostulante(postulante: any): Observable<any>{
    const url = `${this.alumnosUrl}/${postulante.id}`;
    return this.http
      .put(url, JSON.stringify(postulante), {headers: this.headers})
      .map(() => postulante)
      .catch((error:any) => Observable.throw(error.json().error || 'Server Error: Couldn\'t UPDATE Postulante'));
  }
}
