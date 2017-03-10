import { Component, OnInit, ViewChild, trigger, transition, style, animate } from '@angular/core';
import { Location } from '@angular/common';
import {ModalComponent} from 'ng2-bs3-modal/ng2-bs3-modal';

import { ConfigNotasService } from '../../../../services/sistema/configuraciones/config-notas.service';

@Component({
  selector: 'app-notas-ponderaciones',
  templateUrl: './notas-ponderaciones.component.html',
  styleUrls: ['./notas-ponderaciones.component.css']
})
export class NotasPonderacionesComponent implements OnInit {
  @ViewChild('modal') modal: ModalComponent;

  private configuracion = {
    'notas':{
      'decimales':null,
      'aproximacion':'',
    }
  };

  constructor(
    private location: Location,
    private configNotasService: ConfigNotasService,
  ) { }

  ngOnInit() {
    this.configNotasService.getConfigNotas(+localStorage.getItem('idConfig')).subscribe(res => {
      if(res){
        this.configNotasService.getConfigNotasById(+localStorage.getItem('idConfig')).subscribe(subRes => {
          this.configuracion = subRes;
        })
      } else {
        this.configNotasService.createConfigNotas(+localStorage.getItem('idConfig')).subscribe(subRes => {
          this.configNotasService.getConfigNotasById(+localStorage.getItem('idConfig')).subscribe(subSubRes => {
            this.configuracion = subSubRes;
          })
        })
      }
    })
  }

  saveConfig(){
    console.log(this.configuracion);
    this.configNotasService.updateConfigNotas(+localStorage.getItem('idConfig'),this.configuracion).subscribe(res => {});
    this.modalClose();
  }

  modalOpen(){
    this.modal.open('sm');
  }

  modalClose(){
    this.modal.close();
    this.goBack();
  }

  goBack(): void {
    this.location.back();
  }

}
