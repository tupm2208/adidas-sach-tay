import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {

  private urlBase = 'https://http://app-40dcc8a9-fda5-499f-8e36-8c8e8efe51d2.cleverapps.io/api/'
  constructor() { }

  getBaseURL() {

    return this.urlBase;
  }
}
