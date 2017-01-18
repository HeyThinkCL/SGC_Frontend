import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

@Component({
  selector: 'app-postulaciones-dashboard',
  templateUrl: './postulaciones-dashboard.component.html',
  styleUrls: ['./postulaciones-dashboard.component.css']
})
export class PostulacionesDashboardComponent implements OnInit {
  @ViewChild('deleteModal') deleteModal: ModalComponent;

  filterData = '';

  constructor() { }

  ngOnInit() {
  }

}
