import { Component, OnInit } from '@angular/core';
import {ColegiosService} from "../../../../services/sistema/colegios.service";

@Component({
  selector: 'app-ver-asignaturas',
  templateUrl: './ver-asignaturas.component.html',
  styleUrls: ['./ver-asignaturas.component.css']
})
export class VerAsignaturasComponent implements OnInit {

  filterData:string  = '';
  filterKeys = [
    {
      'mainKey':['nombre'],
    }
  ];

  private asignaturas = [];

  constructor(
    private colegioService: ColegiosService,
  ) { }

  ngOnInit() {
    this.colegioService.getAsignaturasByColegioId().subscribe(asigns => {
      this.asignaturas = asigns;
    })
  }

}
