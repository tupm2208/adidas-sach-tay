import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';

import { MainRoutes } from './main.routers';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(MainRoutes)
  ],
  declarations: [MainComponent]
})
export class MainModule { }
