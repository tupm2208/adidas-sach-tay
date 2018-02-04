import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {

  private urlBase = 'https://adidas-backend-trachdaik.c9users.io/api/'
  constructor() { }

  getBaseURL() {

    return this.urlBase;
  }
}
