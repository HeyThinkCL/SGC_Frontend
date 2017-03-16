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
    if(this.authenticationService.login(this.model.user,this.model.password)){
      this.router.navigate(['/']);
    } else {
      this.error = 'Usuario o contraseña incorrectos';
      this.loading = false;
    }
  }

}
