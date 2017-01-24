import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location }       from '@angular/common';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { Select2OptionData } from 'ng2-select2';

import * as globalVars from '../../../../globals';

@Component({
  selector: 'app-funcionario-detail',
  templateUrl: './funcionario-detail.component.html',
  styleUrls: ['./funcionario-detail.component.css']
})
export class FuncionarioDetailComponent implements OnInit {

  id: number;
  private sub: any;

  private funcionario = {
    'id': 1,
    'profesor': true,
    'jefeUTO': true,
    'director': true,
    'asistente': false,
    'inspector': false,
    'usuario': {
      'nombre': 'Profesor',
      'apellido_paterno': 'Jirafales',
      'apellido_materno': 'Longaniza',
      'rut': 7544263,
      'dv': 'k',
      'fono_casa': null,
      'fono_movil': null,
      'email': null,
      'sexo': null,
      'nacionalidad': null,
      'estado_civil': null,
      'fecha_nacimiento': null,
    }
  };

  private rolesDocentes = [];
  private rolesNoDocentes = [];

  public selectRolesDocentesData: Array<Select2OptionData> = [];
  public selectRolesNoDocentesData: Array<Select2OptionData> = [];
  public selectRolesOptions: Select2Options;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
  ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
    });

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
    let roles = ['director','inspector'];
    for(let rol of roles){
      if(this.funcionario[rol.toString()]){
        this.rolesNoDocentes.push(rol);
      }
    }
  }

  goBack(): void {
    this.location.back();
  }

  goToEdit(){
    this.router.navigate(['./editar',this.id],{relativeTo: this.route.parent});
  }


}
