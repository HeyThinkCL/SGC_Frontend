import { Component, OnInit, ViewChild, trigger, transition, style, animate } from '@angular/core';
import { Location } from '@angular/common';
import {ModalComponent} from 'ng2-bs3-modal/ng2-bs3-modal';
import { Select2OptionData } from 'ng2-select2';

import { ConfiguracionService } from '../../../../services/sistema/configuracion.service';
import { PlanDeEstudiosService } from '../../../../services/sistema/configuraciones/plan-de-estudios.service';
import { AsignaturasEspecialesService } from '../../../../services/sistema/configuraciones/asignaturas-especiales.service';
import {ColegiosService} from '../../../../services/sistema/colegios.service';

@Component({
  selector: 'app-asignaturas-especiales',
  templateUrl: './asignaturas-especiales.component.html',
  styleUrls: ['./asignaturas-especiales.component.css']
})
export class AsignaturasEspecialesComponent implements OnInit {
  @ViewChild('modal') modal: ModalComponent;

  planesDeEstudio = [];
  //planes de estudio select2
  public selectPlanesData: Array<Select2OptionData> = [];
  public selectPlanesOptions: Select2Options;
  public selectPlanesRender: boolean = false;

  allAsignaturas = [];

  private configId;
  private configuracion = {
    'asignatura':{
      'nombre':null,
    },
    'planes_estudio':[]
  };

  constructor(
    private location: Location,
    private asignaturasEspecialesService: AsignaturasEspecialesService,
    private planDeEStudiosService: PlanDeEstudiosService,
    private configuracionService: ConfiguracionService,
    private colegiosService: ColegiosService,
  ) { }

  ngOnInit() {
    this.configuracionService.getConfiguraciones().subscribe(res => {
      this.configId = res.find(c => c.glosa == 'Asignaturas Especiales' && c.colegio_id == +JSON.parse(localStorage.getItem('currentUser')).colegioId).id;
      let _planConfigId = res.find(c => c.glosa == 'Planes de Estudio y Tipos de Enseñanza' && c.colegio_id == +JSON.parse(localStorage.getItem('currentUser')).colegioId).id;
      this.planDeEStudiosService.getConfigPlanesDeEstudio(_planConfigId).subscribe(res => {
        console.log(res);
        this.planesDeEstudio = res.planes;

        this.selectPlanesRender = false;
        this.selectPlanesData.push({
          id: ' ',
          text: 'Seleccionar Plan de Estudios'
        });

        for (let plan of this.planesDeEstudio) {
          if (this.selectPlanesData.length == 0) {
          }
          this.selectPlanesData.push({
            id: plan.id,
            text: plan.decreto.length > 70 ? plan.decreto.substring(0, plan.decreto.length - 18) + '...' : plan.decreto,
          })
        }
        this.selectPlanesRender = true;
        console.log(this.planesDeEstudio);
      });
    });

    this.selectPlanesOptions = {
      closeOnSelect: true,
      placeholder: 'Seleccionar Plan de Estudios',
      multiple: true,
    };

    this.colegiosService.getAsignaturasByColegioId().subscribe(asigns => {
      for(let asignatura of asigns){
        if(asignatura.especial && !asignatura.obligatoria){
          this.allAsignaturas.push(asignatura);
        }
      }
    });
  }

  saveAsignatura(){

  }

  deleteAsignatura(){

  }

  planChanged(value: any){
    this.configuracion.planes_estudio = value;
  }

  modalOpen(){
    this.modal.open('sm');
  }

  modalClose(){
    this.modal.close();
    this.goBack();
  }

  goBack(): void {
    this.location.back();
  }
}