import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from "rxjs";

import * as globalVar from '../../../globals';
@Injectable()
export class ConfigNotasService {
  static get parameters(){
    return [[Http]]
  }

  private configuracionUrl = globalVar.apiUrl;

  constructor(private http: Http) {

    this.http=http;
  }

  private headers = new Headers({'Content-Type': 'application/json'});

  getConfigNotas(idConfig: number): Observable<any>{
    let url = `${this.configuracionUrl}/configuraciones/notas_ponderaciones/${idConfig}`;
    return this.http.get(url)
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || error.status ));
  }

  getConfigNotasById(idConfig: number): Observable<any>{
    let url = `${this.configuracionUrl}/configuraciones/notas_ponderaciones?id=${idConfig}`;
    return this.http.get(url)
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || error.status ));
  }

  createConfigNotas(idConfig: number): Observable<any>{
    let url = `${this.configuracionUrl}/configuraciones/notas_ponderaciones?id=${idConfig}`;

    let payload = {
      'notas':{
        'decimales':null,
        'aprox':null, // 0->aprox. hacia arriba, 1->truncado
      }
    };

    return this.http.post(url, JSON.stringify({'notas': payload}), {headers: this.headers})
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || error.status ));
  }

  updateConfigNotas(idConfig: number,config: any): Observable<any>{
    let url = `${this.configuracionUrl}/configuraciones/notas_ponderaciones/${idConfig}`;

    return this.http.put(url, JSON.stringify(config), {headers: this.headers})
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || error.status ));
  }
}
