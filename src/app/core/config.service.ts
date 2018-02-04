import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {

  private urlBase = 'http://localhost:3000/api/'
  constructor() { }

  getBaseURL() {

    return this.urlBase;
  }
}
