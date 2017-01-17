import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

@Component({
  selector: 'app-ver-postulaciones',
  templateUrl: 'ver-postulaciones.component.html',
  styleUrls: ['ver-postulaciones.component.css']
})
export class VerPostulacionesComponent implements OnInit {
  @ViewChild('deleteModal') deleteModal: ModalComponent;

  private postulaciones = [
    {"id":1},
  ];

  postulacionToDelete_id: number;

  constructor() { }

  ngOnInit() {
  }

  //modals
  deleteModalOpen(id: number): void {
    this.deleteModal.open();
    this.postulacionToDelete_id = id;
  }

  deleteModalClose(id: number): void {
    console.log(id)
  }

  deleteModalDismiss(): void {
    this.deleteModal.dismiss();
  }

}
