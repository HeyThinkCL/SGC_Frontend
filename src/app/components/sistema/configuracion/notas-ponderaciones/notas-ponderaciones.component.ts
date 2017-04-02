import { Component, OnInit, ViewChild, trigger, transition, style, animate } from '@angular/core';
import { Location } from '@angular/common';
import {ModalComponent} from 'ng2-bs3-modal/ng2-bs3-modal';

import { ConfigNotasService } from '../../../../services/sistema/configuraciones/config-notas.service';
import { ConfiguracionService } from '../../../../services/sistema/configuracion.service';

@Component({
  selector: 'app-notas-ponderaciones',
  templateUrl: './notas-ponderaciones.component.html',
  styleUrls: ['./notas-ponderaciones.component.css']
})
export class NotasPonderacionesComponent implements OnInit {
  @ViewChild('modal') modal: ModalComponent;

  private configId;
  private configuracion = {
    'notas':{
      'decimales':null,
      'aprox':null,
    }
  };

  constructor(
    private location: Location,
    private configNotasService: ConfigNotasService,
    private configuracionService: ConfiguracionService,
  ) { }

  ngOnInit() {
    this.configuracionService.getConfiguraciones().subscribe(res => {
      this.configId = res.find(c => c.glosa == 'Notas y Ponderaciones' && c.colegio_id == +JSON.parse(localStorage.getItem('currentUser')).colegioId).id;

      this.configNotasService.getConfigNotas(this.configId).subscribe(res => {
        if(res){
          this.configNotasService.getConfigNotasById(this.configId).subscribe(subRes => {
            this.configuracion = subRes;
            console.log(this.configuracion);
          })
        } else {
          this.configNotasService.createConfigNotas(this.configId).subscribe(subRes => {
            this.configNotasService.getConfigNotasById(this.configId).subscribe(subSubRes => {
              this.configuracion = subSubRes;
            })
          })
        }
      });
    });
  }

  saveConfig(){
    console.log(this.configuracion);
    this.configNotasService.updateConfigNotas(this.configId,this.configuracion).subscribe(res => {});
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
