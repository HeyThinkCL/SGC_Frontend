import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

@Component({
  selector: 'app-crear-postulacion',
  templateUrl: 'crear-postulacion.component.html',
  styleUrls: ['crear-postulacion.component.css']
})
export class CrearPostulacionComponent implements OnInit {
  @ViewChild('modal')
  modal: ModalComponent;

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
      this.apoderado.apoderado = false;
    }
    else if ( changed.apoderado && !other.apoderado ) {
      this.apoderado = JSON.parse(JSON.stringify(changed));
      this.apoderado.apoderado = false;
    }
    else if ( !changed.apoderado && other.apoderado ){
      this.apoderado = JSON.parse(JSON.stringify(other));
      this.apoderado.apoderado = false;
    }
    console.log(this.apoderado);
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
