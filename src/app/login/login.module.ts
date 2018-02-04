import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { RegistComponent } from './regist/regist.component';

import { LoginRouters } from './login.routers';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(LoginRouters)
  ],
  declarations: [LoginComponent, RegistComponent]
})
export class LoginModule { }
