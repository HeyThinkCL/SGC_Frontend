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
    let url = `${this.configuracionUrl}/configuraciones/notas/${idConfig}`;
    return this.http.get(url)
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || error.status ));
  }

  getConfigNotasById(idConfig: number): Observable<any>{
    let url = `${this.configuracionUrl}/configuraciones/notas?id=${idConfig}`;
    return this.http.get(url)
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || error.status ));
  }

  createConfigNotas(idConfig: number): Observable<any>{
    let url = `${this.configuracionUrl}/configuraciones/notas?id=${idConfig}`;

    let payload = {
      'notas':{
        'decimales':null,
        'aproximacion':'',
      }
    };

    return this.http.post(url, JSON.stringify({'notas': payload}), {headers: this.headers})
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || error.status ));
  }

  updateConfigNotas(idConfig: number,config: any): Observable<any>{
    let url = `${this.configuracionUrl}/configuraciones/notas/${idConfig}`;

    return this.http.put(url, JSON.stringify({'notas': config}), {headers: this.headers})
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || error.status ));
  }
}
