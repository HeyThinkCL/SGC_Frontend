import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-by-curso',
  templateUrl: './by-curso.component.html',
  styleUrls: ['./by-curso.component.css']
})
export class ByCursoComponent implements OnInit {
  @Input('docs') docs: string[];
  @Output() onSelect = new EventEmitter<any>();

  cursos = [
    {
      'curso':{'id':'1','grado':'1ero Básico','curso':'D','anio':'2017'},
      'profesor':{'nombre':'Juan','apellido_paterno':'Jose','apellido_materno':'Miguel'}
    },
    {
      'curso':{'id':'2','grado':'4to Medio','curso':'A','anio':'2017'},
      'profesor':{'nombre':'Juan','apellido_paterno':'Jose','apellido_materno':'Miguel'}
    },
  ];

  filterData = '';

  public disabledSelect: boolean;
  selected = [];
  selectedHolder = [];

  constructor() { }

  ngOnInit() {
    this.disabledSelect = false;
  }

  selectCurso(id){
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
      for (let curso of this.cursos){
        selectedBuffer.push(curso.curso.id);
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
