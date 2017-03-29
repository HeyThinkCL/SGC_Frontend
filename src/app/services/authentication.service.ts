import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from "rxjs";

@Injectable()
export class AuthenticationService {

  public token: string;
  public colegioId: number;

  private users = [
    {
      'user':'test1',
      'password':'test1',
      'colegioId':1,
      'rol':1,
      'usuario':{
        'nombre':'Manuel',
        'apellido_paterno':'Alba'
      }
    },
    {
      'user':'test2',
      'password':'test2',
      'colegioId':1,
      'rol':2,
      'usuario':{
        'nombre':'Manuel',
        'apellido_paterno':'Alba'
      }
    },
    {
      'user':'test3',
      'password':'test3',
      'colegioId':1,
      'rol':3,
      'usuario':{
        'nombre':'Manuel',
        'apellido_paterno':'Alba'
      }
    },
    {
      'user':'test4',
      'password':'test4',
      'colegioId':1,
      'rol':4,
      'usuario':{
        'nombre':'Manuel',
        'apellido_paterno':'Alba'
      }
    },
    {
      'user':'test5',
      'password':'test5',
      'colegioId':1,
      'rol':5,
      'usuario':{
        'nombre':'Manuel',
        'apellido_paterno':'Alba'
      }
    },
    {
      'user':'test6',
      'password':'test6',
      'colegioId':2,
      'rol':1,
      'usuario':{
        'nombre':'Manuel',
        'apellido_paterno':'Alba'
      }
    },
  ];

  private userRol = [
    {'rol':1,'glosa':'Sostenedor'},
    {'rol':2,'glosa':'Director'},
    {'rol':3,'glosa':'UTP'},
    {'rol':4,'glosa':'Administrador'},
    {'rol':5,'glosa':'Digitador'},
  ];
  constructor() {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;
  }

  login(user: string, password: string){
    let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzY290Y2guaW8iLCJleHAiOjEzMDA4MTkzODAsIm5hbWUiOiJDaHJpcyBTZXZpbGxlamEiLCJhZG1pbiI6dHJ1ZX0.03f329983b86f7d9a9f5fef85305880101d5e302afafa20154d094b229f75773';

    let userData = this.users.find(u => u.user==user && u.password==password);

    if(userData && token){
      this.token = token;
      let sesion = this.userRol.find(r => r.rol==userData.rol).glosa;
      localStorage.setItem('currentUser', JSON.stringify(
          { username: user,
            token: token,
            colegioId: userData.colegioId,
            rol: userData.rol,
            sesion: sesion,
            nombre: userData.usuario.nombre,
            apellido: userData.usuario.apellido_paterno,
          }
        )
      );
      return true;
    } else {
      return false;
    }
  }

  logout(): void {
    this.token = null;
    localStorage.removeItem('currentUser');
  }

}
