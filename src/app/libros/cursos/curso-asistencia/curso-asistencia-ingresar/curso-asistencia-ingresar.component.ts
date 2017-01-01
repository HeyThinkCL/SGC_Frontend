import { Component, OnInit, ViewChild } from '@angular/core';

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
  getDay,} from 'date-fns';

/****/

@Component({
  selector: 'app-curso-asistencia-ingresar',
  templateUrl: './curso-asistencia-ingresar.component.html',
  styleUrls: ['./curso-asistencia-ingresar.component.css']
})
export class CursoAsistenciaIngresarComponent implements OnInit {
  @ViewChild('modal')
  modal: ModalComponent;

  viewDate: Date;
  weekStartsOn: number;
  view: any;

  inasistenciaMonth = [];
  month = [];
  selectedDay: any;

  private alumnos = [
    {'numero':1,'nombre':'Ivan','apellidos':'Arenas','nMat':10,'exc':''},
    {'numero':2,'nombre':'Valentin','apellidos':'Trujillo','nMat':15,'exc':''},
    {'numero':3,'nombre':'Don','apellidos':'Carter','nMat':230,'exc':''},
    {'numero':4,'nombre':'Richard','apellidos':'Gere','nMat':210,'exc':''},
    {'numero':5,'nombre':'Marcelo','apellidos':'Comparini','nMat':110,'exc':''},
    {'numero':6,'nombre':'Federico','apellidos':'Sanchez','nMat':73,'exc':''},
    {'numero':7,'nombre':'Juan','apellidos':'Perez','nMat':44,'exc':''},
    {'numero':8,'nombre':'Rod','apellidos':'Stewart','nMat':20,'exc':''},
  ];

  constructor() { }

  ngOnInit() {
    this.viewDate = new Date();
    this.weekStartsOn = 1;
    this.view = this.getMonthView({
      viewDate: this.viewDate,
      weekStartsOn: this.weekStartsOn
    });

    this.inasistenciaMonth.push(
      {'day': addDays(this.viewDate, 5), 'cant':3,
        'alumnos':[
          {'numero':1,'nombre':'Ivan','apellidos':'Arenas','nMat':10,'exc':''},
          {'numero':2,'nombre':'Valentin','apellidos':'Trujillo','nMat':15,'exc':''},
          {'numero':3,'nombre':'Don','apellidos':'Carter','nMat':230,'exc':''},
        ]
      },
      {'day': addDays(this.viewDate,2), 'cant':6,
        'alumnos':[
          {'numero':1,'nombre':'Ivan','apellidos':'Arenas','nMat':10,'exc':''},
          {'numero':2,'nombre':'Valentin','apellidos':'Trujillo','nMat':15,'exc':''},
          {'numero':3,'nombre':'Don','apellidos':'Carter','nMat':230,'exc':''},
          {'numero':4,'nombre':'Richard','apellidos':'Gere','nMat':210,'exc':''},
          {'numero':5,'nombre':'Marcelo','apellidos':'Comparini','nMat':110,'exc':''},
          {'numero':6,'nombre':'Federico','apellidos':'Sanchez','nMat':73,'exc':''},

        ]
      }
    );

    this.selectedDay = {'day': new Date() , 'alumnos':[]};
  }

  //modal
  modalOpen(day: Date): void {
    this.setSelectedDay(day);
    this.modal.open();
  }

  modalClose(): void {
    this.modal.close();
    this.selectedDay = {'day': new Date() ,'alumnos':[]};
  }

  setSelectedDay(day: Date): any{
    this.selectedDay = {
      'day': day,
      'alumnos': JSON.parse(JSON.stringify(this.alumnos)),
    };

    if(this.inasistenciaMonth.find(res => res.day.toDateString() == day.toDateString())){

      let inasistenciaListDay = this.inasistenciaMonth.find(res => res.day.toDateString() == day.toDateString()).alumnos;

      for(let alumno of this.selectedDay.alumnos){
        if( inasistenciaListDay.find(res => res.numero == alumno.numero)){
          alumno['asistencia'] = false;
        } else{
          alumno['asistencia'] = true;
        }
      }
    } else {
      for(let alumno of this.selectedDay.alumnos){
        alumno['asistencia'] = true;
      }
    }

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

  }

  decrement(): void {

    this.viewDate = subMonths(this.viewDate,1);
    this.view = this.getMonthView({
      viewDate: this.viewDate,
      weekStartsOn: this.weekStartsOn
    });
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

  getInasistenciaByDia(day: Date): number{
    let cant: number;
    if( this.inasistenciaMonth.find(res => res.day.toDateString() == day.toDateString()) ){
      cant = this.inasistenciaMonth.find(res => res.day.toDateString() == day.toDateString()).alumnos.length;
    } else {
      cant = 0;
    }
    return cant;
  }

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
    isWeekend: WEEKEND_DAY_NUMBERS.indexOf(getDay(date)) > -1
  };
};
