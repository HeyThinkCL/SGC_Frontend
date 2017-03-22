import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from "rxjs";

import { Curso } from '../../components/libros/cursos/curso';

import * as globalVar from '../../globals';

@Injectable()
export class CursosService {
  static get parameters(){
    return [[Http]]
  }

  private cursosUrl = globalVar.apiUrl+'/libro_clases/cursos';

  constructor(private http: Http) {

    this.http=http;
  }

  private headers = new Headers({'Content-Type': 'application/json'});

  getCursos(): Observable<any> {
    return this.http.get(this.cursosUrl)
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server Error: Couldn\'t GET Cursos'));
  }

  getCurso(id: number): Observable<any> {
    return this.getCursos()
      .map(cursos => cursos.find(curso => curso.curso.id == id));
  }

  getCursoById(id): Observable<any> {
    const url = `${this.cursosUrl}/${id}`;
    return this.http.get(url)
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server Error: Couldn\'t GET Curso BY ID'));
  }

  getAsignaturasByCursoId(id): Observable<any> {
    const url = `${this.cursosUrl}/asignaturas/${id}`;
    return this.http.get(url)
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server Error: Couldn\'t GET Asignaturas by CursoID'));
  }

  getNotasAlumnosByCursoId(id,asignatura): Observable<any> {
    const url = `${this.cursosUrl}/notas/${id}?asignatura_id=${asignatura}`;
    return this.http.get(url)
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server Error: Couldn\'t GET Notas Alumnos by CursoID'));
  }

  updateCurso(curso: Curso){
    const url = `${this.cursosUrl}/${curso.id}`;
    let payload = {};
    payload['curso'] = JSON.parse(JSON.stringify(curso));

    return this.http.put(url, JSON.stringify(payload), {headers: this.headers})
      .map(() => curso)
      .catch((error:any) => Observable.throw(error.json().error || 'Server Error: Couldn\'t UPDATE Curso'));
  }

  createCurso(curso: Curso, idColegio: number): Observable<any>{
    let options = new RequestOptions({headers: this.headers});
    curso['colegio_id'] = idColegio;

    return this.http.post(this.cursosUrl, JSON.stringify({'curso':curso}), options)
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || error.status));
      // .catch((error:any) => Observable.throw(error.json().error || 'Server Error: Couldn\'t CREATE Curso'));
  }

  deleteCurso(id: number): Observable<void>{
    const url = `${this.cursosUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .map(() => null)
      .catch((error:any) => Observable.throw(error.json().error || 'Server Error: Couldn\'t DELETE Curso'));
  }

  getAnotacionesGenerales(id: number): Observable<any>{
    const url = `${this.cursosUrl}/anotaciones?id=${id}`;

    return this.http.get(url)
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server Error: Couldn\'t GET Anotaciones of Curso'));
  }

  asignarAlumnoACurso(cursoId: number, alumnoId: number): Observable<any>{
    let payload = {};
    payload['curso']={
      'curso_id':cursoId,
      'alumno_id':alumnoId,
    };

    const url = `${this.cursosUrl}/alumnos`;

    return this.http
      .post(url, JSON.stringify(payload), {headers: this.headers})
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server Error: Couldn\'t GET Anotaciones of Curso'));
  }
}
