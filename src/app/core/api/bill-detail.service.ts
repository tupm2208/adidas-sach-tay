import { MainApiService } from './../util/main-api.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { StorageService } from '../util/storage.service'

@Injectable()
export class BillDetailService {

  constructor( private mainApi: MainApiService, private storage: StorageService) { }

  list(): Observable<any> {

    let token = this.storage.get('token');

    return this.mainApi.get('chitiethd?token=' + token);
  }

  getByParams(params): Observable<any> {

    let token = this.storage.get('token');

    params.token = token;
    
    return this.mainApi.post('chitiethd/search', params);
  }

  update(params): Observable<any> {

    params.token = this.storage.get('token');

    return this.mainApi.put('chitiethd/' + params.mahd, params);
  }

  create(params): Observable<any> {

    params.token = this.storage.get('token');

    return this.mainApi.post('chitiethd', params);
  }
}
