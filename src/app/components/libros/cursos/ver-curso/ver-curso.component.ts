import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';


import { connectionErrorMsg, emptyArrayMsg } from '../../../spinner/spinner.component';

import { CursosService } from '../../../../services/libros/cursos.service';
import { Curso } from '../curso';
import { PlanDeEstudiosService } from '../../../../services/sistema/configuraciones/plan-de-estudios.service';
import { ConfiguracionService } from '../../../../services/sistema/configuracion.service';

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

  private planesDeEstudio = [];
  selectedCurso_id: number;

  timeoutMessage: string;

  constructor(
    private cursosService: CursosService,
    private planDeEStudiosService: PlanDeEstudiosService,
    private configuracionService: ConfiguracionService,
  ) { }

  ngOnInit() {
    this.timeoutMessage = connectionErrorMsg();
    this.getCursos();
  }

  getCursos() {
    this.cursosService.getCursos().subscribe((res) => {
      this.cursos = res;
      if(!(res.length>0)){
        this.timeoutMessage = emptyArrayMsg("Cursos");
      }
    });

    this.configuracionService.getConfiguraciones().subscribe(configs => {
      let configId = configs.find(c => c.glosa == 'Planes de Estudio y Tipos de Enseñanza').id;

      this.planDeEStudiosService.getConfigPlanesDeEstudio(configId).subscribe(res => {
        this.planesDeEstudio = res.planes;
      })
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

  getPlanName(planId: number){
    let plan = this.planesDeEstudio.find(p => p.id == planId);
    if(plan){
      let planName = plan.decreto;
      return planName.length>50 ? planName.substring(0,planName.length-10)+'...' : planName;
    } else return '';

  }

  getTipoName(planId: number, tipoId: number){

    let plan = this.planesDeEstudio.find(p => p.id == planId);
    if(plan){
      let tipo = plan.tipos.find(t => t.tipo.id == tipoId);
      if(tipo){
        let tipoName = tipo.tipo.glosa;
        return tipoName.length>50 ? tipoName.substring(0,tipoName.length-18)+'...' : tipoName;
      }
    }
    return '';

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
