import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

import { CursosService } from '../../../../services/libros/cursos.service';

@Component({
  selector: 'app-curso-lista',
  templateUrl: 'curso-lista.component.html',
  styleUrls: ['curso-lista.component.css']
})
export class CursoListaComponent implements OnInit {
  @ViewChild('modal')
  modal: ModalComponent;

  id: number;
  private sub: any;

  curso: any;
  alumnos = [];
  selectedAlumno: any;

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
        console.log(this.alumnos);
      });
  }

  desiste(alumno: any){
    alumno.desiste = true;
  }

  modalOpen(alumno: any){
    this.modal.open('sm');
    this.selectedAlumno = alumno;
  }

  modalClose(){
    this.desiste(this.selectedAlumno);
    this.modal.close();
  }

  modalDismiss(){
    this.modal.dismiss();
  }

}
