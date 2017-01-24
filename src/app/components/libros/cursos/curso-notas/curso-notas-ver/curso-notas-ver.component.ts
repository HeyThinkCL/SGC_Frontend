import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

import { CursosService } from '../../../../../services/libros/cursos.service';

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

  alumnos = [
    {'id':1, 'alumnos':[
      {'numero':1,'nombre':'Ivan','apellidos':'Arenas','nMat':10,'exc':'','notas':[
        {'value':5.0},
        {'value': null},
        {'value': 4.6},
        {'value': 6.0},
        {'value': 5.7},
      ]},
      {'numero':2,'nombre':'Valentin','apellidos':'Trujillo','nMat':15,'exc':'','notas':[
        {'value':4.0},
        {'value': 7.0},
        {'value': null},
        {'value': null},
        {'value': 5.4},
      ]},
      {'numero':3,'nombre':'Don','apellidos':'Carter','nMat':230,'exc':'','notas':[
        {'value':7.0},
        {'value': 7.0},
        {'value': null},
        {'value': 5.5},
        {'value': 6.4},
      ]},
    ]}
  ];

  selectedAsignatura: any;
  selectedAsignaturaAlumnos = [];

  id: number;
  private sub: any;

  constructor(
    private cursosService: CursosService,
    private route: ActivatedRoute,
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

  //logic
  public getPromedio(notas): number{
    let sum: number = 0;
    let total: number = 0;
    for(let nota of notas){
      if(!(nota.valor == null)){
        sum += nota.valor;
        total += 1;
      }
    }
    return isNaN(sum/total)? 1.0 : sum/total ;
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
