import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { MatDialogModule, MatButtonModule, MatCheckboxModule } from '@angular/material';
import { FormsModule } from '@angular/forms';

import { MainRoutes } from './main.routers';
import { ListUserComponent } from './list-user/list-user.component';
import { UserComponent } from './list-user/user/user.component';

import { UserPipe } from '../pipe/user.pipe';
import { OrderComponent } from './orders/order/order.component';
import { OrdersComponent } from './orders/orders.component';
import { BillsComponent } from './bills/bills.component';
import { BillComponent } from './bills/bill/bill.component';
import { ListProductComponent } from './list-product/list-product.component';
import { ProductComponent } from './list-product/product/product.component';
import { AssignOrderComponent } from './assign-order/assign-order.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(MainRoutes),
    MatDialogModule,
    MatButtonModule, 
    MatCheckboxModule,
    FormsModule
  ],
  declarations: [
    MainComponent, 
    ListUserComponent, 
    UserComponent,
    UserPipe,
    OrderComponent,
    OrdersComponent,
    BillsComponent,
    BillComponent,
    ListProductComponent,
    ProductComponent,
    AssignOrderComponent
  ],
  entryComponents: [
    UserComponent
  ]
})
export class MainModule { }
