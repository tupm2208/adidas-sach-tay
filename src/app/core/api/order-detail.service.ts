import { MainApiService } from './../util/main-api.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { StorageService } from '../util/storage.service'

@Injectable()
export class OrderDetailService {

  constructor( private mainApi: MainApiService, private storage: StorageService) { }
  base_uri = 'reservationdetail'
  list(): Observable<any> {

    return this.mainApi.get(this.base_uri);
  }

  getByParams(params): Observable<any> {

    return this.mainApi.get(this.base_uri + '?', params);
  }

  create(params): Observable<any> {

    return this.mainApi.post(this.base_uri, params);
  }

  update(params): Observable<any> {

    return this.mainApi.put(this.base_uri + '/' + params.madh + '/' +params.masp , params);
  }

  delete(params): Observable<any> {

    return this.mainApi.delete(this.base_uri, params);
  }
}
