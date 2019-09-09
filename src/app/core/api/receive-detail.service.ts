import { MainApiService } from './../util/main-api.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { StorageService } from '../util/storage.service';

@Injectable()
export class ReceiveDetailService {

  constructor( private mainApi: MainApiService, private storage: StorageService) { }

  list(): Observable<any> {

    let token = this.storage.get('token');

    return this.mainApi.get('chitietnh?token=' + token);
  }

  getByParams(params): Observable<any> {

    let token = this.storage.get('token');

    params.token = token;
    
    return this.mainApi.post('chitietnh/search', params);
  }

  update(params): Observable<any> {

    

    return this.mainApi.put('chitietnh/' + params.manh + '/' + params.madh, params);
  }

  create(params): Observable<any> {

    

    return this.mainApi.post('chitietnh', params);
  }

  delete(params): Observable<any> {

    let token = this.storage.get('token');

    return this.mainApi.delete('chitietnh/' + params.manh + '/' + params.madh + '?token=' + token);
  }
}
