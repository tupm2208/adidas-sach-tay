import { UtilModule } from './../util/util.module';
import { GoogleApiService } from './google-api.service';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginService } from './login.service';

@NgModule({
  imports: [
    CommonModule,
    UtilModule
  ],
  declarations: [],
  providers: [
    GoogleApiService,
    LoginService
  ]
})
export class ApiModule {}
