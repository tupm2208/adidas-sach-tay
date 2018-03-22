import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimePipe } from './time.pipe';
import { UserPipe } from './user.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    TimePipe,
    UserPipe
  ],
  exports: [
    TimePipe,
    UserPipe
  ]
})
export class PipeModule { }
