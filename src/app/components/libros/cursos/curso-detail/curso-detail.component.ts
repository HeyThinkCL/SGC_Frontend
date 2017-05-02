import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

import { CursosService } from '../../../../services/libros/cursos.service';

@Component({
  selector: 'app-curso-detail',
  templateUrl: 'curso-detail.component.html',
  styleUrls: ['curso-detail.component.css']
})
export class CursoDetailComponent implements OnInit {
  id: number;
  private sub: any;

  private curso: any;
  private cursos = [];

  private currentTabPath: string = '';
  private tabs = [
    {"id":1,"path":'lista',"label":"Lista Curso","icon":"icon-users"},
    {"id":2,"path":'notas',"label":"Notas","icon":"icon-check-square-o"},
    {"id":3,"path":'asistencia',"label":"Asistencia","icon":"icon-calendar-check-o"},
    {"id":4,"path":'anotaciones',"label":"Anotaciones","icon":"icon-bullhorn"},
  ];

  constructor(
    private cursosService: CursosService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.router.events.subscribe((res) => {
        this.currentTabPath = this.route.children[0].toString();
      }
    )
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
    });

    this.route.params
      .switchMap((params: Params) => this.cursosService.getCurso(+params['id']))
      .subscribe((curso) => {
        this.curso = curso;
      });

    this.cursosService.getCursos().subscribe(cursos => {
      this.cursos = cursos;
    });
  }

  checkMultiplesCursos(grado: string){
    return this.getAllInstancesByGrado(this.cursos,grado).length>1? true : false;
  }

  getAllInstancesByGrado(array, grado): any[]{
    let instances = [];

    for(let a of array){
      if(a.curso.grado==grado){
        instances.push(a);
      }
    }
    return instances;
  }

  //navigation
  goBack(): void {
    //change to router.navigate to navigate to parent route app/libro/ver-cursos
    //this.location.back navigates inside tabs, bad for tab logic.
    this.router.navigate(['./'],{relativeTo: this.route.parent});
  }

  goToTab(path: string){
    this.router.navigate(['.',path],{relativeTo: this.route});
  }

  //service


}
