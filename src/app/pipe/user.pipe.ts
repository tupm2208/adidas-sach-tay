import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'user'
})
export class UserPipe implements PipeTransform {

  transform(items: Array<any>, filter: { [key: string]: any }): Array<any> {
    return items.filter(item => {

      for(let key in filter) {

        if(item[key].indexOf(filter[key]) == -1) {

          return false;
        }
      }

      return true; // true if matches all fields
    });
  }

}
