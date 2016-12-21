import {Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

import { CursosService } from '../../services/libros/cursos.service';
import { Curso } from './curso';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit {
  @ViewChild('modal')
  modal: ModalComponent;

  cursos = [
    {"grado":"1ro medio", "curso":"A", "profesor":"Juan Pérez", "id":1 },
    {"grado":"8vo básico", "curso":"H", "profesor":"Juan Pérez", "id":2 },
    {"grado":"3ro medio", "curso":"B", "profesor":"Juan Pérez", "id":3 },
    {"grado":"7mo básico", "curso":"B", "profesor":null, "id":4 },
  ];

  selectedCurso_id: number;

  constructor(
    private cursosService: CursosService,
  ) { }

  ngOnInit() {
    this.getCursos();
  }

  getCursos() {
    this.cursosService.getCursos().subscribe((res) => {
      this.cursos = res;
    })
  }

  indexOfObj(id: number): number {
    for (let i = 0; i < this.cursos.length; i++) {
      if ( this.cursos[i].id == id) {
        return i;
      }
    }
    return -1;
  }

  modalOpen(id: number): void {
    this.modal.open();
    this.selectedCurso_id = id;
  }

  modalClose(id: number): void {
    this.deleteCurso(id);
  }

  modalDismiss(): void {
    this.modal.dismiss();
  }


  deleteCurso(id: number): void {
    this.cursosService.deleteCurso(id).subscribe(()=>{
      let index = this.indexOfObj(id);
      this.cursos.splice(index,1);
      this.modal.close();
      this.selectedCurso_id = null;
    });
  }

}
