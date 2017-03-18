import { Component, OnInit, ViewChild, trigger, transition, style, animate } from '@angular/core';
import { Location } from '@angular/common';
import { Select2OptionData } from 'ng2-select2';
import {ModalComponent} from 'ng2-bs3-modal/ng2-bs3-modal';

import { PlanDeEstudiosService } from '../../../../services/sistema/configuraciones/plan-de-estudios.service';

@Component({
  selector: 'app-planes-ensenanza',
  templateUrl: './planes-ensenanza.component.html',
  styleUrls: ['./planes-ensenanza.component.css'],
  animations: [
    trigger(
      'fade', [
        transition(':enter', [
          style({transform: 'translateX(100%)', opacity: 0}),
          animate('90ms', style({transform: 'translateX(0)', opacity: 1}))
        ]),
        transition(':leave', [
          style({transform: 'translateX(0)', 'opacity': 1}),
          animate('90ms', style({transform: 'translateX(100%)', opacity: 0}))
        ])
      ]
    )
  ],
})

export class PlanesEnsenanzaComponent implements OnInit {
  @ViewChild('modal') modal: ModalComponent;

  //planes de estudio select2
  public selectPlanesData: Array<Select2OptionData> = [];
  public selectPlanesOptions: Select2Options;

  //tipos de enseñanza select2
  public selectTiposOptions: Select2Options;

  selectedPlanes = [];
  selectedTipos = [];

  planesDeEstudio: any;
  configuracion: any = {
    planes: [],
  };

  constructor(
    private location: Location,
    private planDeEstudiosService: PlanDeEstudiosService,
  ) { }

  ngOnInit() {
    this.planDeEstudiosService.getPlanesDeEstudio().subscribe(planes => {
      this.planesDeEstudio = planes.planes;
      for(let plan of planes.planes){
        this.selectPlanesData.push({
          id:plan.id,
          text: plan.decreto.length>70 ? plan.decreto.substring(0,plan.decreto.length-18)+'...' : plan.decreto,
        })
      }
    });

    this.selectPlanesOptions = {
      closeOnSelect: true,
      placeholder: 'Seleccionar Plan de Estudios',
      multiple: true,
    };

    this.selectTiposOptions = {
      closeOnSelect: true,
      placeholder: 'Seleccionar Tipo de Enseñanza',
      multiple: true,
    };
  }

  planChanged(value: any){
    this.selectedPlanes = value;

    if(value && this.selectedPlanes.length>0){
      for(let plan of this.selectedPlanes){
        let tiposByPlan = this.selectedTipos.find(tipo => tipo.plan_id == +plan);
        if(!tiposByPlan){

          let planData = this.planesDeEstudio.find(data => data.id == +plan);
          if(planData){
            let _planData = JSON.parse(JSON.stringify(planData));
            _planData['tipos']=[];
            this.configuracion.planes.push(_planData);

            let selectTiposData: Array<Select2OptionData> = [];

            for(let tipo of planData.tipos){
              selectTiposData.push({
                'id':tipo.id,
                'text':tipo.glosa.length>70 ? tipo.glosa.substring(0,tipo.glosa.length-18)+'...' : tipo.glosa,
              })
            }

            this.selectedTipos.push({
              'plan_id': +plan,
              'selectTiposData':selectTiposData,
              'tipos':[],
            });
          }
        }
      }
    }

    for(let idx in this.selectedTipos){
      let planOfTipos = this.selectedPlanes? this.selectedPlanes.find(plan => +plan == this.selectedTipos[idx].plan_id) : null;
      if(!planOfTipos){
        let configPlanId = this.selectedTipos[+idx].plan_id;
        let configIdx = this.configuracion.planes.findIndex(p => p.id == configPlanId);
        this.selectedTipos.splice(+idx,1);
        this.configuracion.planes.splice(configIdx,1);
      }
    }

  }

  getSelectTipoDataByPlanId(id: number){
    return this.selectedTipos.find(res => res.plan_id==id).selectTiposData;
  }

  tipoChanged(plan,value){
    let _tipos = this.selectedTipos.find(res => res.plan_id==plan.id);
    let selectedPlan = this.planesDeEstudio.find(p => p.id==plan.id);
    _tipos.tipos = value;
    if(value && _tipos.tipos.length>0){
      for(let tipo of _tipos.tipos){
        if(!plan.tipos.find(t => t.id==+tipo)){
          let tipoData = selectedPlan.tipos.find(t => t.id==+tipo);
          let _tipoData = JSON.parse(JSON.stringify(tipoData));
          _tipoData['cursos_nivel'] = null;
          plan.tipos.push(_tipoData);
        }
      }
    }

    for(let tipoIdx in plan.tipos){
      let tipoOfTipos = _tipos.tipos? _tipos.tipos.find(t => +t==+plan.tipos[+tipoIdx].id) : null;
      if(!tipoOfTipos){
        plan.tipos.splice(+tipoIdx,1);
      }
    }

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

  saveConfig(){
    console.log(this.configuracion);
    this.modalClose();
  }

}
