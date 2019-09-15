import { MainApiService } from './../util/main-api.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { StorageService } from '../util/storage.service'

@Injectable()
export class ExchangeService {

  private base_link = 'exchanges'
  constructor( private mainApi: MainApiService, private storage: StorageService) { }

  list(): Observable<any> {

    return this.mainApi.get(this.base_link);
  }

  update(params): Observable<any> {

    return this.mainApi.patch(this.base_link + '/' + params.id, params);
  }

  getById(id): Observable<any> {

    return this.mainApi.get(this.base_link + '/' + id);
  }

  create(params): Observable<any> {

    return this.mainApi.post(this.base_link , params);
  }

  delete(params): Observable<any> {

    return this.mainApi.delete(this.base_link + '/'+ params.id);
  }
}
