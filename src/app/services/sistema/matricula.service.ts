import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from "rxjs";

import * as globalVar from '../../globals';

@Injectable()
export class MatriculaService {
  static get parameters(){
    return [[Http]]
  }

  private matriculasUrl = globalVar.apiUrl+'/alumnos';

  constructor( private http: Http) { }

  private headers = new Headers({'Content-Type': 'application/json'});

  getMatriculas(): Observable<any[]> {
    const url = `${this.matriculasUrl}/matriculados`;
    return this.http.get(url)
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server Error: Couldn\'t GET Alumnos'));
  }

  getMatricula(id: number): Observable<any> {
    return this.getMatriculas()
      .map(matricula => matricula.find(matricula => matricula.id == id));
  }

  updateMatricula(matricula: any){
    const url = `${this.matriculasUrl}/${matricula.id}`;
    return this.http
      .put(url, JSON.stringify(matricula), {headers: this.headers})
      .map(() => matricula)
      .catch((error:any) => Observable.throw(error.json().error || 'Server Error: Couldn\'t UPDATE Alumno'));
  }

  createMatricula(matricula: any): Observable<any> {
    return this.http
      .post(this.matriculasUrl, JSON.stringify({nombre: matricula.nombre}), {headers: this.headers})
      .map(res => res.json().data)
      .catch((error:any) => Observable.throw(error.json().error || 'Server Error: Couldn\'t CREATE Alumno'));
  }

  deleteMatricula(id: number): Observable<any> {
    const url = `${this.matriculasUrl}/${id}`;
    return this.http
      .delete(url, {headers: this.headers})
      .map(() => null)
      .catch((error:any) => Observable.throw(error.json().error || 'Server Error: Couldn\'t DELETE Alumno'));

  }

  getAnotacionesById(alumnoId: number, cursoId: number): Observable<any> {
    const url = `${this.matriculasUrl}/${alumnoId}/anotaciones_alumno?curso_id=${cursoId}`;

    return this.http.get(url)
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server Error: Couldn\'t GET Anotaciones by Alumno Id'));
  }

}
