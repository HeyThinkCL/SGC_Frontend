import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-certificados',
  templateUrl: './certificados.component.html',
  styleUrls: ['./certificados.component.css']
})
export class CertificadosComponent implements OnInit {

  docs = [
    {'id':'cMatricula','nombre':'Certificado Matricula'},
    {'id':'cAlumnoRegular','nombre':'Certificado Alumno Regular'},
    {'id':'cInscripcion','nombre':'Certificado de Inscripción'},
    {'id':'cAsistencia','nombre':'Certificado de Asistencia'},
    {'id':'cTRaslado','nombre':'Certificado de Traslado'},
    {'id':'cRanking','nombre':'Ranking 4tos Medios'},
    {'id':'cAccidenteEscolar','nombre':'Certificado de Accidente Escolar'},
    {'id':'cPermisoSalida','nombre':'Permiso de Salida'},
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

  }


}
