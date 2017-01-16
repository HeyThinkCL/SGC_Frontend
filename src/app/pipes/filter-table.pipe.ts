/**
 * Created by matias on 11-01-17.
 */
import { Pipe, PipeTransform } from '@angular/core';

// # Filter Array of Objects
@Pipe({ name: 'filterArray' })
export class FilterTablePipe implements PipeTransform {
  transform(data, filter, keys: any[]){
    if (!filter || keys.length == 0){
      return data;
    } else if (data && filter && keys.length > 0){
      return data.filter(item => {
        for (let key of keys){
          if (typeof key === 'string' || key instanceof String){
            if (item[key.toString()]){
              if (item[key.toString()].toString().toLowerCase().indexOf(filter.toLowerCase()) !== -1){
               return true;
              }
            }
          } else if (typeof key === 'object' || key instanceof Object){
            if(item[key.mainKey]){
              let mainData = item[key.mainKey];
              for (let subKey of key.subKeys){
                if(typeof subKey === 'string' || subKey instanceof String){
                  console.log(mainData[subKey.toString()]);
                  if(mainData[subKey.toString()]){
                    if (mainData[subKey.toString()].toString().toLowerCase().indexOf(filter.toLowerCase()) !== -1){
                     return true;
                    }
                  }
                }
              }
            }
          }
        }
        return false;
      });
    }
  }
}
/*
transform(value, args) {
  if (!args[0]) {
    return value;
  } else if (value) {
    return value.filter(item => {
      for (let key in item) {
        if ((typeof item[key] === 'string' || item[key] instanceof String) &&
          (item[key].toLowerCase().indexOf(args[0].toLowerCase()) !== -1)) {
          return true;
        } else if ((typeof item[key] === 'object' || item[key] instanceof  Object)){
          let deepItem = item[key];
          for (let deepKey in deepItem){
            if ((typeof deepItem[deepKey] === 'string' || deepItem[deepKey] instanceof String) &&
              (deepItem[deepKey].toLowerCase().indexOf(args[0].toLowerCase()) !== -1)) {
              return true;
            }
          }
        }
      }
      return false;
    });
  }
}*/
