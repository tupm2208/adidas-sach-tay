import { Injectable } from '@angular/core';

declare let $: any;

@Injectable()
export class FormatService {

  constructor() { }

  formatDate(getTimeItem) {
    
    getTimeItem = getTimeItem - 0;

    let d = new Date(getTimeItem);
    let day: any = d.getDate();
    let month: any = d.getMonth() + 1;
    let year = d.getFullYear();
    if (day < 10) {
      day = "0" + day;
    }
    if (month < 10) {
      month = "0" + month;
    }

    return day + "/" + month + "/" + year;
  };

}
