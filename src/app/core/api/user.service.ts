import { MainApiService } from './../util/main-api.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { StorageService } from '../util/storage.service'

@Injectable()
export class UserService {

  base = "users"

  constructor( private mainApi: MainApiService, private storage: StorageService) { }

  list(): Observable<any> {

    return this.mainApi.get(this.base);
  }

  getById(id): Observable<any> {

    return this.mainApi.get(this.base + '/' + id);
  }

  regist(params): Observable<any> {

    
    
    return this.mainApi.post(this.base + '', params);
  }

  update(params): Observable<any> {

    return this.mainApi.patch(this.base + '/' + params.id, params);
  }

  search(params): Observable<any> {

    return this.mainApi.get(this.base + '?', params);
  }
}
