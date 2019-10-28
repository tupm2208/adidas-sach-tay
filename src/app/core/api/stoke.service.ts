import { MainApiService } from './../util/main-api.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { StorageService } from '../util/storage.service'

@Injectable()
export class StokeService {

  private base_link = 'stoke'
  constructor( private mainApi: MainApiService, private storage: StorageService) { }

  list(): Observable<any> {

    return this.mainApi.get(this.base_link + '?include=true');
  }

  update(params): Observable<any> {

    return this.mainApi.patch(this.base_link + '/' + params.id, params);
  }

  update_status(params, reservationId): Observable<any> {

    return this.mainApi.patch(this.base_link + '?' + 'reservationId=' + reservationId, params);
  }

  getById(id): Observable<any> {

    return this.mainApi.get(this.base_link + '/' + id);
  }

  create(params): Observable<any> {

    return this.mainApi.post(this.base_link , params);
  }

  delete(id): Observable<any> {

    return this.mainApi.delete(this.base_link + '/'+ id);
  }

  search(params): Observable<any> {

    return this.mainApi.get(this.base_link + '?include=true&', params);
  }
}
