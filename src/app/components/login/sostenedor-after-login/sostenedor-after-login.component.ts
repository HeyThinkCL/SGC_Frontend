import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ColegiosService } from '../../../services/sistema/colegios.service'

@Component({
  selector: 'app-sostenedor-after-login',
  templateUrl: './sostenedor-after-login.component.html',
  styleUrls: ['./sostenedor-after-login.component.css']
})
export class SostenedorAfterLoginComponent implements OnInit {

  private colegios = [];

  constructor(private router: Router,private colegiosService: ColegiosService,) { }

  ngOnInit() {
    this.colegiosService.getColegios().subscribe((response) => {
      if(response.length>0){
        this.colegios = response;
      } else {
        this.router.navigate(['app/sistema/colegios/crear']);
      }

    });
  }

  goToDashboard(){
    this.router.navigate(['/']);
  }

  selectColegio(colegioId: number){
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    currentUser.colegioId = colegioId;
    localStorage.removeItem('currentUser');
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    this.goToDashboard();
  }

}
