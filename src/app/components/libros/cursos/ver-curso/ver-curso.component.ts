import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

import { connectionErrorMsg, emptyArrayMsg } from '../../../spinner/spinner.component';

import { CursosService } from '../../../../services/libros/cursos.service';
import { Curso } from '../curso';

@Component({
  selector: 'app-ver-curso',
  templateUrl: 'ver-curso.component.html',
  styleUrls: ['ver-curso.component.css']
})
export class VerCursoComponent implements OnInit {
  @ViewChild('modal')
  modal: ModalComponent;

  cursos = [];

  filterData: string = '';
  filterKeys = [
    {
    'mainKey':'curso',
    'subKeys':['grado','curso']
    }
  ];

  selectedCurso_id: number;

  timeoutMessage: string;

  constructor(
    private cursosService: CursosService,
  ) { }

  ngOnInit() {
    this.timeoutMessage = connectionErrorMsg();
    this.getCursos();
  }

  getCursos() {
    this.cursosService.getCursos().subscribe((res) => {
      this.cursos = res;
      console.log(this.cursos);
      if(!(res.length>0)){
        this.timeoutMessage = emptyArrayMsg("Cursos");
      }
    })
  }

  indexOfObj(id: number): number {
    for (let i = 0; i < this.cursos.length; i++) {
      if ( this.cursos[i].curso.id == id) {
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
