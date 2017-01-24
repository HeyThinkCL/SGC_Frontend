import { Component, OnInit, ViewChild, trigger, transition, style, animate } from '@angular/core';
import { Location } from '@angular/common';
import {ModalComponent} from 'ng2-bs3-modal/ng2-bs3-modal';

@Component({
  selector: 'app-calendario-academico',
  templateUrl: './calendario-academico.component.html',
  styleUrls: ['./calendario-academico.component.css'],
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
export class CalendarioAcademicoComponent implements OnInit {
  @ViewChild('modal') modal: ModalComponent;

  private configuracion = {
    'periodo_academico':{
      'inicio':'',
      'termino':'',
    },
    'vacaciones':[
      {
        'glosa':'',
        'inicio':'',
        'termino':'',
      },
      {
        'glosa':'',
        'inicio':'',
        'termino':'',
      }
    ],
    'fechas_especiales':[
      {
        'glosa':'',
        'fecha':'',
      }
    ]
  };

  constructor(
    private location: Location,
  ) { }

  ngOnInit() {
  }

  addVacaciones(){
    this.configuracion.vacaciones.push({
      'glosa':'',
      'inicio':'',
      'termino':'',
    });
  }

  deleteVacaciones(index: number){
    this.configuracion.vacaciones.splice(index,1);
  }

  addFechaEspecial(){
    this.configuracion.fechas_especiales.push({
      'glosa':'',
      'fecha':'',
    });
  }

  deleteFechaEspecial(index: number){
    this.configuracion.fechas_especiales.splice(index,1)
  }

  saveConfig(){
    console.log(this.configuracion);
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
