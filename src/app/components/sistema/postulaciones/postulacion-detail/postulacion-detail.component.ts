import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location }       from '@angular/common';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

import { PostulacionesService } from '../../../../services/sistema/postulaciones.service'
import { ApoderadosService } from '../../../../services/sistema/apoderados.service'

@Component({
  selector: 'app-postulacion-detail',
  templateUrl: 'postulacion-detail.component.html',
  styleUrls: ['postulacion-detail.component.css']
})
export class PostulacionDetailComponent implements OnInit {

  id: number;
  private sub: any;

  private postulante: any;
  private padre: any;
  private madre: any;
  private apoderado: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private postulacionesService: PostulacionesService,
    private apoderadosService: ApoderadosService,
  ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
    });

    this.route.params
      .switchMap((params: Params) => this.postulacionesService.getPostulante(+params['id']))
      .subscribe((postulante) => {
        this.postulante = postulante;

        let pCheck = false;
        let mCheck = false;

        this.apoderadosService.getApoderadoById(postulante.padre_id).subscribe(padre => {
          this.padre = padre;
          this.padre['apoderado']=false;
          pCheck = true;
          if(pCheck && mCheck){
            this.apoderadosService.getApoderadoById(postulante.apoderado_id).subscribe(apoderado => {
              this.apoderado = apoderado;
              if(this.padre.usuario.rut == apoderado.usuario.rut){
                this.padre.apoderado = true;
              } else if (this.madre.usuario.rut == apoderado.usuario.rut){
                this.madre.apoderado = true;
              }
            });
          }
        });
        this.apoderadosService.getApoderadoById(postulante.madre_id).subscribe(madre => {
          this.madre = madre;
          this.madre['apoderado']=false;
          mCheck = true;
          if(pCheck && mCheck){
            this.apoderadosService.getApoderadoById(postulante.apoderado_id).subscribe(apoderado => {
              this.apoderado = apoderado;
              if(this.padre.usuario.rut == apoderado.usuario.rut){
                this.padre.apoderado = true;
              } else if (this.madre.usuario.rut == apoderado.usuario.rut){
                this.madre.apoderado = true;
              }
            });
          }
        });
      });
  }

  goBack(): void {
    this.location.back();
  }

  goToEdit(){
    this.router.navigate(['./editar',this.id],{relativeTo: this.route.parent});

  }

}
