import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from "rxjs";

import * as globalVar from '../../globals';

@Injectable()
export class AsistenciaService {
  static get parameters(){
    return [[Http]]
  }
'http://localhost:3000/libro_clases/cursos/asistencias?mes=2016-01-01&curso_id=1'
  private asistenciaUrl = globalVar.apiUrl+'/libro_clases/cursos/asistencias';

  constructor(private http: Http) {

    this.http=http;
  }

  private headers = new Headers({'Content-Type': 'application/json'});

  getInasistenciasByMonth(idCurso: number, day: Date){
    const url = `${this.asistenciaUrl}?anno=${day.getFullYear()}&mes=${day.getMonth()+1}&curso_id=${idCurso}`;

    return this.http.get(url)
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || error.status));
  }

  updateInasistencia(payload: any, cursoId: number){
    payload['curso_id'] = cursoId;
    return this.http
      .post(this.asistenciaUrl, JSON.stringify({'asistencias':payload}), {headers: this.headers})
      .map(() => {})
      .catch((error:any) => Observable.throw(error.json().error || 'Server Error: Couldn\'t UPDATE Asistencia'));
  }

}
