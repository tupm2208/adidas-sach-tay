import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'user'
})
export class UserPipe implements PipeTransform {

  transform(items: Array<any>, filter: { [key: string]: any }): Array<any> {

    if(!items.length) return;

    return items.filter(item => {

      
      for(let key in filter) {
        
        if(!item.hasOwnProperty(key)) continue;
        
        if(typeof(filter[key]) == 'object') {

          for(let e in filter[key]) {

            let str = item[key][e] + '';
            
            if (str.indexOf(filter[key][e]) == -1) {

              return false;
            }

          }
        } else {

          let str = item[key] + '';

          if (str.indexOf(filter[key]) == -1) {

            return false;
          }
        }
        
        
      }

      return true; // true if matches all fields
    });
  }

}
