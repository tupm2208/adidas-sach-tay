import { MainApiService } from './../util/main-api.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { StorageService } from '../util/storage.service'

@Injectable()
export class WaitingBillDetailService {

  constructor( private mainApi: MainApiService, private storage: StorageService) { }

  
  list(): Observable<any> {

    let token = this.storage.get('token');

    return this.mainApi.get('choduyetcthd?token=' + token);
  }

  getByParams(params): Observable<any> {

    let token = this.storage.get('token');

    params.token = token;
    
    return this.mainApi.post('choduyetcthd/search', params);
  }

  update(params): Observable<any> {

    

    return this.mainApi.put('choduyetcthd/' + params.mahd + '/' + params.masp, params);
  }

  create(params): Observable<any> {

    

    return this.mainApi.post('choduyetcthd', params);
  }

  delete(params): Observable<any> {

    let token = this.storage.get('token');

    return this.mainApi.delete('choduyetcthd/' + params.mahd + '/' + params.masp + '?token=' + token);
  }
}
