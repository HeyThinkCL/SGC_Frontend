import { Component, OnInit } from '@angular/core';

import {CertificadosService} from '../../../services/documentos/certificados.service';

import * as globalVar from '../../../globals';

@Component({
  selector: 'app-certificados',
  templateUrl: './certificados.component.html',
  styleUrls: ['./certificados.component.css']
})
export class CertificadosComponent implements OnInit {

  docs = [
    // {'id':1,'nombre':'Certificado Matricula'},
    {'id':2,'nombre':'Certificado Alumno Regular'},
    // {'id':3,'nombre':'Certificado de Inscripción'},
    // {'id':4,'nombre':'Certificado de Asistencia'},
    // {'id':5,'nombre':'Certificado de Traslado'},
    // {'id':6,'nombre':'Ranking 4tos Medios'},
    // {'id':7,'nombre':'Certificado de Accidente Escolar'},
    // {'id':8,'nombre':'Permiso de Salida'},
  ];

  options = [
    // {'id':1,'nombre':'Por Plan de Estudios','icon':'icon-institution'},
    // {'id':2,'nombre':'Por Tipo de Enseñanza','icon':'icon-institution'},
    // {'id':3,'nombre':'Por Nivel','icon':'icon-mortar-board'},
    {'id':4,'nombre':'Por Curso','icon':'icon-users'},
    {'id':5,'nombre':'Por Alumno','icon':'icon-user'},
  ];

  docsId: any[] = [];
  optionId: number;
  subjectsId: any[] = [];

  constructor(
    private certificadosService: CertificadosService,
  ) { }

  ngOnInit() {
  }

  setDocumento(id: string){
    if(this.include(this.docsId,id)){
      this.docsId.splice(this.docsId.indexOf(id),1);
    } else {
      this.docsId.push(id);
    }
  }

  setOption(id){
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

    for(let docId of this.docsId){
      if(docId==2){
        this.certificadosService.generateAlumnoRegular(this.optionId,this.subjectsId).subscribe(res => {
          console.log(res);
          if(res && res.status){
            let url: string = globalVar.apiUrl+'/'+res.status;
            window.open(url)
          }
        })
      }
    }

  }


}
