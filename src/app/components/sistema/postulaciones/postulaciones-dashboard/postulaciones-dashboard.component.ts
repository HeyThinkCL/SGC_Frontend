import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

import { PostulacionesService } from '../../../../services/sistema/postulaciones.service';

@Component({
  selector: 'app-postulaciones-dashboard',
  templateUrl: './postulaciones-dashboard.component.html',
  styleUrls: ['./postulaciones-dashboard.component.css']
})
export class PostulacionesDashboardComponent implements OnInit {
  @ViewChild('deleteModal') deleteModal: ModalComponent;

  filterData = '';
  selectedTable = '';
  subjects = [];

  constructor(
    private postulacionesService: PostulacionesService,
  ) { }

  ngOnInit() {
    this.selectedTable = 'tSinResolver';
  }

  onSelectSubjects(subjects){
    if (subjects){
      this.subjects = subjects;
    } else {
      this.subjects = [];
    }
  }

  deleteSelected(){

  }

  aceptarSelected(){
    if(this.subjects.length>0){
      let table = this.selectedTable;
      this.selectedTable = '';
      for(let postulante of this.subjects){
        if(postulante.rechazado){
          postulante.rechazado = false;
        }
        if(postulante.lista_espera){
          postulante.lista_espera = false;
        }
        if(!(postulante.aceptado)){
          postulante.aceptado = true;
        }
        this.postulacionesService.updatePostulante(postulante).subscribe(res => {
          this.selectedTable = table;
        });
      }
    }
  }

  moverAListaEsperaSelected(){
    if(this.subjects.length>0){
      let table = this.selectedTable;
      this.selectedTable = '';
      for(let postulante of this.subjects){
        if(postulante.rechazado){
          postulante.rechazado = false;
        }
        if(postulante.aceptado){
          postulante.aceptado = false;
        }
        if(!(postulante.lista_espera)){
          postulante.lista_espera = true;
        }
        this.postulacionesService.updatePostulante(postulante).subscribe(res => {
          this.selectedTable = table;
        });
      }
    }
  }

  rechazarSelected(){
    if(this.subjects.length>0){
      let table = this.selectedTable;
      this.selectedTable = '';
      for(let postulante of this.subjects){
        if(postulante.lista_espera){
          postulante.lista_espera = false;
        }
        if(postulante.aceptado){
          postulante.aceptado = false;
        }
        if(!(postulante.rechazado)){
          postulante.rechazado = true;
        }
        this.postulacionesService.updatePostulante(postulante).subscribe(res => {
          this.selectedTable = table;
        });
      }
    }
  }



}
