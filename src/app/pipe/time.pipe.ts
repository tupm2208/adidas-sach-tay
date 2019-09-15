import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {

  transform(items: Array<any>, filter: { [key: string]: any }): Array<any> {

    if (!filter) return items;
    
    return items.filter(item => {
      let ngay: any = 'createdDate';

      if(filter.type) ngay = filter.type;
      
      let from = filter['from']? filter['from'].getTime(): 0;
      let to = filter['to']? filter['to'].getTime(): new Date().getTime();
      let itemTime = new Date(item[ngay])
      return itemTime > from && itemTime < to? true: false; // true if matches all fields
    });
  }

}
