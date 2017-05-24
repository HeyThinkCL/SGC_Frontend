import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-notas-electivo',
  templateUrl: './notas-electivo.component.html',
  styleUrls: ['./notas-electivo.component.css']
})
export class NotasElectivoComponent implements OnInit {

  private currentTabPath: string = '';
  tabs = [
    {"id":1,"path":'ver',"label":"Ver","icon":"icon-eye"},
    {"id":2,"path":'ingresar',"label":"Ingresar","icon":"icon-plus"},
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.router.events.subscribe((res) => {
        this.currentTabPath = this.route.children[0].toString();
      }
    )
  }

  ngOnInit() {
  }

}
