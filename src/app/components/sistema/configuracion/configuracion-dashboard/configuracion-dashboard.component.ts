import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location }       from '@angular/common';

@Component({
  selector: 'app-configuracion-dashboard',
  templateUrl: './configuracion-dashboard.component.html',
  styleUrls: ['./configuracion-dashboard.component.css']
})
export class ConfiguracionDashboardComponent implements OnInit {

  routes = [
    {
      'name':'Calendario Académico',
      'path':'calendario',
      'icon':'icon-calendar-o',
    },
    {
      'name':'Notas y Ponderaciones',
      'path':'notas',
      'icon':'icon-check-square-o',
    },
    {
      'name':'Jornada',
      'path':'jornada',
      'icon':'icon-bell-o',
    }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
  ) { }

  ngOnInit() {
  }

  goToRoute(path: string){
    this.router.navigate([`./${path}`],{relativeTo: this.route.parent});
  }

}
