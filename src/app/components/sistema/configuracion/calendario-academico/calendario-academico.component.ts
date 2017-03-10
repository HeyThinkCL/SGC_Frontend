import { Component, OnInit, ViewChild, trigger, transition, style, animate } from '@angular/core';
import { Location } from '@angular/common';
import {ModalComponent} from 'ng2-bs3-modal/ng2-bs3-modal';

/** date-fns**/
import {
  format,
  addDays,
  isSameDay,
  isAfter,
  isBefore,} from 'date-fns';

/****/

import {CalendarioService} from '../../../../services/sistema/configuraciones/calendario.service';

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
          this.configuracion = subRes;
          this.formatDates(this.configuracion);
        })
      } else {
        this.calendarioService.createConfigCalendarioAcademico(+localStorage.getItem('idConfig')).subscribe(subRes => {
          this.calendarioService.getConfigCalendarioAcademicoById(+localStorage.getItem('idConfig')).subscribe(subSubRes => {
            this.configuracion = subSubRes;
            this.formatDates(this.configuracion);
          })
        })
      }
    })
  }

  addDays(day: Date,amount: number){
    return format(addDays(day,amount),"DD-MM-YYYY");
  }

  formatDates(config: any){
    for(let key in config.periodo_academico){
      if(key.toString().includes('fecha') && !(typeof config.periodo_academico[key.toString()] === 'boolean') ){
        if(config.periodo_academico[key.toString()]){
          let _b1 = config.periodo_academico[key.toString()].toString().split('T');
          let _b2 = _b1[0].split('-').reverse();
          config.periodo_academico[key.toString()] = _b2.join('-');
          console.log(key,config.periodo_academico[key.toString()]);
        }
      }
    }
    for (let periodo of config.vacaciones){
      for(let key in periodo){
        if(key.toString().includes('fecha') && !(typeof config.periodo_academico[key.toString()] === 'boolean') ){
          if(periodo[key.toString()]){
            let _b1 = periodo[key.toString()].toString().split('T');
            let _b2 = _b1[0].split('-').reverse();
            periodo[key.toString()] = _b2.join('-');
            console.log(key,periodo[key.toString()]);
          }
        }
      }
    }
    for (let periodo of config.fechas_especiales){
      for(let key in periodo){
        if(key.toString().includes('fecha') && !(typeof config.periodo_academico[key.toString()] === 'boolean') ){
          if(periodo[key.toString()]){
            let _b1 = periodo[key.toString()].toString().split('T');
            let _b2 = _b1[0].split('-').reverse();
            periodo[key.toString()] = _b2.join('-');
            console.log(key,periodo[key.toString()]);
          }
        }
      }
    }
  }

  addVacaciones(){
    this.calendarioService.createEventCalendarioAcademico(true,+localStorage.getItem('idConfig')).subscribe(res => {
      this.calendarioService.getConfigCalendarioAcademicoById(+localStorage.getItem('idConfig')).subscribe(subRes => {
        this.configuracion = subRes;
        this.formatDates(this.configuracion);
      })
    })
  }

  addFechaEspecial(){
    this.calendarioService.createEventCalendarioAcademico(false,+localStorage.getItem('idConfig')).subscribe(res => {
      this.calendarioService.getConfigCalendarioAcademicoById(+localStorage.getItem('idConfig')).subscribe(subRes => {
        this.configuracion = subRes;
        this.formatDates(this.configuracion);
      })
    })
  }

  deleteFecha(id: number){
    this.calendarioService.deleteEventCalendarioAcademico(id).subscribe(() => {
      this.calendarioService.getConfigCalendarioAcademicoById(+localStorage.getItem('idConfig')).subscribe(subRes => {
        this.configuracion = subRes;
        this.formatDates(this.configuracion);
      })
    })
  }

  saveConfig(){
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
