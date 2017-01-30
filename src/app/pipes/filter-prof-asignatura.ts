/**
 * Created by matias on 30-01-17.
 */
import { Pipe, PipeTransform } from '@angular/core';

// # Filter Array of Objects
@Pipe({ name: 'filterProfByAsign' })
export class FilterProfByAsign implements PipeTransform {
  transform(data, asignId: number) {
    if(!data && !asignId){
      return data;
    } else {
      return data.filter(item => {
        return item.id_asignaturas.indexOf(asignId) !== -1;
      });
    }
  }
}
