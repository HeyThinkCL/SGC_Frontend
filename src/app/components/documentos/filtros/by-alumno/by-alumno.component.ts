import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import {MatriculaService} from '../../../../services/sistema/matricula.service';

@Component({
  selector: 'app-by-alumno',
  templateUrl: './by-alumno.component.html',
  styleUrls: ['./by-alumno.component.css']
})
export class ByAlumnoComponent implements OnInit {
  @Input('docs') docs: string[];
  @Output() onSelect = new EventEmitter<any>();

  alumnos = [];

  public disabledSelect: boolean;
  selected = [];
  selectedHolder = [];

  filterData = '';
  filterKeys = ['nombre','apellido_paterno','apellido_materno','rut'];

  constructor(
    private matriculaService: MatriculaService,
  ) { }

  ngOnInit() {
    this.disabledSelect = false;
    this.matriculaService.getMatriculas().subscribe(alumnos => {
      this.alumnos = alumnos;
    })
  }

  selectAlumno(id){
    if (this.include(this.selected,id)){
      this.selected.splice(this.selected.indexOf(id),1);
    } else {
      this.selected.push(id);
    }
    this.emitSelection();
  }

  selectAll(){
    if(!(this.disabledSelect)){
      this.selectedHolder = this.selected;
      let selectedBuffer = [];
      for (let alumno of this.alumnos){
        selectedBuffer.push(alumno.id);
      }
      this.selected = selectedBuffer;
    } else {

      if(this.selectedHolder){
        this.selected = this.selectedHolder;
      } else {
        this.selected = [];
      }

    }
    this.disabledSelect = !(this.disabledSelect);
    this.emitSelection();
  }

  include(arr,obj) {
    return (arr.indexOf(obj) != -1);
  }

  emitSelection(){
    this.onSelect.emit(this.selected);
  }

}
