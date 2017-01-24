import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from "rxjs";

import * as globalVar from '../../globals';

@Injectable()
export class CursoAlumnosService {
  static get parameters(){
    return [[Http]]
  }

  private cursoAlumnosUrl = globalVar.apiUrl+'/cursos';

  constructor(private http: Http) {

    this.http=http;
  }

  private headers = new Headers({'Content-Type': 'application/json'});

  getCursos(): Observable<any> {
    return this.http.get(this.cursoAlumnosUrl)
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server Error: Couldn\'t GET Cursos'));
  }

  getCurso(id: number): Observable<any> {
    return this.getCursos()
      .map(cursos => cursos.find(curso => curso.curso.id == id));
  }

  /*updateCurso(curso: Curso){
    const url = `${this.alumnosCursoUrl}/${curso.id}`;
    let payload = {};
    payload['curso'] = JSON.parse(JSON.stringify(curso));

    return this.http.put(url, JSON.stringify(payload), {headers: this.headers})
      .map(() => curso)
      .catch((error:any) => Observable.throw(error.json().error || 'Server Error: Couldn\'t UPDATE Curso'));
  }*/

/*  createCurso(curso: Curso): Observable<Curso>{
    let options = new RequestOptions({headers: this.headers});
    let payload = {};
    payload['curso'] = JSON.parse(JSON.stringify(curso));

    return this.http.post(this.alumnosCursoUrl, JSON.stringify(payload), options)
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server Error: Couldn\'t CREATE Curso'));
  }

  deleteCurso(id: number): Observable<void>{
    const url = `${this.alumnosCursoUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .map(() => null)
      .catch((error:any) => Observable.throw(error.json().error || 'Server Error: Couldn\'t DELETE Curso'));
  }*/

}
