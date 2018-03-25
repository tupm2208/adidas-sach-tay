import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { LoginComponent } from './login.component';
import { RegistComponent } from './regist/regist.component';

import { LoginRouters } from './login.routers';
import { ChangePasswordComponent } from './change-password/change-password.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(LoginRouters),
    FormsModule
  ],
  declarations: [LoginComponent, RegistComponent, ChangePasswordComponent]
})
export class LoginModule { }
