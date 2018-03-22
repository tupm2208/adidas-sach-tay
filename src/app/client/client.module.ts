import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { ListBillComponent } from './list-bill/list-bill.component';
import { ClientRouters } from './client.routers';
import { PipeModule } from '../pipe/pipe.module';
import { WaitingListComponent } from './waiting-list/waiting-list.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ClientRouters),
    FormsModule,
    PipeModule
  ],
  declarations: [ListBillComponent, WaitingListComponent]
})
export class ClientModule { }
