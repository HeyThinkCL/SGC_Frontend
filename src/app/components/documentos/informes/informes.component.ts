import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-informes',
  templateUrl: './informes.component.html',
  styleUrls: ['./informes.component.css']
})
export class InformesComponent implements OnInit {

  docs = [
    {'id':'iNotas','nombre':'Informe de Notas'},
    {'id':'iAsistencia','nombre':'Informe de Asistencia'},
  ];

  options = [
    {'id':'fTipoEnsenanza','nombre':'Por Tipo de Enseñanza','icon':'icon-institution'},
    {'id':'fGrado','nombre':'Por Grado','icon':'icon-mortar-board'},
    {'id':'fCurso','nombre':'Por Curso','icon':'icon-users'},
    {'id':'fAlumno','nombre':'Por Alumno','icon':'icon-user'},
  ];

  docsId: string[] = [];
  optionId: string;
  subjectsId: string[] = [];

  constructor() { }

  ngOnInit() {
  }

  setDocumento(id: string){
    if(this.include(this.docsId,id)){
      this.docsId.splice(this.docsId.indexOf(id),1);
    } else {
      this.docsId.push(id);
    }
  }

  setOption(id: string){
    this.subjectsId = [];
    if(this.optionId == id){
      this.optionId = null;
    } else {
      this.optionId = id;
    }
  }

  include(arr,obj) {
    return (arr.indexOf(obj) != -1);
  }

  onSelectSubjects(subjects){
    if (subjects){
      this.subjectsId = subjects;
    } else {
      this.subjectsId = [];
    }

  }

  generateDocs(){
    let payload = {
      'docs':this.docsId,
      'filtro': this.optionId,
      'sujetos':this.subjectsId,
    };

    console.log(payload);
  }

}