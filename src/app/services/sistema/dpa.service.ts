import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from "rxjs";

import * as globalVar from '../../globals';

@Injectable()
export class DpaService {
  static get parameters(){
    return [[Http]]
  }

  private dpaUrl = globalVar.apiUrl;

  constructor(private http: Http) {
    this.http=http;
  }
  private token = JSON.parse(localStorage.getItem('currentUser')).token;
  private colegioId = JSON.parse(localStorage.getItem('currentUser')).colegioId;
  private userRol = JSON.parse(localStorage.getItem('currentUser')).rol;
  private headers = new Headers({'Content-Type': 'application/json','Authorization': this.token, 'colegio_id': this.colegioId,'user_rol':this.userRol});

  getRegiones(): Observable<any> {
    const url =`${this.dpaUrl}/regiones`;

    return this.http.get(url,{headers:this.headers})
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || error.status ));
  }

  getProvinciasByRegionId(regionId: string): Observable<any> {
    const url =`${this.dpaUrl}/regiones/${regionId}/provincias`;

    return this.http.get(url,{headers:this.headers})
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || error.status ));
  }

  getComunasByProvinciaIdRegionId(provinciaId: string): Observable<any> {
    const url =`${this.dpaUrl}/provincias/${provinciaId}/comunas`;

    return this.http.get(url,{headers:this.headers})
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || error.status ));
  }

  getDeptoProvincialbyComunaId(comunaId: string): Observable<any> {
    const url =`${this.dpaUrl}/comunas/${comunaId}/depto_prov`;

    return this.http.get(url,{headers:this.headers})
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || error.status ));
  }

}
