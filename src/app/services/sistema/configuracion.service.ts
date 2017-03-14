import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from "rxjs";

import * as globalVar from '../../globals';

@Injectable()
export class ConfiguracionService {
  static get parameters(){
    return [[Http]]
  }

  private configuracionUrl = globalVar.apiUrl+'/configuraciones';

  constructor(private http: Http) {

    this.http=http;
  }

  private headers = new Headers({'Content-Type': 'application/json'});

  getConfiguraciones(): Observable<any>{
    return this.http.get(this.configuracionUrl)
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || error.status ));
  }

}
