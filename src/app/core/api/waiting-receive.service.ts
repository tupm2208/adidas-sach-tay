import { MainApiService } from './../util/main-api.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { StorageService } from '../util/storage.service'

@Injectable()
export class WaitingReceiveService {

  constructor( private mainApi: MainApiService, private storage: StorageService) { }

  list(): Observable<any> {

    let token = this.storage.get('token');

    return this.mainApi.get('choduyetnh?token=' + token);
  }

  update(params): Observable<any> {

    let token = this.storage.get('token');

    return this.mainApi.put('choduyetnh/' + params.manh + '?token=' + token, params);
  }

  getById(id): Observable<any> {

    let token = this.storage.get('token');

    return this.mainApi.get('choduyetnh/' + id + '?token=' + token);
  }

  create(params): Observable<any> {

    let token = this.storage.get('token');

    return this.mainApi.post('choduyetnh?token=' + token, params);
  }

  delete(params): Observable<any> {

    let token = this.storage.get('token');

    return this.mainApi.delete('choduyetnh/'+ params.manh + '?token=' + token);
  }

  search(params): Observable<any> {

    

    return this.mainApi.post('choduyetnh/search', params);
  }

  getWaitAndReceiver(params): Observable<any> {

    let token = this.storage.get('token');

    params.token = token;
    
    return this.mainApi.post('choduyetnh/getlist', params);
  }
}
