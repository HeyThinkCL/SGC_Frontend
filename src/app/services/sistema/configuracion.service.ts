import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from "rxjs";

import * as globalVar from '../../globals';

@Injectable()
export class ConfiguracionService {
  static get parameters(){
    return [[Http]]
  }

  private configuracionUrl = globalVar.apiUrl+'/configuracion';

  constructor(private http: Http) {

    this.http=http;
  }

  private headers = new Headers({'Content-Type': 'application/json'});

  setCalendarioConfig(config: any): Observable<any>{
    let payload = {'configuracion':config};

    return this.http
      .post(this.configuracionUrl, JSON.stringify(payload), {headers: this.headers})
      .map(res => res.json().data)
      .catch((error:any) => Observable.throw(error.json().error || 'Server Error: Couldn\'t Update Configuracion'));
  }

}
