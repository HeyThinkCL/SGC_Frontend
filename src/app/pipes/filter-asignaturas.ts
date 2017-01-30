/**
 * Created by matias on 30-01-17.
 */
import { Pipe, PipeTransform } from '@angular/core';

// # Filter Array of Objects
@Pipe({ name: 'filterAsignaturas' })
export class FilterAsignaturas implements PipeTransform {
  transform(data, asignaturas: any[]) {
    if(!data && !asignaturas){
      return data;
    } else {
      return data.filter(item => {
        for (let asignatura of asignaturas){
          if(item.id == asignatura.id){
            return false;
          }
        }
        return true;
      });
    }
  }
}
