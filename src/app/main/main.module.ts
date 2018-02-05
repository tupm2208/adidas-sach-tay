import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';

import { MainRoutes } from './main.routers';
import { ListUserComponent } from './list-user/list-user.component';
import { UserComponent } from './list-user/user/user.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(MainRoutes)
  ],
  declarations: [MainComponent, ListUserComponent, UserComponent]
})
export class MainModule { }
