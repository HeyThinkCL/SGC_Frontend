import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-asignar-profesor',
  templateUrl: './asignar-profesor.component.html',
  styleUrls: ['./asignar-profesor.component.css']
})
export class AsignarProfesorComponent implements OnInit {
  id: number;
  private sub: any;

  jefaturas = [
    {'grado':'1ero Básico','curso':'C','id':1},
    {'grado':'8vo Básico','curso':'A','id':1},
  ];

  asignaturasDictadas = [
    {'nombre':'Matemáticas','id':1},
    {'nombre':'Física','id':2},
    {'nombre':'Matemáticas Electivo','id':3},
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
    });
  }

  goBack(): void {
    //change to router.navigate to navigate to parent route app/libro/ver-cursos
    //this.location.back navigates inside tabs, bad for tab logic.
    this.router.navigate(['./'],{relativeTo: this.route.parent});
  }

}
