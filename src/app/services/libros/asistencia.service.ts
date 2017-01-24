import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from "rxjs";

import * as globalVar from '../../globals';

@Injectable()
export class AsistenciaService {
  static get parameters(){
    return [[Http]]
  }

  private asistenciaUrl = globalVar.apiUrl+'/asistencia';

  constructor(private http: Http) {

    this.http=http;
  }

  private headers = new Headers({'Content-Type': 'application/json'});

}
