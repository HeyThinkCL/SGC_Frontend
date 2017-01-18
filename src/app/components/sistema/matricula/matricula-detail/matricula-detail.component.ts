import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location }       from '@angular/common';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

import { Matricula, Apoderado } from '../matricula';
import { MatriculaService } from '../../../../services/sistema/matricula.service';

@Component({
  selector: 'app-matricula-detail',
  templateUrl: 'matricula-detail.component.html',
  styleUrls: ['matricula-detail.component.css']
})
export class MatriculaDetailComponent implements OnInit {
  @ViewChild('modal')
  modal: ModalComponent;

  id: number;
  private sub: any;

  matricula: Matricula;
  padre: Apoderado;
  madre: Apoderado;
  apoderado: Apoderado;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private matriculaService: MatriculaService,
  ) { }

  ngOnInit() {
    this.matricula = new Matricula();
    this.padre = new Apoderado(false);
    this.madre = new Apoderado(false);
    this.apoderado = new Apoderado(false);

    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
    });

    this.route.params
      .switchMap((params: Params) => this.matriculaService.getMatricula(+params['id']))
      .subscribe((matricula) => {
        this.matricula = matricula;
      });
  }

  goBack(): void {
    this.location.back();
  }

  goToEdit(id: number){
    this.router.navigate(['editar-matricula',id],{relativeTo: this.route.parent});

  }

  modalOpen(): void {
    this.modal.open();
  }

  modalClose(): void {
    this.deleteMatricula();
  }

  modalDismiss(): void {
    this.modal.dismiss();
  }

  deleteMatricula(): void {
    this.matriculaService.deleteMatricula(this.matricula.id).subscribe(()=>{
      this.modal.close();
      this.goBack();
    });
  }

}
