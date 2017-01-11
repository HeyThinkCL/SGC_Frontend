import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-by-alumno',
  templateUrl: './by-alumno.component.html',
  styleUrls: ['./by-alumno.component.css']
})
export class ByAlumnoComponent implements OnInit {
  @Input('docs') docs: string[];
  @Output() onSelect = new EventEmitter<any>();

  alumnos = [
    {'id':'1','nombre':'Ivan','apellido_paterno':'Arenas','apellido_materno':'Sands','rut':'1111111','dv':'1'},
    {'id':'2','nombre':'Don','apellido_paterno':'Carter','apellido_materno':'Mailman','rut':'2222222','dv':'2'},
    {'id':'3','nombre':'Richard','apellido_paterno':'Gere','apellido_materno':'Gere','rut':'3333333','dv':'3'},
  ];

  public disabledSelect: boolean;
  selected = [];
  selectedHolder = [];

  filterData = '';

  constructor() { }

  ngOnInit() {
    this.disabledSelect = false;
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
