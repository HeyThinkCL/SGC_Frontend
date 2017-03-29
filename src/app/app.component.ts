import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import {AuthenticationService} from './services/authentication.service';
import {ConfiguracionService} from './services/sistema/configuracion.service';

import * as globalVars from './globals';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  private currentUser;

  configRoutes = [];
  configRoutesData = [
    {
      'glosa':'Calendario Académico',
      'path':'calendario',
      'icon':'icon-calendar-o',
    },
    {
      'glosa':'Notas y Ponderaciones',
      'path':'notas',
      'icon':'icon-check-square-o',
    },
    {
      'glosa':'Jornada',
      'path':'jornada',
      'icon':'icon-bell-o',
    },
    {
      'glosa':'Planes de Estudio y Tipos de Enseñanza',
      'path':'planes-ensenanza',
      'icon':'icon-graduation-cap',
    }
  ];

  version: string;

  constructor(
    private configuracionService: ConfiguracionService,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
  ){}

  ngOnInit(){
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

    this.version = globalVars.version;
    this.configuracionService.getConfiguraciones().subscribe(res => {
      this.configRoutes = res;
      for(let r of this.configRoutes){
        let data = this.configRoutesData.find(data => data.glosa == r.glosa);
        r['path'] = data.path;
        r['icon'] = data.icon;
      }
    })
  }

  goToConfigRoute(id: number){
    if(localStorage.getItem('idConfig')){
      localStorage.setItem('idConfig',id.toString());
    } else {
      localStorage['idConfig'] = id;
    }

  }

  //currentUser
  getUserRol(){
    return +atob(atob(this.currentUser.rol))[5];
  }

  logout(){
    this.authenticationService.logout();
    this.router.navigate(['../login'])
  }
}
