import { Component, OnInit, ViewChild, trigger, transition, style, animate } from '@angular/core';
import { Location } from '@angular/common';
import { Select2OptionData } from 'ng2-select2';
import {ModalComponent} from 'ng2-bs3-modal/ng2-bs3-modal';

import { PlanDeEstudiosService } from '../../../../services/sistema/configuraciones/plan-de-estudios.service';
import { ConfiguracionService } from '../../../../services/sistema/configuracion.service';

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

  configId: number;
  view: boolean = false;
  lock:boolean = false;

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
    private configuracionService: ConfiguracionService,
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
      this.configuracionService.getConfiguraciones().subscribe(res => {
        this.configId = res.find(c => c.glosa == 'Planes de Estudio y Tipos de Enseñanza').id;

        this.planDeEstudiosService.getConfigPlanesDeEstudio(this.configId).subscribe(config => {
          if(config){

            this.configuracion = config;

            console.log('get',this.configuracion);

            if(config.planes.length>0){
              this.lock = true;
              for(let plan of config.planes){
                this.selectedPlanes.push(plan.id.toString());

                let tiposByPlan = this.selectedTipos.find(tipo => tipo.plan_id == plan.id);
                if(!tiposByPlan){

                  let planData = this.planesDeEstudio.find(data => data.id == plan.id);

                  if(planData){
                    //select2 Tipos de Enseñanza Data
                    let selectTiposData: Array<Select2OptionData> = [];
                    for(let tipo of planData.tipos){
                      selectTiposData.push({
                        'id':tipo.tipo.id,
                        'text':tipo.tipo.glosa.length>70 ? tipo.tipo.glosa.substring(0,tipo.tipo.glosa.length-18)+'...' : tipo.tipo.glosa,
                      })
                    }

                    //selectedTipos
                    let _tipos = [];
                    for(let tipo of plan.tipos){
                      if(!tipo.cursos_nivel){
                        tipo['cursos_nivel']=1;
                      }
                      _tipos.push(tipo.tipo.id.toString());
                    }

                    this.selectedTipos.push({
                      'plan_id': plan.id,
                      'selectTiposData':selectTiposData,
                      'tipos':_tipos,
                    });
                    console.log('init',this.selectedTipos);
                  }
                }
              }
            }
            this.view = true;

          } else {
            this.planDeEstudiosService.createConfigPlanesDeEstudio(this.configId).subscribe(configCreated => {
              this.configuracion = configCreated;
              console.log('create',this.configuracion);
              this.view=true;
            })
          }
        })
      })


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
                'id':tipo.tipo.id,
                'text':tipo.tipo.glosa.length>70 ? tipo.tipo.glosa.substring(0,tipo.tipo.glosa.length-18)+'...' : tipo.tipo.glosa,
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
        if(!plan.tipos.find(t => t.tipo.id==+tipo)){
          let tipoData = selectedPlan.tipos.find(t => t.tipo.id==+tipo);
          let _tipoData = JSON.parse(JSON.stringify(tipoData));
          _tipoData['cursos_nivel'] = null;
          plan.tipos.push(_tipoData);
        }
      }
    }

    for(let tipoIdx in plan.tipos){
      let tipoOfTipos = _tipos.tipos? _tipos.tipos.find(t => +t==+plan.tipos[+tipoIdx].tipo.id) : null;
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
    this.planDeEstudiosService.updateConfigPlanesDeEstudio(this.configId,this.configuracion).subscribe(configRes => {
      console.log(configRes);
      if(configRes){
        this.planDeEstudiosService.createCursosWithConfigPlanesDeEstudio(this.configId,this.configuracion,1).subscribe(res => {
          this.modalClose();
        })
      }
    });
  }

}
