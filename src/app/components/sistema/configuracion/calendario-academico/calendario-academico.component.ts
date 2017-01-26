import { Component, OnInit, ViewChild, trigger, transition, style, animate } from '@angular/core';
import { Location } from '@angular/common';
import {ModalComponent} from 'ng2-bs3-modal/ng2-bs3-modal';

import {CalendarioService} from '../../../../services/sistema/calendario.service';

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
      'glosa':'',
      'fecha_inicio':null,
      'fecha_termino':null,
    },
    'vacaciones':[
      {
        'glosa':'',
        'fecha_inicio':null,
        'fecha_termino':null,
      }
    ],
    'fechas_especiales':[
      {
        'glosa':'',
        'fecha_inicio':null,
        'fecha_termino':null,
      }
    ]
  };

  constructor(
    private location: Location,
    private calendarioService: CalendarioService,
  ) { }

  ngOnInit() {
    this.calendarioService.getConfigCalendarioAcademico(+localStorage.getItem('idConfig')).subscribe(res => {
      if(res){
        this.calendarioService.getConfigCalendarioAcademicoById(+localStorage.getItem('idConfig')).subscribe(subRes => {
          console.log('llegó',subRes);
          this.configuracion = subRes;
        })
      } else {
        this.calendarioService.createConfigCalendarioAcademico(+localStorage.getItem('idConfig')).subscribe(subRes => {
          console.log('nollegó',subRes);
          this.calendarioService.getConfigCalendarioAcademicoById(+localStorage.getItem('idConfig')).subscribe(subRes => {
            console.log('llegó',subRes);
            this.configuracion = subRes;
          })
        })
      }
    })
  }

  addVacaciones(){
/*    this.configuracion.vacaciones.push({
      'glosa':'',
      'inicio':null,
      'termino':null,
    });*/
    this.calendarioService.createEventCalendarioAcademico(true,+localStorage.getItem('idConfig')).subscribe(res => {
      this.calendarioService.getConfigCalendarioAcademicoById(+localStorage.getItem('idConfig')).subscribe(subRes => {
        console.log('llegó',subRes);
        this.configuracion = subRes;
      })
    })
  }

  deleteVacaciones(id: number){
    // this.configuracion.vacaciones.splice(index,1);
    this.calendarioService.deleteEventCalendarioAcademico(id).subscribe(() => {
      this.calendarioService.getConfigCalendarioAcademicoById(+localStorage.getItem('idConfig')).subscribe(subRes => {
        console.log('llegó',subRes);
        this.configuracion = subRes;
      })
    })
  }

  addFechaEspecial(){
/*    this.configuracion.fechas_especiales.push({
      'glosa':'',
      'fecha':'',
    });*/
  }

  deleteFechaEspecial(id: number){
    /*this.configuracion.fechas_especiales.splice(index,1)*/

  }

  saveConfig(){
    console.log(this.configuracion);
    this.calendarioService.updateConfigCalendarioAcademico(+localStorage.getItem('idConfig'),this.configuracion).subscribe(res => {});
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
