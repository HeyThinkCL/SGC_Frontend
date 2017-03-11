import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

import { CursosService } from '../../../../../services/libros/cursos.service';
import {ConfiguracionService} from '../../../../../services/sistema/configuracion.service';
import { ConfigNotasService } from '../../../../../services/sistema/configuraciones/config-notas.service';

@Component({
  selector: 'app-curso-notas-ver',
  templateUrl: 'curso-notas-ver.component.html',
  styleUrls: ['curso-notas-ver.component.css']
})
export class CursoNotasVerComponent implements OnInit {
  @ViewChild('modalInfo') modalInfo: ModalComponent;

  asignaturas = [];

  infoNota = {
    'contenido':'',
    'fecha':'',
    'coeficiente':null,
  };

  alumnos = [];

  selectedAsignatura: any;
  selectedAsignaturaAlumnos = [];

  private notasCongif: any;
  decimals: string;

  id: number;
  private sub: any;

  constructor(
    private cursosService: CursosService,
    private route: ActivatedRoute,
    private configuracionService: ConfiguracionService,
    private configNotasService: ConfigNotasService,
  ) { }

  ngOnInit() {

    this.sub = this.route.parent.parent.params.subscribe(params => {
      this.id = params['id'];
    });

    this.route.parent.parent.params
      .switchMap((params: Params) => this.cursosService.getAsignaturasByCursoId(params['id']))
      .subscribe((res) => {
        this.asignaturas = res.asignaturas;
        this.setAsignatura(this.asignaturas[0].asignatura.datos.id);

        /*this.configuracionService.getConguraciones().subscribe(configs => {
          let config = configs.find(c => c.glosa == 'Calendario Académico');

          this.configNotasService.getConfigNotasById(config.id).subscribe(subRes => {
            this.notasCongif = subRes;
          });
        });*/
        this.notasCongif = {
          'notas': {
            'decimales':1,
            'aprox':1,
          }
        };

        this.decimals = '1.1-'+this.notasCongif.notas.decimales.toString();
      });

    this.selectedAsignatura = {'datos':{
      'id':1,
      'nombre': 'Lenguaje y Comunicación',
      'ponderacion':true,
    },'cantidad':0,'info_notas':[]}

  }

  //template rendering
  createRange(n: number){
    let items: number[] = [];
    for(let i = 1; i <= n; i++){
      items.push(i);
    }
    return items;
  }

  setAsignatura(id: number) {
    this.selectedAsignatura = this.asignaturas.find(res => res.asignatura.datos.id == id).asignatura;
    this.getAlumnos(this.selectedAsignatura);
  }

  getAlumnos(asignatura: any){
    this.cursosService.getNotasAlumnosByCursoId(this.id,asignatura.datos.id).subscribe((res) => {
      this.selectedAsignaturaAlumnos = res.notas_alumnos;
    })
  }

  //set
  setInfoNota(index: number) {
    this.infoNota = this.selectedAsignatura.info_notas[index];
  }

  ////modal
  //info
  modalInfoOpen(index: number){
    this.setInfoNota(index);
    this.modalInfo.open('sm');
  }

  modalInfoClose(){
    this.infoNota = {
      'contenido':'',
      'fecha':'',
      'coeficiente':null,
    };
    this.modalInfo.close();
  }

}
