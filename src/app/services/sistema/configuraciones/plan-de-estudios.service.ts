import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from "rxjs";

import * as globalVar from '../../../globals';

@Injectable()
export class PlanDeEstudiosService {
  static get parameters(){
    return [[Http]]
  }

  private planesDeEstudiosUrl = globalVar.apiUrl+'/configuraciones/plan_estudio/plan_estudios';

  constructor(private http: Http) {
    this.http=http;
  }
  private headers = new Headers({'Content-Type': 'application/json'});

  getPlanesDeEstudio(){
    return this.http.get(globalVar.apiUrl+'/configuraciones/plan_estudios')
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || error.status ));
  }

  getConfigPlanesDeEstudio(){
    return this.http.get(this.planesDeEstudiosUrl)
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || error.status ));
  }
}
