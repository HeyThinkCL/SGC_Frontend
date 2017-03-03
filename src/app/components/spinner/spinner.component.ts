import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
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
  return 'No se encontraron' + subject + 'en la base de datos.';
}

export function connectionErrorMsg(): string {
  return 'Sin conexión con el servidor.';
}

export function invalidRequestMsg(): string{
  return 'Petición inválida.';
}
