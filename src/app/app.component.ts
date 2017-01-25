import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';

  configRoutes = [
    {
      'name':'Calendario Académico',
      'path':'calendario',
      'icon':'icon-calendar-o',
    },
    {
      'name':'Notas y Ponderaciones',
      'path':'notas',
      'icon':'icon-check-square-o',
    },
    {
      'name':'Jornada',
      'path':'jornada',
      'icon':'icon-bell-o',
    }
  ];
}
