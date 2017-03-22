import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

import {ProfesoresService} from '../../../../services/libros/profesores.service';
import {CursosService} from '../../../../services/libros/cursos.service';
import {ColegiosService} from '../../../../services/sistema/colegios.service';
import { Select2OptionData } from 'ng2-select2';

@Component({
  selector: 'app-asignar-profesor',
  templateUrl: './asignar-profesor.component.html',
  styleUrls: ['./asignar-profesor.component.css']
})
export class AsignarProfesorComponent implements OnInit {
  id: number;
  private sub: any;

  profesor: any;

  asignaturasDictadas= [];
  selectedAsignatura: any;

  jefaturas= [];
  selectedJefatura: any;
  selectedJefaturaName: string;

  allCursos =[];

  allAsignaturas = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private profesoresService: ProfesoresService,
    private cursosService: CursosService,
    private colegiosService: ColegiosService
  ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.profesoresService.getProfesorById(this.id).subscribe(prof => {
        this.profesor = prof;
      });

      this.profesoresService.getJefaturasByProfesorId(this.id).subscribe(jefaturas => {
        this.jefaturas=jefaturas;

        if(jefaturas){
          this.cursosService.getCursos().subscribe(cursos => {
            this.allCursos = cursos;

          })
        }
      });

      this.profesoresService.getAsignaturasByProfesorId(this.id).subscribe(asign => {
        this.asignaturasDictadas = asign;
        if(asign){
          this.colegiosService.getAsignaturasByColegioId(1).subscribe(asignaturas => {
            this.allAsignaturas = asignaturas;

          })
        }
      })
    });
  }

  cursoChanged(e: any){
    if(e){
      this.selectedJefatura = this.allCursos.find(c => c.curso.id == +e).curso;
    }
  }

  addJefatura(){
    this.jefaturas.push(JSON.parse(JSON.stringify(this.selectedJefatura)));
    this.selectedJefatura = null;
  }

  checkCursoInJefaturas(){
    if(!this.selectedJefatura || this.jefaturas.find(j => j.id == this.selectedJefatura.id)){
      return true;
    }
    return false;
  }

  asignaturaChanged(e: any){

  }

  addAsignatura(){

  }

  goBack(): void {
    //change to router.navigate to navigate to parent route app/libro/ver-cursos
    //this.location.back navigates inside tabs, bad for tab logic.
    this.router.navigate(['./'],{relativeTo: this.route.parent});
  }

}
