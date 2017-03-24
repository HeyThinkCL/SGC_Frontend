import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from "rxjs";

import * as globalVar from '../../globals';

@Injectable()
export class ProfesoresService {
  static get parameters(){
    return [[Http]]
  }

  private profesorsUrl = globalVar.apiUrl+'/profesores';

  constructor(private http: Http) {

    this.http=http;
  }

  private headers = new Headers({'Content-Type': 'application/json'});

  getProfesores(): Observable<any> {
    return this.http.get(this.profesorsUrl)
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server Error: Couldn\'t GET Profesores'));
  }

  getProfesor(id: number): Observable<any> {
    return this.getProfesores()
      .map(profesors => profesors.find(profesor => profesor.id == id));
  }

  getProfesorById(id: number): Observable<any> {
    const url = `${this.profesorsUrl}/${id}`;
    return this.http.get(url)
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server Error: Couldn\'t GET Profesor By Id'));
  }

  createProfesor(profesor: any): Observable<any>{
    let options = new RequestOptions({headers: this.headers});
    return this.http.post(this.profesorsUrl, JSON.stringify(profesor), options)
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server Error: Couldn\'t CREATE Profesor'));
  }

  getAsignaturasByProfesorId(profesorId: number): Observable<any>{
    const url = `${this.profesorsUrl}/asignaturas?id=${profesorId}`;
    return this.http.get(url)
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server Error: Couldn\'t CREATE Profesor'));
  }

  getJefaturasByProfesorId(profesorId: number): Observable<any>{
    const url = `${this.profesorsUrl}/cursos?id=${profesorId}`;
    return this.http.get(url)
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server Error: Couldn\'t CREATE Profesor'));
  }

  asignarJefaturasByProfesorId(profesorId: number, cursos){
    const url = `${this.profesorsUrl}/cursos/${profesorId}`;
    let payload = {'cursos':cursos};

    return this.http.put(url, JSON.stringify(payload), {headers: this.headers})
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server Error'));
  }

  asignarAsignaturasByProfesorId(profesorId: number, asignaturas){
  const url = `${this.profesorsUrl}/asignaturas?id=${profesorId}`;
  let payload = {'asignaturas':asignaturas};

  return this.http.put(url, JSON.stringify(payload), {headers: this.headers})
.map(res => res.json())
  .catch((error:any) => Observable.throw(error.json().error || 'Server Error'));
}

}
