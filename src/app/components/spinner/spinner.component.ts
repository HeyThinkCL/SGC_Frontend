import { Component, OnInit, Input, trigger, transition, style, animate, keyframes } from '@angular/core';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css'],
  animations: [
    trigger(
      'fade', [
        transition(':leave', [
          style({transform: 'translateX(0)', 'opacity': 1}),
          animate('90ms', style({transform: 'translateY(100%)', opacity: 0}))
        ])
      ]
    )
  ],
})
export class SpinnerComponent implements OnInit {
  @Input('timeoutMessage') timeoutMessage: string;

  timeoutCheck: boolean = false;

  constructor() { }

  ngOnInit() {

  }

  timeoutId = setTimeout(() => {
    this.timeoutCheck = true;
  }, 1000*40);

}

//Global Messages

export function emptyArrayMsg(subject: string): string {
  return 'No se encontraron ' + subject + ' en la base de datos.';
}

export function connectionErrorMsg(): string {
  return 'Sin conexión con el servidor.';
}

export function invalidRequestMsg(): string{
  return 'Petición inválida.';
}
