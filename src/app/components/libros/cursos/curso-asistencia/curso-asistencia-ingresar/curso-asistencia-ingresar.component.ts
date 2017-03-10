import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
/** date-fns**/
import {
  differenceInDays,
  startOfWeek,
  addDays,
  subDays,
  addWeeks,
  subWeeks,
  addMonths,
  subMonths,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  isSameMonth,
  startOfDay,
  isSameDay,
  isAfter,
  isBefore,
  getDay,} from 'date-fns';

/****/
import { CursosService } from '../../../../../services/libros/cursos.service';
import {ConfiguracionService} from '../../../../../services/sistema/configuracion.service';
import {CalendarioService} from '../../../../../services/sistema/configuraciones/calendario.service';
import {AsistenciaService} from '../../../../../services/libros/asistencia.service';

@Component({
  selector: 'app-curso-asistencia-ingresar',
  templateUrl: 'curso-asistencia-ingresar.component.html',
  styleUrls: ['curso-asistencia-ingresar.component.css']
})
export class CursoAsistenciaIngresarComponent implements OnInit {
  @ViewChild('modal')
  modal: ModalComponent;

  id: number;
  private sub: any;

  viewDate: Date;
  weekStartsOn: number;
  view: any;

  inasistenciaMonth = [];
  month = [];
  selectedDay: any;

  private calendarConfig: any;

  private alumnos = [];

  constructor(
    private route: ActivatedRoute,
    private cursosService: CursosService,
    private configuracionService: ConfiguracionService,
    private calendarioService: CalendarioService,
    private asistenciaService: AsistenciaService,
  ) { }

  ngOnInit() {
    this.viewDate = new Date();

    this.sub = this.route.parent.parent.params.subscribe(params => {
      this.id = params['id'];

      this.cursosService.getCursoById(this.id).subscribe(curso => {
        this.alumnos = curso.alumnos;
      });

      this.asistenciaService.getInasistenciasByMonth(this.id,startOfMonth(this.viewDate)).subscribe(res => {
        for (let dia of res.mes){
          dia.dia = addDays(new Date(dia.dia),1);
        }
        this.inasistenciaMonth = res.mes;

        this.configuracionService.getConguraciones().subscribe(configs => {
          let config = configs.find(c => c.glosa == 'Calendario Académico');

          this.calendarioService.getConfigCalendarioAcademicoById(config.id).subscribe(subRes => {
            this.calendarConfig = subRes;
            this.view = this.getMonthView({
              viewDate: this.viewDate,
            });
          });
        });
      })
    });

    this.selectedDay = {'dia': new Date() , 'alumnos':[]};
  }

  //modal
  modalOpen(day: Date): void {
    this.setSelectedDay(day);
    this.modal.open('lg');
  }

  modalClose(): void {
    this.modal.close();
    this.selectedDay = {'dia': new Date() ,'alumnos':[]};
  }

  modalDismiss(): void {
    this.modal.dismiss();
  }

  setSelectedDay(selectedDay: Date): any{
    this.selectedDay = {
      'dia': selectedDay,
      'alumnos': [],
      'asistentes':null,
      'inasistentes':null,
      'loading':false,

    };

    let dayInfo = this.view.days.find(day => day.date.toDateString() == selectedDay.toDateString());

    this.selectedDay.alumnos = JSON.parse(JSON.stringify(dayInfo.alumnos));

    this.selectedDay.inasistentes = this.getInasistenciaByDia(selectedDay);
    this.selectedDay.asistentes = this.selectedDay.alumnos.length - this.selectedDay.inasistentes;

  }
  //change count with pipe that takes an array of this.selectedDay.alumnos
  getInasistenciaByDia(day: Date): number{
    let cant: number;
    let inasistenciaDay: any = this.inasistenciaMonth.find(res => res.dia.toDateString() == day.toDateString());
    if( inasistenciaDay ){
      cant = inasistenciaDay.alumnos.length;
    } else {
      cant = 0;
    }
    return cant;
  }

  //logic
  saveAsistencia(){
    this.selectedDay.loading = true;
    this.asistenciaService.updateInasistencia({'fecha_asistencia':this.selectedDay.dia,'alumno_id':this.selectedDay.alumnos},this.id).subscribe(res => {
      this.asistenciaService.getInasistenciasByMonth(this.id,startOfMonth(this.viewDate)).subscribe(res => {

        let changedDay = this.view.days.find(day => day.date.toDateString() == this.selectedDay.dia.toDateString());
        let listChangedDay = this.inasistenciaMonth.find(res => res.dia.toDateString() == this.selectedDay.dia.toDateString());

        let newDataDay = res.mes.find(monthDay => addDays(monthDay.dia,0).toDateString() == this.selectedDay.dia.toDateString());

        listChangedDay.alumnos = newDataDay.alumnos;
        changedDay.inasistenciaList = newDataDay.alumnos;

        for(let alumno of changedDay.alumnos){

          alumno['cambio']=false;

          if( changedDay.inasistenciaList.find(res => res.alumno.id == alumno.id)){
            alumno['asistencia'] = false;
          } else {
            alumno['asistencia'] = true;
          }
        }

        this.modalClose();
      });
    });


  }

  toggleValue(alumno: any) {
    if(alumno.asistencia){
      this.selectedDay.inasistentes += 1;
      this.selectedDay.asistentes -= 1;
    } else {
      this.selectedDay.inasistentes -= 1;
      this.selectedDay.asistentes += 1;
    }
    alumno.asistencia = !(alumno.asistencia);
    if(!(alumno.cambio)){
      alumno.cambio = !(alumno.cambio);
    }
  }

  toggleAll(){
    for(let alumno of this.selectedDay.alumnos){
      if(alumno.asistencia){
        this.toggleValue(alumno);
      }
    }
    this.selectedDay.inasistentes = this.selectedDay.alumnos.length;
    this.selectedDay.asistentes = 0;
  }

  unToggleAll(){
    for(let alumno of this.selectedDay.alumnos){
      if(!alumno.asistencia){
        this.toggleValue(alumno);
      }
    }
    this.selectedDay.asistentes = this.selectedDay.alumnos.length;
    this.selectedDay.inasistentes = 0;
  }

  //date data
  inPeriodoAcademico(day: Date){
    let start = this.calendarConfig.periodo_academico.fecha_inicio;
    let end = this.calendarConfig.periodo_academico.fecha_termino;
    return ((isAfter(day,start) && isBefore(day,end)) || isSameDay(day,start) || isSameDay(day,end))
  }

  inVacacion(day: Date){
    for(let periodo of this.calendarConfig.vacaciones){
      if((isAfter(day,periodo.fecha_inicio) && isBefore(day,periodo.fecha_termino)) || isSameDay(day,periodo.fecha_inicio) || isSameDay(day,periodo.fecha_termino)){
        return true;
      }
    }
    return false;
  }

  isEspecial(day: Date){
    for(let fecha of this.calendarConfig.fechas_especiales){
      if(isSameDay(day,fecha.fecha_inicio)){
        return true;
      }
    }
    return false;
  }

  isFeriado(day: Date){
    for(let feriado of this.calendarConfig.feriados){
      if(isSameDay(day,feriado.fecha_inicio)){
        return true;
      }
    }
    return false;
  }

  //calendar rendering
  getMonthView: Function = ({viewDate, weekStartsOn}:
    {viewDate: Date, weekStartsOn: number})
    : MonthView => {

    const start: Date = startOfWeek(startOfMonth(viewDate), {weekStartsOn});
    const end: Date = endOfWeek(endOfMonth(viewDate), {weekStartsOn});

    const days: MonthViewDay[] = [];
    for (let i: number = 0; i < differenceInDays(end, start) + 1; i++) {
      const date: Date = addDays(start, i);
      const day: MonthViewDay = getWeekDay({date});

      day.inMonth = isSameMonth(date, viewDate);

      day['inPeriodoAcademico'] = this.inPeriodoAcademico(date);
      day['inVacacion'] = this.inVacacion(date);
      day['isEspecial'] = this.isEspecial(date);
      day['isFeriado'] = this.isFeriado(date);

      let inasistenciaListDay = this.inasistenciaMonth.find(res => res.dia.toDateString() == date.toDateString());
      if(inasistenciaListDay){

        day.alumnos = JSON.parse(JSON.stringify(this.alumnos));
        day.inasistenciaList = inasistenciaListDay.alumnos;

        for(let alumno of day.alumnos){

          alumno['cambio']=false;

          if( day.inasistenciaList.find(res => res.alumno.id == alumno.id)){
            alumno['asistencia'] = false;
          } else {
            alumno['asistencia'] = true;
          }
        }
      }

      days.push(day);
    }

    const rows: number = Math.floor(days.length / 7);
    const rowOffsets: number[] = [];
    for (let i: number = 0; i < rows; i++) {
      rowOffsets.push(i * 7);
    }

    return {
      rowOffsets,
      days
    };

  };

  increment(): void {

    this.viewDate = addMonths(this.viewDate,1);
    this.view = this.getMonthView({
      viewDate: this.viewDate,
      weekStartsOn: this.weekStartsOn
    });
    this.asistenciaService.getInasistenciasByMonth(this.id,startOfMonth(this.viewDate)).subscribe(res => {
      for (let dia of res.mes){
        dia.dia = addDays(new Date(dia.dia),1);
      }
      this.inasistenciaMonth = res.mes;
    })
  }

  decrement(): void {

    this.viewDate = subMonths(this.viewDate,1);
    this.view = this.getMonthView({
      viewDate: this.viewDate,
      weekStartsOn: this.weekStartsOn
    });
    this.asistenciaService.getInasistenciasByMonth(this.id,startOfMonth(this.viewDate)).subscribe(res => {
      for (let dia of res.mes){
        dia.dia = addDays(new Date(dia.dia),1);
      }
      this.inasistenciaMonth = res.mes;
    })
  }

  today(): void {
    this.viewDate = new Date();
  }

  getDayName(dayNumber: number){
    let dayNames =[
      {'id':0,'name':'Dom'},
      {'id':1,'name':'Lun'},
      {'id':2,'name':'Mar'},
      {'id':3,'name':'Mie'},
      {'id':4,'name':'Jue'},
      {'id':5,'name':'Vie'},
      {'id':6,'name':'Sab'},
    ];

    return dayNames.find(day => day.id == dayNumber).name;
  };

  getMonthName(monthNumber: number){
    let monthNames =[
      {'id':0,'name':'Enero'},
      {'id':1,'name':'Febrero'},
      {'id':2,'name':'Marzo'},
      {'id':3,'name':'Abril'},
      {'id':4,'name':'Mayo'},
      {'id':5,'name':'Junio'},
      {'id':6,'name':'Julio'},
      {'id':7,'name':'Agosto'},
      {'id':8,'name':'Septiembre'},
      {'id':9,'name':'Octubre'},
      {'id':10,'name':'Noviembre'},
      {'id':11,'name':'Diciembre'},
    ];

    return monthNames.find(day => day.id == monthNumber).name;
  };

}

export interface MonthView {
  rowOffsets: number[];
  days: MonthViewDay[];
}

export interface MonthViewDay extends WeekDay {
  inMonth: boolean;
  backgroundColor?: string;
  cssClass?: string;
  badgeTotal: number;
  alumnos: any[];
  inasistenciaList: any[];
}

export interface WeekDay {
  date: Date;
  isPast: boolean;
  isToday: boolean;
  isFuture: boolean;
  isWeekend: boolean;
}

const WEEKEND_DAY_NUMBERS: number[] = [0, 6];

const getWeekDay: Function = ({date}: {date: Date}): WeekDay => {
  const today: Date = startOfDay(new Date());
  return {
    date,
    isPast: date < today,
    isToday: isSameDay(date, today),
    isFuture: date > today,
    isWeekend: WEEKEND_DAY_NUMBERS.indexOf(getDay(date)) > -1,
  };
};
