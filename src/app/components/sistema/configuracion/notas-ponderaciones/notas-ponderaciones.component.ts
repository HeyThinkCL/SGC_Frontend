import { Component, OnInit, ViewChild, trigger, transition, style, animate } from '@angular/core';
import { Location } from '@angular/common';
import { Select2OptionData } from 'ng2-select2';
import {ModalComponent} from 'ng2-bs3-modal/ng2-bs3-modal';

import { ConfigNotasService } from '../../../../services/sistema/configuraciones/config-notas.service';
import { ConfiguracionService } from '../../../../services/sistema/configuracion.service';

@Component({
  selector: 'app-notas-ponderaciones',
  templateUrl: './notas-ponderaciones.component.html',
  styleUrls: ['./notas-ponderaciones.component.css'],
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
export class NotasPonderacionesComponent implements OnInit {
  @ViewChild('modal') modal: ModalComponent;

  private configId;
  private configuracion = {
    'notas':{
      'decimales':null,
      'aprox':null,
    }
  };

  //planes de estudio select2
  public selectEscalasData: Array<Select2OptionData> = [];
  public selectEscalasOptions: Select2Options;

  selectedEscalas = [];

  constructor(
    private location: Location,
    private configNotasService: ConfigNotasService,
    private configuracionService: ConfiguracionService,
  ) { }

  ngOnInit() {
    this.configuracionService.getConfiguraciones().subscribe(res => {
      this.configId = res.find(c => c.glosa == 'Notas y Ponderaciones' && c.colegio_id == +JSON.parse(localStorage.getItem('currentUser')).colegioId).id;

      this.configNotasService.getConfigNotas(this.configId).subscribe(res => {
        if(res){
          this.configNotasService.getConfigNotasById(this.configId).subscribe(subRes => {
            this.configuracion = subRes;
            console.log(this.configuracion);
          })
        } else {
          this.configNotasService.createConfigNotas(this.configId).subscribe(subRes => {
            this.configNotasService.getConfigNotasById(this.configId).subscribe(subSubRes => {
              this.configuracion = subSubRes;
            })
          })
        }
      });
    });

    this.selectEscalasData.push({
      id:'1',
      text:'Escala Numérica 0 a 100',
    });

    this.selectEscalasData.push({
      id:'2',
      text:'Escala Oficial Educación Parvularia',
    });

    this.selectEscalasData.push({
      id:'3',
      text:'Escala Modificada Educación Parvularia',
    });

    this.selectEscalasData.push({
      id:'4',
      text:'Escala Especial',
    });


    this.selectEscalasOptions = {
      closeOnSelect: true,
      placeholder: 'Seleccionar Escalas de Evaluación',
      multiple: true,
    };
  }

  escalaChanged(value: any){
    this.selectedEscalas = value;
  }

  checkEscala(id){
    return !!this.selectedEscalas.find(e => e == id);
  }

  saveConfig(){
    console.log(this.configuracion);
    this.configNotasService.updateConfigNotas(this.configId,this.configuracion).subscribe(res => {});
    this.modalClose();
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
