import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

import { PostulacionesService } from '../../../../services/sistema/postulaciones.service';

@Component({
  selector: 'app-ver-postulaciones',
  templateUrl: 'ver-postulaciones.component.html',
  styleUrls: ['ver-postulaciones.component.css']
})
export class VerPostulacionesComponent implements OnInit {
  @Input('filter') filterData: string;
  @Output() onSelect = new EventEmitter<any>();
  @ViewChild('deleteModal') deleteModal: ModalComponent;

  private postulaciones = [
    {"id":1},
  ];
  postulacionToDelete_id: number;
  selected = [];

  filterKeys = ['nombre','rut'];

  constructor(
    private postulacionesService: PostulacionesService,
  ) { }

  ngOnInit() {
    this.postulacionesService.getPostulaciones().subscribe(res => {
      this.postulaciones = res;
    });

  }

  selectAlumno(id){
    if (this.include(this.selected,id)){
      this.selected.splice(this.selected.indexOf(id),1);
    } else {
      this.selected.push(id);
    }
    // this.emitSelection();
  }

  include(arr,obj) {
    return (arr.indexOf(obj) != -1);
  }

  emitSelection(){
    this.onSelect.emit(this.selected);
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
