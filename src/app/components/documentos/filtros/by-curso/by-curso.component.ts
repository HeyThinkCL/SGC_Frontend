import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-by-curso',
  templateUrl: './by-curso.component.html',
  styleUrls: ['./by-curso.component.css']
})
export class ByCursoComponent implements OnInit {
  @Input('docs') docs: string[];
  @Output() onSelect = new EventEmitter<any>();

  public disabledSelect: boolean;
  selected: any;
  selectedHolder: any;

  constructor() { }

  ngOnInit() {
    this.disabledSelect = false;
  }

  emitSelection(){
    this.onSelect.emit(this.selected);
  }

}
