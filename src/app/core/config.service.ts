import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {

  private urlBase = 'http://0.0.0.0:3030/'
  constructor() { }

  getBaseURL() {

    return this.urlBase;
  }
}
