import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'user'
})
export class UserPipe implements PipeTransform {

  transform(items: Array<any>, filter: { [key: string]: any }): Array<any> {

    if(!items.length) return [];

    return items.filter(item => {

      for(let key in filter) {
        
        if(!item.hasOwnProperty(key)) continue;

        if(Array.isArray(item[key])){

          for(let i = 0; i< item[key].length; i++) {

            let lc = true;
            for (let e in filter[key]) {

              let str = item[key][i][e] + '';

              if (str.toUpperCase().indexOf(filter[key][e].toUpperCase()) == -1) {

                lc = false;
              }
            }

            return lc;
          }

        }else if(typeof(filter[key]) == 'object') {

          for(let e in filter[key]) {

            let str = item[key][e] + '';
            
            if (str.toUpperCase().indexOf(filter[key][e].toUpperCase()) == -1) {

              return false;
            }

          }
        } else {

          let str = item[key] + '';

          if(item['makh'] && item['makh'] == 1) { return false }

          if (str.toUpperCase().indexOf(filter[key].toUpperCase()) == -1) {

            return false;
          }
        }
      }

      return true; // true if matches all fields
    });
  }

}
