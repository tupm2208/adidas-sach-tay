import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'user'
})
export class UserPipe implements PipeTransform {

  transform(items: Array<any>, filter: { [key: string]: any }): Array<any> {

    if(!items.length) return;

    return items.filter(item => {

      for(let key in filter) {
        
        let str = item[key] + '';
        if(str.indexOf(filter[key]) == -1) {

          return false;
        }
      }

      return true; // true if matches all fields
    });
  }

}
