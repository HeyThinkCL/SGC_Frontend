import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { Select2OptionData } from 'ng2-select2';

import { ColegiosService } from '../../../../services/sistema/colegios.service';
import { DpaService } from '../../../../services/sistema/dpa.service';
import { PlanDeEstudiosService } from '../../../../services/sistema/configuraciones/plan-de-estudios.service';

@Component({
  selector: 'app-crear-colegio',
  templateUrl: 'crear-colegio.component.html',
  styleUrls: ['crear-colegio.component.css']
})
export class CrearColegioComponent implements OnInit {
  @ViewChild('modal')
  modal: ModalComponent;

  colegio: any;

  regiones = [];
  provincias = [];
  comunas = [];

  selectedRegion: any;
  selectedProvincia: any;
  selectedComuna: any;

  //planes de estudio select2
  public selectPlanesDeEstudiosData: Array<Select2OptionData> = [];
  public selectPlanesDeEstudiosOptions: Select2Options;

  private planesDeEstudios = [];

  constructor(
      private location: Location,
      private colegiosService: ColegiosService,
      private dpaService: DpaService,
      private planDeEstudiosService: PlanDeEstudiosService,
  ) { }

  ngOnInit() {
    this.colegio = {
      "id": 1,
      "nombre": null,
      "razon_social": null,
      "resolucion": null,
      "dependencia": null,
      "rut": null,
      "dv":null,
      "rbd": null,
      "area": null,
      "direccion": null,
      "numeracion": null,
      "comuna": null,
      "region": null,
      "provincia": null,
      "localidad": null,
      "telefono": null,
      "celular": null,
      "mail": null,
      "web": null,
      "fax": null,
      "director": null,
      "sostenedor": null,
      "depto_prov": null,
      'plan_estudios': [],
    };

    this.dpaService.getRegiones().subscribe(res => {
      this.regiones = res;
    });
    this.selectPlanesDeEstudiosData = [{
      id:' ',
      text:'Ninguno'
    }];

    this.planDeEstudiosService.getPlanesDeEstudio().subscribe(planes => {
      this.planesDeEstudios = planes;
      this.selectPlanesDeEstudiosData.pop();
      this.selectPlanesDeEstudiosData = [{
        id:' ',
        text:'Ninguno'
      }];
      for (let plan of planes){
        this.selectPlanesDeEstudiosData.push({
          id: plan.id,
          text: plan.decreto,
        })
      }
      this.selectPlanesDeEstudiosData = JSON.parse(JSON.stringify(this.selectPlanesDeEstudiosData));
    });

    this.selectPlanesDeEstudiosOptions = {
      closeOnSelect: true,
      placeholder: 'Seleccionar Plan de Estudios',
    };
  }

  setRegion(region: string){
    this.colegio.provincia = null;
    this.colegio.comuna = null;
    this.colegio.depto_prov = null;
    this.selectedRegion = this.regiones.find(reg => reg.nombre == region);
    this.dpaService.getProvinciasByRegionId(this.selectedRegion.codigo).subscribe(res => {
      this.provincias = res;
    });
  };

  setProvincia(provincia: string){
    this.colegio.comuna = null;
    this.colegio.depto_prov = null;
    this.selectedProvincia = this.provincias.find(prov => prov.nombre == provincia);
    this.dpaService.getComunasByProvinciaIdRegionId(this.selectedProvincia.codigo).subscribe(res => {
      this.comunas = res;
    });
  };

  setComuna(comuna: string){
    this.selectedComuna = this.comunas.find(com => com.nombre == comuna);
    this.dpaService.getDeptoProvincialbyComunaId(this.selectedComuna.codigo).subscribe(res => {
      this.colegio.depto_prov = res.depto_prov;
    });
  }

  planChanged(value: any){
    this.colegio.plan_estudios.id = value;
    let selectedPlan = this.planesDeEstudios.find(plan => plan.id == value);
    if(selectedPlan){
      this.colegio.plan_estudios.codigo = selectedPlan.codigo;
    }
  }

  goBack(): void {
    this.location.back();
  }

  modalOpen(): void {
    this.modal.open();
  }

  modalClose(): void {
    this.modal.close();
    this.goBack();
  }

  saveColegio(): void {
    this.colegiosService.createColegio(this.colegio).subscribe(res => {
      this.colegio = res;
      this.modalOpen();
    });
  }

}
