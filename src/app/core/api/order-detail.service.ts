import { MainApiService } from './../util/main-api.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { StorageService } from '../util/storage.service'

@Injectable()
export class OrderDetailService {

  constructor( private mainApi: MainApiService, private storage: StorageService) { }

  list(): Observable<any> {

    let token = this.storage.get('token');

    return this.mainApi.get('chitietdh?token=' + token);
  }

  getByParams(params): Observable<any> {

    let token = this.storage.get('token');

    params.token = token;
    
    return this.mainApi.post('chitietdh/search', params);
  }
}
