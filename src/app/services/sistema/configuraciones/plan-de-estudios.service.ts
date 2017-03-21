import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from "rxjs";

import * as globalVar from '../../../globals';

@Injectable()
export class PlanDeEstudiosService {
  static get parameters(){
    return [[Http]]
  }

  private planesDeEstudiosUrl = globalVar.apiUrl+'/configuraciones/plan_estudios';

  constructor(private http: Http) {
    this.http=http;
  }
  private headers = new Headers({'Content-Type': 'application/json'});

  getPlanesDeEstudio(): Observable<any>{
    return this.http.get(this.planesDeEstudiosUrl)
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || error.status ));
  }

  getConfigPlanesDeEstudio(idConfig: number): Observable<any>{
    return this.http.get(`${this.planesDeEstudiosUrl}/${idConfig}`)
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || error.status ));
  }

  getConfigPlanesDeEstudioById(idConfig: number): Observable<any>{
    return this.http.get(`${this.planesDeEstudiosUrl}?id=${idConfig}`)
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || error.status ));
  }

  createConfigPlanesDeEstudio(idConfig: number): Observable<any>{
    let url = `${this.planesDeEstudiosUrl}?id=${idConfig}`;

    let payload = {};

    return this.http.post(url, JSON.stringify({'config': payload}), {headers: this.headers})
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || error.status ));
  }

  updateConfigPlanesDeEstudio(idConfig: number,config: any): Observable<any>{
    let url = `${this.planesDeEstudiosUrl}/${idConfig}`;

    return this.http.put(url, JSON.stringify({'config': config}), {headers: this.headers})
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || error.status ));
  }

  //creación automática de cursos
  createCursosWithConfigPlanesDeEstudio(idConfig:number, configuracion: any, idColegio): Observable<any>{

    let url = `${globalVar.apiUrl}/configuraciones/cursos`;

    configuracion['colegio_id']=idColegio;

    return this.http.post(url, JSON.stringify({'config':configuracion}),{headers: this.headers})
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || error.status ));
  }

}
