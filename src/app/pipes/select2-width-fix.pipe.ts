/**
 * Created by matias on 24-01-17.
 */
import { Pipe, PipeTransform } from '@angular/core';

// # Filter Array of Objects
@Pipe({ name: 'select2WidthFix' })
export class Select2WidthFixPipe implements PipeTransform {
  transform(value: number) {
    return value > window.screen.width-20? window.screen.width - 60 : value;
  }
}
