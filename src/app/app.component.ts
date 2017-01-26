import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import {ConfiguracionService} from './services/sistema/configuracion.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app works!';

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
      'glosa':'Cursos',
      'path':'cursos',
      'icon':'icon-graduation-cap',
    }
  ];

  constructor(
    private configuracionService: ConfiguracionService,
    private route: ActivatedRoute,
    private router: Router,
  ){}

  ngOnInit(){
    this.configuracionService.getConguraciones().subscribe(res => {
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
}
