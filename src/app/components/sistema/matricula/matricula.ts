/**
 * Created by matias on 05-12-16.
 */
import { OnInit } from '@angular/core';

export class Apoderado {
  nombre: string;
  apellidos: string;
  sexo: string;
  fecha_nac: string;
  rut: number;
  dv: string;
  fono_casa: string;
  fono_movil: string;
  nacionalidad: string;
  estado_civil: string;
  ocupacion: string;
  titulo: string;
  mail: string;
  direccion: string;
  numeracion: number;
  comuna: string;
  selected: boolean;

  constructor(check: boolean) {
    this.selected = check;
  }
}

export class Matricula implements OnInit{
  id: number;
  nombre: string;
  apellidos: string;
  rut: number;
  dv: string;
  fecha_nac: string;
  fono_casa: string;
  fono_movil: string;
  sexo: string;
  nacionalidad: string;
  estado: string;
  direccion: string;
  numeracion: number;
  comuna: string;
  padre: Apoderado;
  madre: Apoderado;
  apoderado: Apoderado;

/*  padre: {
    nombre: string;
    apellidos: string;
    sexo: string;
    fecha_nac: string;
    rut: number;
    dv: string;
    fono_casa: string;
    fono_movil: string;
    nacionalidad: string;
    estado_civil: string;
    ocupacion: string;
    titulo: string;
    mail: string;
    direccion: string;
    numeracion: number;
    comuna: string;
    apoderado: boolean;
  };
  madre: {
    nombre: string;
    apellidos: string;
    sexo: string;
    fecha_nac: string;
    rut: number;
    dv: string;
    fono_casa: string;
    fono_movil: string;
    nacionalidad: string;
    estado_civil: string;
    ocupacion: string;
    titulo: string;
    mail: string;
    direccion: string;
    numeracion: number;
    comuna: string;
    apoderado: boolean;
  };*/

  constructor() { };

  ngOnInit() {
/*    this.padre = new Apoderado();
    this.madre = new Apoderado();
    this.apoderado = new Apoderado();*/
  }
}

