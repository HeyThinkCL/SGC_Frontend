import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

import { CursosService } from '../../../../../services/libros/cursos.service';
import { NotasService } from '../../../../../services/libros/notas.service';
import {ConfiguracionService} from '../../../../../services/sistema/configuracion.service';
import { ConfigNotasService } from '../../../../../services/sistema/configuraciones/config-notas.service';

@Component({
  selector: 'app-curso-notas-ingresar',
  templateUrl: 'curso-notas-ingresar.component.html',
  styleUrls: ['curso-notas-ingresar.component.css'],
})
export class CursoNotasIngresarComponent implements OnInit {
  @ViewChild('modalDelete') modalDelete: ModalComponent;
  @ViewChild('modalCreate') modalCreate: ModalComponent;
  @ViewChild('modalInfo') modalInfo: ModalComponent;

  asignaturas = [];
  alumnos = [];

  selectedAsignatura: any;
  selectedAsignaturaAlumnos = [];

  infoNota = {
    'contenido':'',
    'fecha':'',
    'coeficiente':null,
  };
  createdNota = {
    'contenido':'',
    'fecha':'',
    'coeficiente':null,
  };
  notaToDelete = {
    'evaluacion': {},
    'notas': [
      {
        'alumno': {
          'id':null,
          'nombre':'',
          'apellido_paterno':'',
          'apellido_materno':'',
        },
        'nota': {
          'id':null,
          'valor':null,
        }
      }
    ],
  };

  id: number;
  private sub: any;

  private notasCongif: any;
  decimals: string;

  renderView: boolean;

  constructor(
    private cursosService: CursosService,
    private notasService: NotasService,
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
            'decimales':2,
            'aprox':1,
          }
        };

        this.decimals = '1.1-'+this.notasCongif.notas.decimales.toString();

        this.renderView = true;
      });

    this.selectedAsignatura = {
      'datos':{
        'id':1,
        'nombre': 'Lenguaje y Comunicación',
        'ponderacion':true,
      },
      'cantidad':0,
      'info_notas':[]
    }
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
    console.log(this.selectedAsignatura);
    this.getAlumnos(this.selectedAsignatura);
  }

  getAlumnos(asignatura: any){
    this.cursosService.getNotasAlumnosByCursoId(this.id,asignatura.datos.id).subscribe((res) => {
      this.selectedAsignaturaAlumnos = res.notas_alumnos;
    })
  }

  //logic
  restrictValue(nota: any){
    if(nota.valor > 7.0){
      nota.valor=7.0;
    }  else if(nota.valor == 0){
      nota.valor = null;
    } else if(nota.valor < 1.0 && nota.valor!=null){
      nota.valor=1.0;
    }
  }

  onChange(nota: any){
    this.saveNota(nota);
  }

  //../services
  saveNota(nota: any){
    this.restrictValue(nota);
    this.notasService.updateNota(nota,this.selectedAsignatura.datos.id).subscribe((res) =>{
      nota = res;
    });
  }

  saveNotas(){
    for (let alumno of this.selectedAsignaturaAlumnos){
      for (let nota of alumno.notas){
        this.saveNota(nota);
      }
    }
  }

  createNota(){
    this.notasService.createNota(this.id,this.selectedAsignatura.datos.id, this.createdNota).subscribe((res) => {
      this.createdNota = {
        'contenido':'',
        'fecha':'',
        'coeficiente':null,
      };
      this.route.parent.parent.params
        .switchMap((params: Params) => this.cursosService.getAsignaturasByCursoId(params['id']))
        .subscribe((res) => {
          this.asignaturas = res.asignaturas;
          this.setAsignatura(this.selectedAsignatura.datos.id);
          this.modalCreate.close();
        });
    });
  }

  deleteNota(){
    let notas = [];
    for (let nota of this.notaToDelete.notas){
      notas.push(nota.nota.id);
    }

    this.renderView = false;
    this.notasService.deleteNotas(notas).subscribe(() => {
      this.notaToDelete = {
        'evaluacion': {},
        'notas': [],
      };

      this.route.parent.parent.params
        .switchMap((params: Params) => this.cursosService.getAsignaturasByCursoId(params['id']))
        .subscribe((res) => {
          this.asignaturas = res.asignaturas;
          this.setAsignatura(this.selectedAsignatura.datos.id);
          this.renderView = true;
          this.modalDelete.close();
        });
    })
  }

  //set
  setInfoNota(index: number) {
    this.infoNota = this.selectedAsignatura.info_notas[index];
  }

  setNotaToDelete(index: number) {
    this.notaToDelete = {
      'evaluacion': {},
      'notas': [],
    };

    this.notaToDelete.evaluacion = this.selectedAsignatura.info_notas[index];
    for(let alumno of this.selectedAsignaturaAlumnos){
      this.notaToDelete.notas.push(
        {
          'alumno': {
            'id':alumno.alumno.id,
            'nombre':alumno.alumno.nombre,
            'apellido_paterno':alumno.alumno.apellido_paterno,
            'apellido_materno':alumno.alumno.apellido_materno,
          },
          'nota': alumno.notas[index]
        }
      );
    }
    index = null;
  }

  ////modals

  //delete
  modalDeleteOpen(){
    this.modalDelete.open();
  }

  modalDeleteClose(){
    this.deleteNota();
  }

  modalDeleteDismiss(){
    this.modalDelete.dismiss();
  }
  //create
  modalCreateOpen(){
    this.modalCreate.open('lg');
  }
  modalCreateClose(){
    this.createNota();
  }
  modalCreateDismiss(){
    this.modalCreate.dismiss();
  }
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
