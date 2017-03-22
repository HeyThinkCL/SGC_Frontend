import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from "rxjs";

import { Colegio } from '../../components/sistema/colegios/colegio'

import * as globalVar from '../../globals';

@Injectable()
export class ColegiosService {
  static get parameters(){
    return [[Http]]
  }

  private colegiosUrl = globalVar.apiUrl+'/colegios';

  constructor(private http: Http) {

    this.http=http;
  }

  private headers = new Headers({'Content-Type': 'application/json'});

  getColegios(): Observable<Colegio[]> {
    return this.http.get(this.colegiosUrl)
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server Error: Couldn\'t GET Colegios'));
  }

  getColegio(id: number): Observable<Colegio> {
    return this.getColegios()
                .map(colegios => colegios.find(colegio => colegio.id == id));
  }

  updateColegio(colegio: Colegio){
    const url = `${this.colegiosUrl}/${colegio.id}`;
    return this.http.put(url, JSON.stringify(colegio), {headers: this.headers})
      .map(() => colegio)
      .catch((error:any) => Observable.throw(error.json().error || 'Server Error: Couldn\'t UPDATE Colegio'));
  }

  createColegio(colegio: Colegio): Observable<Colegio>{
    let options = new RequestOptions({headers: this.headers});
    return this.http.post(this.colegiosUrl, JSON.stringify(colegio), options)
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server Error: Couldn\'t CREATE Colegio'));
  }

  deleteColegio(id: number): Observable<void>{
    const url = `${this.colegiosUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .map(() => null)
      .catch((error:any) => Observable.throw(error.json().error || 'Server Error: Couldn\'t DELETE Colegio'));
  }

  getAsignaturasByColegioId(colegioId: number): Observable<any>{
    const url = `${this.colegiosUrl}/asignaturas/${colegioId}`;
    return this.http.get(url)
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server Error: Couldn\'t GET Asignaturas BY Colegio Id'));
  }

}
