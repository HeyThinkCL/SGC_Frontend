/**
 * Created by matias on 19-05-17.
 */
/**
 * Created by matias on 28-12-16.
 */

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'showEvalEspecial',
  pure: false,
})
export class ShowEvalEspecialPipe implements PipeTransform {
  transform(nota,evalId) {
      if(nota){
        if(evalId){

          if(evalId==1){
            if(nota <=4.0){
              return Math.floor((nota-1.0)*(60/3.0));
            } else if(nota > 4.0 && nota <=7.0){
              return Math.floor((40/3.0)*(nota-4.0)+60);
            }
          }

          if(evalId==2){
            if(nota <4.0){
              return 'NL';
            } else if(nota >= 4.0 && nota <5.0){
              return 'LCD';
            } else if(nota >= 5.0 && nota<6.0){
              return 'LAE'
            } else if(nota >=6.0 && nota <= 7.0) {
              return 'LSE'
            } else {
              return 'SE'
            }
          }

          if(evalId==3){
            if(nota <4.0){
              return 'NL';
            } else if(nota >= 4.0 && nota <5.0){
              return 'PL';
            } else if(nota >= 5.0 && nota<6.0){
              return 'ML'
            } else if(nota >=6.0 && nota <= 7.0) {
              return 'L'
            }
          }

          if(evalId==4){
            if(nota <4.0){
              return 'I';
            } else if(nota >= 4.0 && nota <5.0){
              return 'S';
            } else if(nota >= 5.0 && nota<6.0){
              return 'B'
            } else if(nota >=6.0 && nota <= 7.0) {
              return 'MB'
            }
          }
        } else{
          return nota;
        }
      }

  }

}


