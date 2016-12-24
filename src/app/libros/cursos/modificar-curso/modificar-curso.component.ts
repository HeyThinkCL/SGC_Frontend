import {Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common'
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

import { Curso } from '../curso';
import { CursosService } from '../../../services/libros/cursos.service';
import { ProfesoresService } from '../../../services/libros/profesores.service';

@Component({
  selector: 'app-modificar-curso',
  templateUrl: './modificar-curso.component.html',
  styleUrls: ['./modificar-curso.component.css']
})
export class ModificarCursoComponent implements OnInit {
  @ViewChild('modal')
  modal: ModalComponent;

  curso: Curso;
  selectedCurso: Curso;

  profesores = [
    {"nombre":"Pedro Fernandez","id":1},
    {"nombre":"Juan Carlos Giadach","id":2},
    {"nombre":"Ivan Arenas","id":3},
    {"nombre":"Valentin Trujillo","id":4},
  ];

  constructor(
    private location: Location,
    private cursosService: CursosService,
    private profesoresService: ProfesoresService,
  ) { }

  ngOnInit() {
    this.curso = new Curso();
    this.selectedCurso = new Curso();
    this.selectedCurso.profesor = "Juan Pérez";
  }

  goBack(): void {
    this.location.back();
  }

  modalOpen(): void {
    this.modal.open();
  }

  modalClose(): void {
    this.modal.close();
    this.goBack();
  }

  saveCurso() {
    this.modalOpen();
  }

}