import {Component, OnInit, ViewChild} from '@angular/core';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

import {InformesService} from '../../../services/documentos/informes.service';

import * as globalVar from '../../../globals';

@Component({
  selector: 'app-informes',
  templateUrl: './informes.component.html',
  styleUrls: ['./informes.component.css']
})
export class InformesComponent implements OnInit {
  @ViewChild('modal')
  modal: ModalComponent;

  docs = [
    {'id':1,'nombre':'Informe de Notas'},
    {'id':2,'nombre':'Lista de Curso'},
    // {'id':2,'nombre':'Informe de Asistencia'},
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
    private informesService: InformesService,
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
      if(!(this.checkListaDeCurso() && id==5)){
        this.optionId = id;
      }
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

  modalOpen(): void {
    this.modal.open();
  }

  modalClose(): void {
    this.modal.close();
  }

  checkListaDeCurso(): boolean{
    return this.include(this.docsId,2);
  }

  generateDocs(){
    let payload = {
      'docs':this.docsId,
      'filtro': this.optionId,
      'sujetos':this.subjectsId,
    };

    for(let docId of this.docsId){
      if(docId==1){
        this.modalOpen();
        this.informesService.generateInformeNotas(this.optionId,this.subjectsId).subscribe(res => {
          console.log(res);
          if(res && res.status){
            let url: string = globalVar.apiUrl+'/'+res.status;
            window.open(url);
            this.modalClose();
          }
        })

      }
      if(docId==2){
        this.informesService.generateListaDeCurso(this.optionId,this.subjectsId).subscribe(res => {
          if(res && res.status){
            let url: string = globalVar.apiUrl+'/'+res.status;
            window.open(url);
          }
        })

      }
    }

  }

}
