import { MainApiService } from './../util/main-api.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { StorageService } from '../util/storage.service'

@Injectable()
export class UserService {

  constructor( private mainApi: MainApiService, private storage: StorageService) { }

  list(): Observable<any> {

    let token = this.storage.get('token');

    return this.mainApi.get('khachhang?token=' + token);
  }

  getById(id): Observable<any> {

    let token = this.storage.get('token');
    return this.mainApi.get('khachhang/' + id + '?token=' + token);
  }

  regist(params): Observable<any> {

    params.token = this.storage.get('token');
    
    return this.mainApi.post('khachhang', params);
  }

  update(params): Observable<any> {

    params.token = this.storage.get('token');

    return this.mainApi.put('khachhang/' + params.makh, params);
  }

  search(params): Observable<any> { 

    params.token = this.storage.get('token');

    return this.mainApi.post('khachhang/search', params);
  }
}
