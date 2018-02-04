import { md5 } from './md5';
import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {

  constructor() { }

  set(key, value) {

    key = md5(key);

    localStorage.setItem(key, JSON.stringify(value));
  }

  get(key) {

    key = md5(key);

    return JSON.parse(localStorage.getItem(key));
  }

  public removeItem(key: string): void {
    
    key = md5(key);
    delete localStorage[key];
  }

}
