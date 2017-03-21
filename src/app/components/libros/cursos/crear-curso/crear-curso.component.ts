import {Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common'
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { Select2OptionData } from 'ng2-select2';

import { CursosService } from '../../../../services/libros/cursos.service';
import { PlanDeEstudiosService } from '../../../../services/sistema/configuraciones/plan-de-estudios.service';

@Component({
  selector: 'app-crear-curso',
  templateUrl: 'crear-curso.component.html',
  styleUrls: ['crear-curso.component.css']
})
export class CrearCursoComponent implements OnInit {
  @ViewChild('modal')
  modal: ModalComponent;

  private default_date: Date;
  private curso: any ={
    'anio':null,
    'plan_id':null,
    'ensenanza_id':null,
    'grado_id':null,
  };

  planesDeEstudio = [];

  //planes de estudio select2
  public selectPlanesData: Array<Select2OptionData> = [];
  public selectPlanesOptions: Select2Options;

  //tipos de enseñanza select2
  public selectTiposData: Array<Select2OptionData> = [];
  public selectTiposOptions: Select2Options;

  //tipos de enseñanza select2
  public selectNivelesData: Array<Select2OptionData> = [];
  public selectNivelesOptions: Select2Options;

  selectedPlan: any;
  selectedTipo: any;

  modalMessage: string;
  modalErrorMessage: string;

  niveles = [
    {"id":"1ro básico"},
    {"id":"2do básico"},
    {"id":"3ro básico"},
    {"id":"4to básico"},
    {"id":"5to básico"},
    {"id":"6to básico"},
    {"id":"7mo básico"},
    {"id":"8vo básico"},
    {"id":"1ro medio"},
    {"id":"2do medio"},
    {"id":"3ro medio"},
    {"id":"4to medio"},
  ];

  constructor(
    private location: Location,
    private cursosService: CursosService,
    private planDeEStudiosService: PlanDeEstudiosService,
  ) {
  }

  ngOnInit() {


    this.planDeEStudiosService.getPlanesDeEstudio().subscribe(res => {
      this.planesDeEstudio = res.planes;

      for(let plan of this.planesDeEstudio){
        this.selectPlanesData.push({
          id:plan.id,
          text: plan.decreto.length>70 ? plan.decreto.substring(0,plan.decreto.length-18)+'...' : plan.decreto,
        })
      }
    });

    this.selectPlanesOptions = {
      closeOnSelect: true,
      placeholder: 'Seleccionar Plan de Estudios',
    };

    this.selectTiposOptions = {
      closeOnSelect: true,
      placeholder: 'Seleccionar Tipo de Enseñanza',
    };

    this.selectNivelesOptions = {
      closeOnSelect: true,
      placeholder: 'Seleccionar Nivel',
    };

    this.default_date = new Date();
    if (this.default_date.getMonth() > 4) {
      this.default_date.setFullYear(this.default_date.getFullYear() + 1);
    }
    this.curso.anio = this.default_date.getFullYear().toString();
    this.modalErrorMessage ='';
  }

  planChanged(e: any){
    if(e){
      this.curso.plan_id = +e;
      this.selectedPlan = this.planesDeEstudio.find(plan => plan.id==+e);
      this.selectedTipo = null;

      this.selectNivelesData = [];
      this.selectTiposData = [];


      for(let tipo of this.selectedPlan.tipos){
        this.selectTiposData.push({
          id:tipo.tipo.id,
          text:tipo.tipo.glosa
        })
      }

    } else {
      this.curso.plan_id = e;
      this.selectTiposData = [];
      this.selectNivelesData = [];

      this.selectedTipo = null;
      this.selectedPlan = null;
    }

  }

  tipoChanged(e: any){
    if(e){
      this.curso.ensenanza_id = +e;
      this.selectedTipo = this.selectedPlan.tipos.find(tipo => tipo.tipo.id == +e);

      this.selectNivelesData = [];


      for(let nivel of this.selectedTipo.grados){
        this.selectNivelesData.push({
          id:nivel.id,
          text:nivel.glosa,
        })
      }
    } else {
      this.curso.ensenanza_id = e;
      this.selectNivelesData = [];

      this.selectedTipo = null;
    }

  }

  nivelChanged(e: any){
    this.curso.grado_id = e;
  }

  goBack(): void {
    this.location.back();
  }

  saveCurso() {
    console.log(this.curso);
    this.cursosService.createCurso(this.curso,1).subscribe((res) => {
      this.modalMessage = 'Curso creado con éxito.';
      this.modalOpen();
    });
  }

  modalOpen(): void {
    this.modal.open();
  }

  modalClose(): void {
    this.modal.close();
    this.modalErrorMessage = '';
  }

}
