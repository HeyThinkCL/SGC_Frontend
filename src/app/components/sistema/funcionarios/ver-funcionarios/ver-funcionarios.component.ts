import {Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

import {FuncionariosService} from '../../../../services/sistema/funcionarios.service';

@Component({
  selector: 'app-ver-funcionarios',
  templateUrl: './ver-funcionarios.component.html',
  styleUrls: ['./ver-funcionarios.component.css']
})
export class VerFuncionariosComponent implements OnInit {
  @ViewChild('modal')
  modal: ModalComponent;

  private funcionarios = [
    {
      'id':1,
      'profesor':true,
      'jefeUTO':true,
      'director':true,
      'asistente':false,
      'inspector':false,
      'usuario':{
        'nombre':'Profesor',
        'apellido_paterno':'Jirafales',
        'apellido_materno':'Longaniza',
        'rut':7544263,
        'dv':'k',
      }
    },
  ];
  selectedFuncionario_id: number;
  filterData:string  = '';
  filterKeys = [
    {
      'mainKey':'usuario',
      'subKeys':['nombre','apellido_paterno','apellido_materno','rut']
    }
  ];

  constructor(
    private funcionariosService: FuncionariosService,
  ) { }

  ngOnInit() {
    this.funcionariosService.getFuncionarios().subscribe(res => {
      this.funcionarios = res;
      console.log(res);
    })
  }

  indexOfObj(id: number): number {
    for (let i = 0; i < this.funcionarios.length; i++) {
      if ( this.funcionarios[i].id == id) {
        return i;
      }
    }
    return -1;
  }

  modalOpen(id: number): void {
    this.modal.open();
    this.selectedFuncionario_id = id;
  }

  modalClose(id: number): void {
    this.deleteFuncionario(id);
  }

  modalDismiss(): void {
    this.modal.dismiss();
  }

  deleteFuncionario(id: number){
    let index = this.indexOfObj(id);
    this.funcionarios.splice(index,1);
    this.modal.close();
    this.selectedFuncionario_id = null;
  }

}
