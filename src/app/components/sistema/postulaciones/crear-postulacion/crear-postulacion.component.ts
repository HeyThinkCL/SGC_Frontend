import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { Select2OptionData } from 'ng2-select2';

import * as globalVars from '../../../../globals';

@Component({
  selector: 'app-crear-postulacion',
  templateUrl: 'crear-postulacion.component.html',
  styleUrls: ['crear-postulacion.component.css']
})
export class CrearPostulacionComponent implements OnInit {
  @ViewChild('modal')
  modal: ModalComponent;

  //etnias select2
  public selectEtniaData: Array<Select2OptionData>;
  public selectEtniaOptions: Select2Options;

  //nacionalidades
  filterNacionalidadKeys = ['nombre'];
  countries = [{'nombre':'','flag':''}];

  private postulante: Postulante;
  private padre: Apoderado;
  private madre: Apoderado;
  private apoderado: Apoderado;

  constructor(
    private location: Location,
  ) { }

  ngOnInit() {
    this.postulante = new Postulante(true);
    this.padre = new Apoderado(true,false,false);
    this.madre = new Apoderado(false,true,false);
    this.apoderado = new Apoderado(false,false,true);

    this.selectEtniaData = [
      {
        id: ' ',
        text: 'Ninguna'
      },
      {
        id: 'opt2',
        text: 'Options 2'
      },
    ];

    this.selectEtniaOptions = {
      closeOnSelect: true,
      placeholder: 'Seleccionar Etnia',
    };
    this.countries = globalVars.countriesArray;
/*    for(let country of globalVars.countriesArray){
      if(country.translations.es){
        this.countries.push({'nombre':country.translations.es,
          'flag':'flag-icon-'+country.alpha2Code.toLowerCase()})
      } else {
        this.countries.push({'nombre':country.name,
          'flag':'flag-icon-'+country.alpha2Code.toLowerCase()})
      }
    }*/
    // console.log(this.countries);
  }
  goBack(): void {
    this.location.back();
  }

  onChange(changed: any, other: any) {
    if ( !changed.apoderado && !other.apoderado ) {
      this.apoderado = new Apoderado(false,false,true);
    }

    else if ( changed.apoderado && other.apoderado ) {
      other.apoderado = false;
      this.apoderado = JSON.parse(JSON.stringify(changed));
    }
    else if ( changed.apoderado && !other.apoderado ) {
      this.apoderado = JSON.parse(JSON.stringify(changed));
    }
    else if ( !changed.apoderado && other.apoderado ){
      this.apoderado = JSON.parse(JSON.stringify(other));
    }
  }

  selectEtniaChanged(e: any){
    this.postulante.etnia = e.value;
  }

  modalOpen(): void {
    this.modal.open();
  }

  modalClose(): void {
    this.modal.close();
    this.goBack();
  }

}

export class Usuario{
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  rut: number;
  dv: string;
  fono_casa: string;
  fono_movil: string;
  email: string;
  sexo: string;
  nacionalidad: string;
  estado_civil: string;
  fecha_nacimiento: string;

  constructor(){}
}

export class Postulante{
  aceptado: boolean;
  desiste: boolean;
  lista_espera: boolean;
  rechazado: boolean;
  promovido: boolean;
  matriculado: boolean;
  prioritario: boolean;
  vulnerable: boolean;
  preferente: boolean;
  pie: boolean;
  intercambio: boolean;
  excedente: boolean;
  lista: number;
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  rut: number;
  dv: string;
  pasaporte: string;
  etnia: string;
  fono_casa: string;
  fono_movil: string;
  email: string;
  sexo: string;
  nacionalidad: string;
  fecha_nacimiento: string;

  constructor(public postulante: boolean){}
}

export class Apoderado{
  ocupacion: string;
  titulo: string;
  usuario: Usuario;

  constructor(public padre: boolean, public madre: boolean, public apoderado: boolean){
    this.usuario = new Usuario;
  }
}
