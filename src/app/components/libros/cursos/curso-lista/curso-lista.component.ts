import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { CursosService } from '../../../../services/libros/cursos.service';

@Component({
  selector: 'app-curso-lista',
  templateUrl: 'curso-lista.component.html',
  styleUrls: ['curso-lista.component.css']
})
export class CursoListaComponent implements OnInit {
  id: number;
  private sub: any;

  curso: any;
  alumnos = [];

  constructor(
    private cursosService: CursosService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.sub = this.route.parent.params.subscribe(params => {
      this.id = params['id'];
    });

    this.route.parent.params
      .switchMap((params: Params) => this.cursosService.getCursoById(params['id']))
      .subscribe((curso) => {
        this.curso = curso;
        this.alumnos = curso.alumnos;
      });
  }

}
