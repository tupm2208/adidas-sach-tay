import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {

  private urlBase = 'https://app-649c4742-aae3-4427-9c7c-eb3cf4974289.cleverapps.io/api/'
  constructor() { }

  getBaseURL() {

    return this.urlBase;
  }
}
