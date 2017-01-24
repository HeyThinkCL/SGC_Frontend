import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { Select2OptionData } from 'ng2-select2';
import  { Ng2DatetimePickerComponent } from 'ng2-datetime-picker';

import { EtniasService } from '../../../../services/sistema/etnias.service'
import { EstadosCivilesService } from '../../../../services/sistema/estados-civiles.service'

import * as globalVars from '../../../../globals';

@Component({
  selector: 'app-editar-funcionario',
  templateUrl: './editar-funcionario.component.html',
  styleUrls: ['./editar-funcionario.component.css']
})
export class EditarFuncionarioComponent implements OnInit {
  @ViewChild('modal')
  modal: ModalComponent;

  id: number;
  private sub: any;

  //etnias select2
  public selectEtniaData: Array<Select2OptionData> = [];
  public selectEtniaOptions: Select2Options;

  //nacionalidades select2
  public selectNacionalidadData: Array<Select2OptionData> = [];
  public selectNacionalidadOptions: Select2Options;

  //estados civiles select2
  public selectEstadoCivilData: Array<Select2OptionData> = [];
  public selectEstadoCivilOptions: Select2Options;

  public selectRolesDocentesData: Array<Select2OptionData> = [];
  public selectRolesNoDocentesData: Array<Select2OptionData> = [];
  public selectRolesOptions: Select2Options;

  private selectedFuncionario: any;
  private funcionario = {
    'usuario':{
      'nombre':'Donald',
      'apellido_paterno':'Trump',
      'apellido_materno':'Trump',
      'rut':null,
      'dv':null,
      'fono_casa': null,
      'fono_movil': null,
      'email': null,
      'sexo': null,
      'nacionalidad': 'Mexico',
      'estado_civil': null,
      'fecha_nacimiento': null,
    },
    'director':false,
    'profesor':true,
    'inspector':false,
    'psicopedagogo':false,
    'digitador':true,
    'jefeUTP':true,
    'secretario':true,
    'asistente':true,
  };

  private rolesDocentes = [];
  private rolesNoDocentes = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private etniasService: EtniasService,
    private estadosCivilesService: EstadosCivilesService,
  ) { }

  ngOnInit() {

    this.selectedFuncionario = this.funcionario;
    this.setRolesDocentes();
    this.setRolesNoDocentes();

    this.selectEtniaData = [{
      id:' ',
      text:'Ninguna'
    }];

    this.etniasService.getEtnias().subscribe(etnias => {
      this.selectEtniaData.pop();
      this.selectEtniaData = [{
        id:' ',
        text:'Ninguna'
      }];
      for (let etnia of etnias){
        this.selectEtniaData.push({
          id: etnia.etnia,
          text: etnia.etnia,
        })
      }
      this.selectEtniaData = JSON.parse(JSON.stringify(this.selectEtniaData));
    });

    this.selectEtniaOptions = {
      closeOnSelect: true,
      placeholder: 'Seleccionar Etnia',
    };

    this.selectEstadoCivilData = [{
      id:' ',
      text:'Ninguno'
    }];

    this.estadosCivilesService.getEstadosCiviles().subscribe(estados => {
      this.selectEstadoCivilData.pop();
      this.selectEstadoCivilData = [{
        id:' ',
        text:'Ninguno'
      }];
      for (let estado of estados){
        this.selectEstadoCivilData.push({
          id: estado.tipo,
          text: estado.tipo,
        })
      }
    });

    this.selectEstadoCivilOptions = {
      closeOnSelect: true,
      placeholder: 'Seleccionar Estado Civil',
    };

    for (let country of globalVars.countriesArray){
      this.selectNacionalidadData.push({
        id:country.nombre,
        text: country.nombre,
      })
    }

    this.selectNacionalidadOptions = {
      closeOnSelect: true,
      placeholder: 'Seleccionar Nacionalidad',
    };

    for (let rol of globalVars.rolesDocentes){
      this.selectRolesDocentesData.push({
        id:rol.rol,
        text: rol.rol,
      })
    }

    for (let rol of globalVars.rolesNoDocentes){
      this.selectRolesNoDocentesData.push({
        id:rol.rol,
        text: rol.rol,
      })
    }

    this.selectRolesOptions = {
      closeOnSelect: true,
      placeholder: 'Seleccionar Roles',
      multiple: true,
    };

  }

  setRolesDocentes(){
    let roles = ['profesor','jefeUTP','asistente'];
    for(let rol of roles){
      if(this.funcionario[rol.toString()]){
        this.rolesDocentes.push(rol);
      }
    }
  }

  setRolesNoDocentes(){
    let roles = ['director','inspector','psicopedagogo','secretario','digitador'];
    for(let rol of roles){
      if(this.funcionario[rol.toString()]){
        this.rolesNoDocentes.push(rol);
      }
    }
  }

  rolChange(array,e: any){
    array = e;
    console.log(array);
  }

  goBack(): void {
    this.location.back();
  }

  saveFuncionario(){
    for(let rol of this.rolesDocentes){
      this.funcionario[rol.toString()] = true;
    }

    for(let rol of this.rolesNoDocentes){
      this.funcionario[rol.toString()] = true;
    }
  }
}
