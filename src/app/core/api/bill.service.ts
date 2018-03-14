import { MainApiService } from './../util/main-api.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { StorageService } from '../util/storage.service'

@Injectable()
export class BillService {

  constructor( private mainApi: MainApiService, private storage: StorageService) { }

  list(): Observable<any> {

    let token = this.storage.get('token');

    return this.mainApi.get('hoadon?token=' + token);
  }

  update(params): Observable<any> {

    let token = this.storage.get('token');

    return this.mainApi.put('hoadon/' + params.mahd + '?token=' + token, params);
  }

  getById(id): Observable<any> {

    let token = this.storage.get('token');

    return this.mainApi.get('hoadon/' + id + '?token=' + token);
  }

  create(params): Observable<any> {

    let token = this.storage.get('token');

    return this.mainApi.post('hoadon?token=' + token, params);
  }

  delete(params): Observable<any> {

    let token = this.storage.get('token');

    return this.mainApi.delete('hoadon/'+ params.mahd + '?token=' + token);
  }

  search(params): Observable<any> {

    params.token = this.storage.get('token');

    return this.mainApi.post('hoadon/search', params);
  }
}
