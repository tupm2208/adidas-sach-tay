
import { MainApiService } from './../util/main-api.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { StorageService } from '../util/storage.service'

@Injectable()
export class ReceiveService {

  constructor( private mainApi: MainApiService, private storage: StorageService) { }

  list(): Observable<any> {

    let token = this.storage.get('token');

    return this.mainApi.get('nhanhang?token=' + token);
  }

  update(params): Observable<any> {

    let token = this.storage.get('token');

    return this.mainApi.put('nhanhang/' + params.manh + '?token=' + token, params);
  }

  getById(id): Observable<any> {

    let token = this.storage.get('token');

    return this.mainApi.get('nhanhang/' + id + '?token=' + token);
  }

  create(params): Observable<any> {

    let token = this.storage.get('token');

    return this.mainApi.post('nhanhang?token=' + token, params);
  }

  delete(params): Observable<any> {

    let token = this.storage.get('token');

    return this.mainApi.delete('nhanhang/'+ params.manh + '?token=' + token);
  }

  search(params): Observable<any> {

    params.token = this.storage.get('token');

    return this.mainApi.post('nhanhang/search', params);
  }
}
