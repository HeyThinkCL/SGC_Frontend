import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

import { MatriculaService } from '../../../../services/sistema/matricula.service';

@Component({
  selector: 'app-ver-matricula',
  templateUrl: 'ver-matricula.component.html',
  styleUrls: ['ver-matricula.component.css']
})
export class VerMatriculaComponent implements OnInit {
  @ViewChild('modal')
  modal: ModalComponent;

  filterData:string = '';
  filterKeys = ['nombre', 'apellido_paterno', 'apellido-materno', 'rut'];

  private matriculas = [
    {"id":1},
  ];

  selectedMatricula_id: number;

  constructor(
    private matriculaService: MatriculaService,
  ) { }

  getMatriculas() {
    this.matriculaService.getMatriculas().subscribe((response) => {this.matriculas = response})
  }

  ngOnInit(): void {
    this.getMatriculas();
  }

  indexOfObj(id: number): number {
    for (let i = 0; i < this.matriculas.length; i++) {
      if ( this.matriculas[i].id == id) {
        return i;
      }
    }
    return -1;
  }

  modalOpen(id: number): void {
    this.modal.open();
    this.selectedMatricula_id = id;
  }

  modalClose(id: number): void {
    this.deleteMatricula(id);
  }

  modalDismiss(): void {
    this.modal.dismiss();
  }

  deleteMatricula(id: number){
    this.matriculaService.deleteMatricula(id).subscribe(() => {
      let index = this.indexOfObj(id);
      this.matriculas.splice(index,1);
      this.modal.close();
      this.selectedMatricula_id = null;
    });
  }

}
