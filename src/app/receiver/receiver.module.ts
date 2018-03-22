import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PipeModule } from '../pipe/pipe.module';
import { MatDatepickerModule, MatNativeDateModule } from '@angular/material';

import { ReceiverRouters } from './receiver.routers';
import { ReceiverListComponent } from './receiver-list/receiver-list.component';
import { ReceiverWaitingComponent } from './receiver-waiting/receiver-waiting.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ReceiverRouters),
    FormsModule,
    PipeModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  declarations: [
    ReceiverListComponent, 
    ReceiverWaitingComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class ReceiverModule { }
