import { MainApiService } from './../util/main-api.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { StorageService } from '../util/storage.service'

@Injectable()
export class WaitingBillService {

  constructor( private mainApi: MainApiService, private storage: StorageService) { }

  list(): Observable<any> {

    let token = this.storage.get('token');

    return this.mainApi.get('choduyethd?token=' + token);
  }

  update(params): Observable<any> {

    let token = this.storage.get('token');

    return this.mainApi.put('choduyethd/' + params.mahd + '?token=' + token, params);
  }

  getById(id): Observable<any> {

    let token = this.storage.get('token');

    return this.mainApi.get('choduyethd/' + id + '?token=' + token);
  }

  create(params): Observable<any> {

    let token = this.storage.get('token');

    return this.mainApi.post('choduyethd?token=' + token, params);
  }

  delete(params): Observable<any> {

    let token = this.storage.get('token');

    return this.mainApi.delete('choduyethd/'+ params.mahd + '?token=' + token);
  }

  search(params): Observable<any> {

    

    return this.mainApi.post('choduyethd/search', params);
  }
}
