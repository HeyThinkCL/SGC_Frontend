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
      'id':1,
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
    'digitador':false,
    'jefeUTP':true,
    'secretario':false,
    'asistente':true,
  };

  private rolesDocentes = [];
  private rolesNoDocentes = [];

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private estadosCivilesService: EstadosCivilesService,
  ) { }

  ngOnInit() {

    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
    });

    this.selectedFuncionario = JSON.parse(JSON.stringify(this.funcionario));

    this.estadosCivilesService.getEstadosCiviles().subscribe(estados => {
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
      allowClear: true,
    };

    this.setRolesDocentes();
    this.setRolesNoDocentes();

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

  rolDocenteChange(e: any){
    this.rolesDocentes = e;
    return;
  }

  rolNoDocenteChange(e: any){
    this.rolesNoDocentes = e;
    return;
  }

  goBack(): void {
    this.location.back();
  }

  saveFuncionario(){
    for(let key in this.funcionario){
      if(typeof this.funcionario[key.toString()] === "boolean" || this.funcionario[key.toString()] instanceof Boolean){
        console.log(key,this.funcionario[key.toString()]);
        this.funcionario[key.toString()] = false;
      }
    }
    console.log(this.rolesDocentes);
    for(let rol of this.rolesDocentes){
      this.funcionario[rol.toString()] = true;
    }
    console.log(this.rolesNoDocentes);
    for(let rol of this.rolesNoDocentes){
      this.funcionario[rol.toString()] = true;
    }

    console.log(this.funcionario);
  }
}
