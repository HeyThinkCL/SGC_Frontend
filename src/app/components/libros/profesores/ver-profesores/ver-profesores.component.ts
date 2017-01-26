import { Component, OnInit } from '@angular/core';

import {ProfesoresService} from '../../../../services/libros/profesores.service';

@Component({
  selector: 'app-ver-profesores',
  templateUrl: './ver-profesores.component.html',
  styleUrls: ['./ver-profesores.component.css']
})
export class VerProfesoresComponent implements OnInit {

  filterData:string  = '';
  filterKeys = [
    {
      'mainKey':'usuario',
      'subKeys':['nombre','apellido_paterno','apellido_materno','rut']
    }
  ];

  private profesores = [];

  constructor(
    private profesoresService: ProfesoresService
  ) { }

  ngOnInit() {
    this.profesoresService.getProfesores().subscribe(res => {
      this.profesores = res
    })
  }

}
