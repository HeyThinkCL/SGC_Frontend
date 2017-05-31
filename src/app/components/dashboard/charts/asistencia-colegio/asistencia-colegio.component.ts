import { Component, OnInit } from '@angular/core';

import {DashboardService} from '../../../../services/dashboard.service'

@Component({
  selector: 'app-asistencia-colegio',
  templateUrl: './asistencia-colegio.component.html',
  styleUrls: ['./asistencia-colegio.component.css']
})
export class AsistenciaColegioComponent implements OnInit {

  constructor(
    private dashboardService: DashboardService,
  ) { }

  ngOnInit() {
  }

  // lineChart
  public lineChartData:Array<any> = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'},
    {data: [18, 48, 77, 9, 100, 27, 40], label: 'Series C'}
  ];
  public lineChartLabels:Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartOptions:any = {
    responsive: true
  };
  public lineChartColors:Array<any> = [
    { // lighter primary blue
      backgroundColor: 'rgba(86,121,156,0.2)',
      borderColor: 'rgba(86,121,156,1)',
      pointBackgroundColor: 'rgba(86,121,156,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(86,121,156,0.8)'
    },
    { // primary blue
      backgroundColor: 'rgba(17,24,31,0.2)',
      borderColor: 'rgba(17,24,31,1)',
      pointBackgroundColor: 'rgba(17,24,31,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(17,24,31,1)'
    },
    { // lighter primary blue
      backgroundColor: 'rgba(65,91,118,0.2)',
      borderColor: 'rgba(65,91,118,1)',
      pointBackgroundColor: 'rgba(65,91,118,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(65,91,118,0.8)'
    }
  ];
  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';


  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }
}
