import { StorageService } from './storage.service';
import { HttpService } from './http.service';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpResponseService } from './http-response.service';
import { MainApiService } from './main-api.service';
import { ConfigService } from '../config.service';
import { LoadingService } from './loading.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    HttpResponseService,
    HttpService,
    MainApiService,
    StorageService,
    ConfigService,
    LoadingService
  ]
})
export class UtilModule { }
