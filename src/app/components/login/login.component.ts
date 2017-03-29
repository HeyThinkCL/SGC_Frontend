import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {AuthenticationService} from '../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})
export class LoginComponent implements OnInit {

  model: any = {};
  loading:boolean = false;
  error: string = '';


  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
  ) { }

  ngOnInit() {
    this.authenticationService.logout();
  }

  login(){
    this.loading = true;
    this.error='';
    this.authenticationService.authenticate(this.model.user,this.model.password).subscribe(response => {
      console.log(response);
      let token = response.auth_token;

      if (token && response.usuario){
        if(this.authenticationService.login(token,response.usuario)){
          let currentUser = JSON.parse(localStorage.getItem('currentUser'));
          if(+atob(atob(currentUser.rol))[5]==1){
            this.router.navigate(['after']);
          } else {
            this.router.navigate(['/']);
          }
        }
      } else {
        this.error = 'Usuario o contraseña incorrectos';
        this.loading = false;
      }
    }, error => {
      this.error = 'Usuario o contraseña incorrectos';
      this.loading = false;
    });
  }

}
