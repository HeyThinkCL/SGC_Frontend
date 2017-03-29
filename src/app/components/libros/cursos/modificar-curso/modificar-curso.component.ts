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

  asignaturasCurso = [];

  allAsignaturas = [];
  selectedAsignaturaId: number;

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
        });

        this.profesoresService.getProfesores().subscribe(profesores => {
          this.profesores = profesores;
          this.selectedCurso['profesor'] = profesores.find(p => p.id == this.selectedCurso.curso.profesor_id);
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
          this.allAsignaturas = asigns;
        })

      });


  }

  addAsignatura(){
    if(this.selectedAsignaturaId){
      let asignatura = this.allAsignaturas.find(a => a.id == this.selectedAsignaturaId);
      if(asignatura){
        this.asignaturasCurso.push(asignatura);
      }
    }
    this.selectedAsignaturaId = null;
  }

  deleteAsignatura(asignaturaId: number){
    let asignaturaIdx = this.asignaturasCurso.findIndex(a => a.id == asignaturaId);
    this.asignaturasCurso.splice(asignaturaIdx,1);

  }

  //../services

  saveCurso() {
    let asignaturasCheck: boolean = false;
    let profesorCheck: boolean = false;
    console.log(this.asignaturasCurso);
    this.cursosService.updateAsignaturasByCursoId(this.id, this.asignaturasCurso).subscribe(asigns => {
      asignaturasCheck = true;
      if(asignaturasCheck&&profesorCheck){
        this.modalOpen();
      }
    });
    this.cursosService.updateCurso(this.curso.curso).subscribe(asigns => {
      profesorCheck = true;
      if(asignaturasCheck&&profesorCheck){
        this.modalOpen();
      }
    })
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
