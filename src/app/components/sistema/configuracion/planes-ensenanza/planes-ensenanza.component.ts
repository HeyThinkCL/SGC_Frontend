import { Component, OnInit, ViewChild, trigger, transition, style, animate } from '@angular/core';
import { Location } from '@angular/common';
import {ModalComponent} from 'ng2-bs3-modal/ng2-bs3-modal';

import { PlanDeEstudiosService } from '../../../../services/sistema/configuraciones/plan-de-estudios.service';

@Component({
  selector: 'app-planes-ensenanza',
  templateUrl: './planes-ensenanza.component.html',
  styleUrls: ['./planes-ensenanza.component.css'],
  animations: [
    trigger(
      'fade', [
        transition(':enter', [
          style({transform: 'translateX(100%)', opacity: 0}),
          animate('90ms', style({transform: 'translateX(0)', opacity: 1}))
        ]),
        transition(':leave', [
          style({transform: 'translateX(0)', 'opacity': 1}),
          animate('90ms', style({transform: 'translateX(100%)', opacity: 0}))
        ])
      ]
    )
  ],
})

export class PlanesEnsenanzaComponent implements OnInit {
  @ViewChild('modal') modal: ModalComponent;

  planesDeEstudio: any;
  configuracion: any = {
    planes: [
      {
        "id": 1,
        "codigo": 2960,
        "decreto": "Decreto  Nº 29602012 1° a 6° Básico (Nuevas Bases Curriculares)",
        "fecha": "2012-12-19",
        'tipos':[
          {
            "id": 2,
            "codigo": 110,
            "glosa": "Enseñanza Básica",
            'cursos_nivel':null,
          }
        ]
      },
    ],
  };

  constructor(
    private location: Location,
    private planDeEstudiosService: PlanDeEstudiosService,
  ) { }

  ngOnInit() {
    this.planDeEstudiosService.getPlanesDeEstudio().subscribe(planes => {
      this.planesDeEstudio = planes;
    })
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
