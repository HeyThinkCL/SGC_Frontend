import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from "rxjs";

import * as globalVar from '../../globals';
@Injectable()
export class EstadosCivilesService {
  static get parameters(){
    return [[Http]]
  }

  private estadosCivilesUrl = globalVar.apiUrl+'/estados_civiles';

  constructor(private http: Http) {
    this.http=http;
  }
  private headers = new Headers({'Content-Type': 'application/json'});

  getEstadosCiviles(){
    return this.http.get(this.estadosCivilesUrl)
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || error.status ));
  }
}
