import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {

  transform(items: Array<any>, filter: { [key: string]: any }): Array<any> {

    if (!filter) return items;
    
    return items.filter(item => {
      let ngay: any = 'ngay';

      if(filter.type) ngay = filter.type;
      
      let from = filter['from']? filter['from'].getTime(): 0;
      let to = filter['to']? filter['to'].getTime(): new Date().getTime();

      return item[ngay] > from && item[ngay] < to? true: false; // true if matches all fields
    });
  }

}
