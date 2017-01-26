import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from "rxjs";

import * as globalVar from '../../globals';

@Injectable()
export class CalendarioService {
  static get parameters(){
    return [[Http]]
  }

  private configuracionUrl = globalVar.apiUrl;

  constructor(private http: Http) {

    this.http=http;
  }

  private headers = new Headers({'Content-Type': 'application/json'});

  getConfigCalendarioAcademico(idConfig: number): Observable<any>{
    let url = `${this.configuracionUrl}/configuraciones/calendario_academicos/${idConfig}`;
    return this.http.get(url)
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || error.status ));
  }

  getConfigCalendarioAcademicoById(idConfig: number): Observable<any>{
    let url = `${this.configuracionUrl}/configuraciones/calendario_academicos?id=${idConfig}`;
    return this.http.get(url)
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || error.status ));
  }

  createConfigCalendarioAcademico(idConfig: number): Observable<any>{
    let url = `${this.configuracionUrl}/configuraciones/calendario_academicos?id=${idConfig}`;

    let payload = {
      'periodo_academico':{
        'glosa':'',
        'fecha_inicio':null,
        'fecha_termino':null,
      },
      'vacaciones':[
        {
          'glosa':'',
          'fecha_inicio':null,
          'fecha_termino':null,
        }
      ],
      'fechas_especiales':[
        {
          'glosa':'',
          'fecha_inicio':null,
          'fecha_termino':null,
        }
      ]
    };

    return this.http.post(url, JSON.stringify({'calendario': payload}), {headers: this.headers})
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || error.status ));
  }

  createEventCalendarioAcademico(vacaciones: boolean, idConfig: number): Observable<any>{
    let url = `${this.configuracionUrl}/calendario_academicos`;

    let payload = {
      'id_config':idConfig,
      'vacaciones':vacaciones,
      'glosa':'',
      'fecha_inicio':null,
      'fecha_termino':null,
    };

    return this.http.post(url, JSON.stringify({'evento': payload}), {headers: this.headers})
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || error.status ));
  }

  updateConfigCalendarioAcademico(idConfig: number,config: any): Observable<any>{
    let url = `${this.configuracionUrl}/configuraciones/calendario_academicos/${idConfig}`;

    return this.http.put(url, JSON.stringify({'calendario': config}), {headers: this.headers})
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || error.status ));
  }

  deleteEventCalendarioAcademico(idEvent: number): Observable<any>{
    let url = `${this.configuracionUrl}/calendario_academicos/${idEvent}`;

    return this.http.delete(url)
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || error.status ));
  }



}
