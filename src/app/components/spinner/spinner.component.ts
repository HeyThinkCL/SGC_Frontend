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
