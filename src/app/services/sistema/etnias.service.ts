import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from "rxjs";

import * as globalVar from '../../globals';

@Injectable()
export class EtniasService {
  static get parameters(){
    return [[Http]]
  }

  private etniasUrl = globalVar.apiUrl+'/etnias';

  constructor(private http: Http) {
    this.http=http;
  }
  private headers = new Headers({'Content-Type': 'application/json'});

  getEtnias(){
    return this.http.get(this.etniasUrl)
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || error.status ));
  }
}
