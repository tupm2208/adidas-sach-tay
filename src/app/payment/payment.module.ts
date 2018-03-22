import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PipeModule } from '../pipe/pipe.module';
import { MatDatepickerModule, MatNativeDateModule } from '@angular/material';

import { PaymentRoutes } from './payment.routers';
import { PaymentListComponent } from './payment-list/payment-list.component';
import { PaymentWaitComponent } from './payment-wait/payment-wait.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(PaymentRoutes),
    FormsModule,
    PipeModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  declarations: [
    PaymentWaitComponent,
    PaymentListComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class PaymentModule { }
