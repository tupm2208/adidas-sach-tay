import { MainApiService } from './../util/main-api.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { StorageService } from '../util/storage.service';

@Injectable()
export class ReceiveDetailService {

  constructor( private mainApi: MainApiService, private storage: StorageService) { }
  base_uri = 'receiverdetail'
  list(): Observable<any> {

    return this.mainApi.get(this.base_uri);
  }

  getByParams(params): Observable<any> {

    return this.mainApi.get(this.base_uri, params);
  }

  update(params): Observable<any> {

    return this.mainApi.put(this.base_uri + '?reservationId=' + params.reservationId + '&receiverId' + params.receiverId, params);
  }

  create(params): Observable<any> {

    return this.mainApi.post(this.base_uri, params);
  }

  delete(params): Observable<any> {

    return this.mainApi.delete(this.base_uri + '?', params);
  }
}
