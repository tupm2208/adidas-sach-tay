import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {

  // private urlBase = 'http://0.0.0.0:3030/'
  private urlBase = 'https://adidas-backend.herokuapp.com/'
  constructor() { }

  getBaseURL() {

    return this.urlBase;
  }
}
