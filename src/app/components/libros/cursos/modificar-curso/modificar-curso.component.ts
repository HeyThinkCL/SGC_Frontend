import {Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common'
import { ActivatedRoute, Params } from '@angular/router';

import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

import { Curso } from '../curso';
import { CursosService } from '../../../../services/libros/cursos.service';
import { ProfesoresService } from '../../../../services/libros/profesores.service';
import {ColegiosService} from '../../../../services/sistema/colegios.service';

@Component({
  selector: 'app-modificar-curso',
  templateUrl: 'modificar-curso.component.html',
  styleUrls: ['modificar-curso.component.css']
})
export class ModificarCursoComponent implements OnInit {
  @ViewChild('modal')
  modal: ModalComponent;

  id: number;
  private sub: any;

  curso: any;
  selectedCurso: any;

  profesores = [];

  asignaturasCurso = [
    {'id':1,'nombre':'Lenguaje y Comunicación','obligatoria':true,'horas':null},
    {'id':2,'nombre':'Matemáticas','obligatoria':false,'horas':null},
  ];

  allAsignaturas = [
    {'id':1,'nombre':'Lenguaje y Comunicación','obligatoria':true},
    {'id':2,'nombre':'Matemáticas','obligatoria':false},
    {'id':3,'nombre':'Historia','obligatoria':false},
    {'id':4,'nombre':'Religión','obligatoria':false},
  ];

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private cursosService: CursosService,
    private profesoresService: ProfesoresService,
    private colegiosService: ColegiosService,
  ) { }

  ngOnInit() {


    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
    });

    this.route.params
      .switchMap((params: Params) => this.cursosService.getCurso(+params['id']))
      .subscribe((curso) => {
        this.curso = curso;
        this.selectedCurso = JSON.parse(JSON.stringify(curso));

        this.cursosService.getAsignaturasByCursoId(this.id).subscribe(asigns => {
          let _asignaturas = [];
          for(let asign of asigns.asignaturas){
            _asignaturas.push(asign.asignatura.datos);
          }
          this.asignaturasCurso = _asignaturas;
        })

      });

    this.profesoresService.getProfesores().subscribe(profesores => {
      this.profesores = profesores;
      for(let profesor of this.profesores){
        profesor['asignaturas'] = [];
        this.profesoresService.getAsignaturasByProfesorId(profesor.id).subscribe(asigns => {
          for(let asign of asigns){
            profesor.asignaturas.push(asign.id);
          }
        })
      }
    });

    this.colegiosService.getAsignaturasByColegioId(1).subscribe(asigns => {
      console.log(asigns);
      this.allAsignaturas = asigns;
    })
  }

  //../services

  saveCurso() {
    this.cursosService.updateCurso(this.curso.curso).subscribe((res) => {
      this.modalOpen();
    });
  }
  //navigation
  goBack(): void {
    this.location.back();
  }
  //modal
  modalOpen(): void {
    this.modal.open();
  }

  modalClose(): void {
    this.modal.close();
    this.goBack();
  }


}
