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

  private token = JSON.parse(localStorage.getItem('currentUser')).token;
  private colegioId = JSON.parse(localStorage.getItem('currentUser')).colegioId;
  private userRol = JSON.parse(localStorage.getItem('currentUser')).rol;
  private headers = new Headers({'Content-Type': 'application/json','Authorization': this.token,'user_rol':this.userRol});

  constructor(private http: Http) {
    this.http=http;
    // this.token = JSON.parse(localStorage.getItem('currentUser')).token;
  }


  getColegios(): Observable<Colegio[]> {
    return this.http.get(this.colegiosUrl,{headers:this.headers})
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

  getAsignaturasByColegioId(): Observable<any>{
    const url = `${this.colegiosUrl}/asignaturas/${this.colegioId}`;
    return this.http.get(url,{headers:this.headers})
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server Error: Couldn\'t GET Asignaturas BY Colegio Id'));
  }
}
