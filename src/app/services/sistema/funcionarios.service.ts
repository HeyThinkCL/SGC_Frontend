import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from "rxjs";

import * as globalVar from '../../globals';

@Injectable()
export class FuncionariosService {
  static get parameters(){
    return [[Http]]
  }

  private funcionariosUrl = globalVar.apiUrl+'/funcionarios';

  constructor(private http: Http) {

    this.http=http;
  }

  private token = JSON.parse(localStorage.getItem('currentUser')).token;
  private colegioId = JSON.parse(localStorage.getItem('currentUser')).colegioId;
  private userRol = JSON.parse(localStorage.getItem('currentUser')).rol;
  private headers = new Headers({'Content-Type': 'application/json','Authorization': this.token, 'colegio_id': this.colegioId,'user_rol':this.userRol});

  getFuncionarios(): Observable<any>{
    return this.http.get(this.funcionariosUrl,{headers:this.headers})
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || error.status ));
  }

  getFuncionario(id: number): Observable<any>{
    return this.getFuncionarios()
      .map(funcionario => funcionario.find(func => func.id == id));
  }

  getFuncionarioById(id: number){
    const url = `${this.funcionariosUrl}/${id}`;
    return this.http.get(url,{headers:this.headers})
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || error.status ));
  }

  createFuncionario(funcionario: any): Observable<any>{
    return this.http
      .post(this.funcionariosUrl, JSON.stringify({'funcionario':funcionario}), {headers: this.headers})
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server Error: Couldn\'t CREATE Funcionario'));
  }

  updateFuncionario(funcionario){
    const url = `${this.funcionariosUrl}/${funcionario.id}`;
    return this.http
      .put(url, JSON.stringify(funcionario), {headers: this.headers})
      .map(() => funcionario)
      .catch((error:any) => Observable.throw(error.json().error || 'Server Error: Couldn\'t UPDATE Funcionario'));
  }

  deleteFuncionario(id: number){
    const url = `${this.funcionariosUrl}/${id}`;
    return this.http
      .delete(url, {headers: this.headers})
      .map(() => null)
      .catch((error:any) => Observable.throw(error.json().error || 'Server Error: Couldn\'t DELETE Funcionario'));
  }
}
