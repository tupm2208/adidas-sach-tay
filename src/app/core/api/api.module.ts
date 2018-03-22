import { UtilModule } from './../util/util.module';
import { GoogleApiService } from './google-api.service';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginService } from './login.service';
import { UserService } from './user.service';
import { OrderService } from './order.service';
import { OrderDetailService } from './order-detail.service';
import { BillService } from './bill.service';
import { BillDetailService } from './bill-detail.service';
import { ReceiveService } from './receive.service';
import { ReceiveDetailService } from './receive-detail.service';
import { MainService } from './main.service';
import { WaitingBillService } from './waiting-bill.service';
import { WaitingBillDetailService } from './waiting-bill-detail.service';
import { WaitingOrderService } from './waiting-order.service';
import { WaitingReceiveService } from './waiting-receive.service';


@NgModule({
  imports: [
    CommonModule,
    UtilModule
  ],
  declarations: [],
  providers: [
    GoogleApiService,
    LoginService,
    UserService,
    OrderService,
    OrderDetailService,
    BillService,
    BillDetailService,
    ReceiveService,
    ReceiveDetailService,
    MainService,
    WaitingBillService,
    WaitingBillDetailService,
    WaitingOrderService,
    WaitingReceiveService
  ]
})
export class ApiModule {}
