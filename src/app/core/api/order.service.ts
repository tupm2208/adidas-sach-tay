import { MainApiService } from './../util/main-api.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { StorageService } from '../util/storage.service'

@Injectable()
export class OrderService {

  constructor( private mainApi: MainApiService, private storage: StorageService) { }

  base_uri = 'reservations'
  list(): Observable<any> {

    return this.mainApi.get(this.base_uri);
  }

  getById(id): Observable<any> {

    return this.mainApi.get(this.base_uri + '/' + id);
  }

  create(params): Observable<any> {

    return this.mainApi.post(this.base_uri, params);
  }

  update(params): Observable<any> {

    return this.mainApi.put(this.base_uri + '/' + params.id, params);
  }

  delete(id): Observable<any> {

    let token = this.storage.get('token');

    return this.mainApi.delete(this.base_uri + '/'+ id);
  }

  getByParams(params): Observable<any> {

    return this.mainApi.get(this.base_uri + '?', params);
  }
}
