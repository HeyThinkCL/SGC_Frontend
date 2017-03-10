/**
 * Created by matias on 28-12-16.
 */

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'calcPromedio',
  pure: false,
})
export class CalcPromedio implements PipeTransform {
  transform(notas: any[],info_notas: any[], config: any) {
    let sum: number = 0;
    let total: number = 0;
    for(let ixx in notas){
      let nota = notas[ixx];
      let coef = info_notas[ixx].coeficiente;
      if(nota.valor){
        for(let i:number = 0;i<coef;i++){
          sum += nota.valor;
          total += 1;
        }
      }
    }
    console.log(config.notas.aprox);
    if(config.notas.aprox == 1){
      return isNaN(sum/total)? 1.0 : this.round(sum/total,config.notas.decimales) ;
    } else {
      return isNaN(sum/total)? 1.0 : sum/total ;
    }

  }

  round(value, precision) {
    let multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
  }
}


