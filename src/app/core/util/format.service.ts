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

  formatData(src, mainProp) {

    let flag = {};

    for(let index = 0; index < src.length; index++) {

      let element = src[index];
      
      let ob ={};

      let name = '';

      for(let e in element) {

        if(e.indexOf('.')>0) {

          let arr = e.split('.');

          ob[arr[1]] = element[e];
          name = arr[0];

          delete element[e];
        }
      }

      let subFlag = flag[element[mainProp]];

      if(subFlag) {

        src[subFlag][name].push(ob);
        src.splice(index, 1);
        index--;
      } else {

        flag[element[mainProp]] = index + "";
        element[name] = [ob];
      }
    };
  }

  copyObject(src, des) {

    for(let e in src) {

      des[e] = src[e];
    }
  }
}
