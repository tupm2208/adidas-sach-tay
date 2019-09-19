import { MainApiService } from './../util/main-api.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { StorageService } from '../util/storage.service'

@Injectable()
export class BillDetailService {

  constructor( private mainApi: MainApiService, private storage: StorageService) { }

  base_uri = 'billdetail'

  list(): Observable<any> {

    return this.mainApi.get(this.base_uri);
  }

  getByParams(params): Observable<any> {

    return this.mainApi.post(this.base_uri + '?', params);
  }

  update(params): Observable<any> {

    return this.mainApi.put(this.base_uri + '?billId=' + params.billId + '&productId=' + params.productId, params);
  }

  create(params): Observable<any> {

    return this.mainApi.post(this.base_uri + '', params);
  }

  delete(params): Observable<any> {

    return this.mainApi.delete(this.base_uri + '?' + "productId=" + params.productId + '&billId=' + params.billId);
  }
}
