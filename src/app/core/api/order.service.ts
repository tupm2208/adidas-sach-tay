import { MainApiService } from './../util/main-api.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { StorageService } from '../util/storage.service'

@Injectable()
export class OrderService {

  constructor( private mainApi: MainApiService, private storage: StorageService) { }

  list(): Observable<any> {

    let token = this.storage.get('token');

    return this.mainApi.get('donhang?token=' + token);
  }

  getById(id): Observable<any> {

    let token = this.storage.get('token');

    return this.mainApi.get('donhang/' + id + '?token=' + token);
  }

  create(params): Observable<any> {

    params.token = this.storage.get('token');

    return this.mainApi.post('donhang', params);
  }

  update(params): Observable<any> {

    params.token = this.storage.get('token');
    console.log("update madh = ", params.madh);
    return this.mainApi.put('donhang/' + params.madh, params);
  }

  delete(id): Observable<any> {

    let token = this.storage.get('token');

    return this.mainApi.delete('donhang/'+ id +'?token=' + token);
  }

  getByParams(params): Observable<any> {

    let token = this.storage.get('token');

    params.token = token;
    
    return this.mainApi.post('donhang/search', params);
  }
}
